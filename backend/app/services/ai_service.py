# app/services/ai_service.py
import os
import requests
import logging
from typing import Optional
import json
from urllib.parse import urljoin

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        # Environment detection
        self.environment = os.getenv('ENVIRONMENT', 'development')
        
        # Local Ollama configuration (development)
        self.local_ollama_host = os.getenv('LOCAL_OLLAMA_HOST', 'http://localhost:11434')
        self.local_ollama_model = os.getenv('LOCAL_OLLAMA_MODEL', 'llama2')
        
        # Production VPS LLM configuration
        self.production_llm_host = os.getenv('PRODUCTION_LLM_HOST')
        self.production_llm_model = os.getenv('PRODUCTION_LLM_MODEL', 'llama2')
        self.production_llm_api_key = os.getenv('PRODUCTION_LLM_API_KEY')  # If auth is needed
        
        # Request timeouts
        self.local_timeout = int(os.getenv('LOCAL_LLM_TIMEOUT', '60'))
        self.production_timeout = int(os.getenv('PRODUCTION_LLM_TIMEOUT', '30'))
        
        # Determine which provider to use
        self.provider = self._determine_provider()
        
        logger.info(f"AI Service initialized with provider: {self.provider}")
        logger.info(f"Environment: {self.environment}")
    
    def _determine_provider(self) -> str:
        """Determine which LLM provider to use based on environment and availability"""
        
        if self.environment == 'development':
            # Development: prefer local Ollama
            if self._check_ollama_available(self.local_ollama_host):
                return 'local_ollama'
            else:
                logger.warning("Local Ollama not available, falling back to production or fallback")
        
        if self.environment == 'production' or self.environment == 'staging':
            # Production: use VPS-hosted LLM
            if self.production_llm_host and self._check_production_llm_available():
                return 'production_llm'
            else:
                logger.warning("Production LLM not available, checking for local fallback")
        
        # Fallback: try local Ollama even in production if VPS is down
        if self._check_ollama_available(self.local_ollama_host):
            logger.warning("Using local Ollama as fallback")
            return 'local_ollama'
        
        # Final fallback: static responses
        logger.error("No LLM providers available, using static fallback")
        return 'fallback'
    
    def _check_ollama_available(self, host: str) -> bool:
        """Check if Ollama is running and accessible"""
        try:
            response = requests.get(f"{host}/api/version", timeout=5)
            if response.status_code == 200:
                logger.info(f"Ollama available at {host}")
                return True
        except requests.RequestException as e:
            logger.debug(f"Ollama not available at {host}: {e}")
        
        return False
    
    def _check_production_llm_available(self) -> bool:
        """Check if production LLM is available"""
        if not self.production_llm_host:
            return False
        
        try:
            # Try different health check endpoints
            health_endpoints = ['/health', '/api/health', '/v1/models', '/api/version']
            
            for endpoint in health_endpoints:
                try:
                    url = urljoin(self.production_llm_host, endpoint)
                    headers = {}
                    if self.production_llm_api_key:
                        headers['Authorization'] = f'Bearer {self.production_llm_api_key}'
                    
                    response = requests.get(url, headers=headers, timeout=5)
                    if response.status_code in [200, 401]:  # 401 means auth required but service is up
                        logger.info(f"Production LLM available at {self.production_llm_host}")
                        return True
                except requests.RequestException:
                    continue
            
        except Exception as e:
            logger.debug(f"Production LLM not available at {self.production_llm_host}: {e}")
        
        return False
    
    def generate_response(self, user_message: str, user_email: str, conversation, context: Optional[str] = None) -> str:
        """Generate AI response to user message"""
        if conversation.controlled_by == 'user':
            logger.info(f"Conversation {conversation.id} is controlled by user, skipping AI response.")
            return None

        try:
            if self.provider == 'local_ollama':
                return self._generate_ollama_response(
                    user_message, user_email, context, 
                    self.local_ollama_host, self.local_ollama_model, self.local_timeout
                )
            elif self.provider == 'production_llm':
                return self._generate_production_llm_response(user_message, user_email, context)
            else:
                return self._generate_fallback_response(user_message)
        
        except Exception as e:
            logger.error(f"AI response generation failed with {self.provider}: {e}")
            # Try to use fallback provider if primary fails
            if self.provider != 'fallback':
                logger.info("Attempting fallback response generation")
                return self._generate_fallback_response(user_message)
            else:
                return "I'm having trouble processing your message right now. Please try again later."
    
    def _generate_ollama_response(self, user_message: str, user_email: str, context: Optional[str], 
                                host: str, model: str, timeout: int) -> str:
        """Generate response using Ollama (local or remote)"""
        try:
            # Build the prompt
            system_prompt = """You are a helpful AI assistant responding to SMS messages. 
Keep responses concise and suitable for SMS (under 160 characters when possible).
Be friendly and professional. Do not use markdown or special formatting."""
            
            user_prompt = f"""User ({user_email}) sent: "{user_message}"
            
{f"Previous context: {context}" if context else ""}

Respond helpfully and concisely:"""

            # Ollama API call
            payload = {
                "model": model,
                "prompt": f"{system_prompt}\n\n{user_prompt}",
                "stream": False,
                "options": {
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "max_tokens": 200,
                    "stop": ["\n\nUser", "User:", "\n\n"]
                }
            }
            
            response = requests.post(
                f"{host}/api/generate",
                json=payload,
                timeout=timeout
            )
            
            if response.status_code == 200:
                data = response.json()
                ai_response = data.get('response', '').strip()
                
                if not ai_response:
                    raise Exception("Empty response from Ollama")
                
                # Clean up the response
                ai_response = self._clean_response(ai_response)
                
                logger.info(f"Ollama response generated successfully (length: {len(ai_response)})")
                return ai_response
            else:
                raise Exception(f"Ollama API error: {response.status_code} - {response.text}")
                
        except requests.Timeout:
            logger.error("Ollama request timed out")
            raise Exception("AI service temporarily unavailable (timeout)")
        except Exception as e:
            logger.error(f"Ollama API failed: {e}")
            raise
    
    def _generate_production_llm_response(self, user_message: str, user_email: str, context: Optional[str] = None) -> str:
        """Generate response using production VPS-hosted LLM"""
        try:
            # Build headers
            headers = {'Content-Type': 'application/json'}
            if self.production_llm_api_key:
                headers['Authorization'] = f'Bearer {self.production_llm_api_key}'
            
            # Try OpenAI-compatible API format first (most common)
            try:
                return self._call_openai_compatible_api(user_message, user_email, context, headers)
            except Exception as e:
                logger.debug(f"OpenAI-compatible API failed: {e}")
            
            # Try Ollama API format on VPS
            try:
                return self._generate_ollama_response(
                    user_message, user_email, context,
                    self.production_llm_host, self.production_llm_model, self.production_timeout
                )
            except Exception as e:
                logger.debug(f"Ollama API format failed: {e}")
            
            raise Exception("All production LLM API formats failed")
            
        except Exception as e:
            logger.error(f"Production LLM API failed: {e}")
            raise
    
    def _call_openai_compatible_api(self, user_message: str, user_email: str, context: Optional[str], headers: dict) -> str:
        """Call OpenAI-compatible API (vLLM, Text Generation Inference, etc.)"""
        
        system_message = """You are a helpful AI assistant responding to SMS messages. 
Keep responses concise and suitable for SMS (under 160 characters when possible).
Be friendly and professional. Do not use markdown or special formatting."""
        
        user_content = f"""User ({user_email}) sent: "{user_message}"
        
{f"Previous context: {context}" if context else ""}

Respond helpfully and concisely:"""
        
        payload = {
            "model": self.production_llm_model,
            "messages": [
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_content}
            ],
            "max_tokens": 200,
            "temperature": 0.7,
            "stop": ["\n\nUser", "User:", "\n\n"]
        }
        
        # Try different OpenAI-compatible endpoints
        endpoints = ['/v1/chat/completions', '/chat/completions', '/api/v1/chat/completions']
        
        for endpoint in endpoints:
            try:
                url = urljoin(self.production_llm_host, endpoint)
                response = requests.post(
                    url,
                    json=payload,
                    headers=headers,
                    timeout=self.production_timeout
                )
                
                if response.status_code == 200:
                    data = response.json()
                    ai_response = data['choices'][0]['message']['content'].strip()
                    
                    if ai_response:
                        return self._clean_response(ai_response)
                        
            except Exception as e:
                logger.debug(f"Failed endpoint {endpoint}: {e}")
                continue
        
        raise Exception("No working OpenAI-compatible endpoints found")
    
    def _clean_response(self, response: str) -> str:
        """Clean and validate AI response for SMS"""
        # Remove markdown formatting
        response = response.replace('**', '').replace('*', '').replace('`', '')
        
        # Remove extra whitespace
        response = ' '.join(response.split())
        
        # Ensure it's suitable for SMS length
        if len(response) > 1600:  # SMS limit
            response = response[:1597] + '...'
        
        return response
    
    def _generate_fallback_response(self, user_message: str) -> str:
        """Generate fallback response based on keywords when LLMs are unavailable"""
        message = user_message.lower()
        
        if any(greeting in message for greeting in ['hello', 'hi', 'hey', 'good morning', 'good afternoon']):
            return "Hello! How can I help you today?"
        
        if any(word in message for word in ['help', 'support', 'assist']):
            return "I'm here to help! Feel free to ask me any questions."
        
        if 'stop' in message or 'unsubscribe' in message:
            return "You have been unsubscribed. Reply START to re-subscribe."
        
        if 'start' in message or 'subscribe' in message:
            return "Welcome back! You are now subscribed to receive messages."
        
        if any(word in message for word in ['thanks', 'thank you', 'thx']):
            return "You're welcome! Is there anything else I can help you with?"
        
        if any(word in message for word in ['bye', 'goodbye', 'see you']):
            return "Goodbye! Feel free to message me anytime you need help."
        
        if '?' in message:
            return "That's a great question! I'm having some technical difficulties right now, but I'll get back to you soon."
        
        # Default response
        return "Thanks for your message! I'm experiencing some technical issues but I'll respond as soon as possible."
    
    def get_provider_status(self) -> dict:
        """Get detailed status of all providers for debugging"""
        return {
            "environment": self.environment,
            "current_provider": self.provider,
            "local_ollama": {
                "host": self.local_ollama_host,
                "model": self.local_ollama_model,
                "available": self._check_ollama_available(self.local_ollama_host),
                "timeout": self.local_timeout
            },
            "production_llm": {
                "host": self.production_llm_host,
                "model": self.production_llm_model,
                "available": self._check_production_llm_available() if self.production_llm_host else False,
                "has_api_key": bool(self.production_llm_api_key),
                "timeout": self.production_timeout
            }
        }
    
    def health_check(self) -> dict:
        """Perform health check on current provider"""
        status = {"provider": self.provider, "healthy": False, "message": ""}
        
        try:
            if self.provider == 'local_ollama':
                status["healthy"] = self._check_ollama_available(self.local_ollama_host)
                status["message"] = "Local Ollama " + ("available" if status["healthy"] else "unavailable")
            
            elif self.provider == 'production_llm':
                status["healthy"] = self._check_production_llm_available()
                status["message"] = "Production LLM " + ("available" if status["healthy"] else "unavailable")
            
            elif self.provider == 'fallback':
                status["healthy"] = True
                status["message"] = "Using fallback responses"
                
        except Exception as e:
            status["message"] = f"Health check failed: {e}"
        
        return status

# Create a singleton instance
ai_service = AIService()