# app/services/signalwire_service.py
import requests
import os
from typing import List, Dict, Optional
from dataclasses import dataclass
import logging

logger = logging.getLogger(__name__)

@dataclass
class AvailablePhoneNumber:
    phone_number: str
    friendly_name: str
    region: str
    capabilities: Dict[str, bool]

@dataclass
class PurchasedPhoneNumber:
    sid: str
    phone_number: str
    friendly_name: str
    account_sid: str
    capabilities: Dict[str, bool]

@dataclass
class SignalWireSubproject:
    sid: str
    friendly_name: str
    auth_token: str
    status: str
    date_created: str

class SignalWireService:
    def __init__(self):
        self.space_url = os.getenv('SIGNALWIRE_SPACE_URL')
        self.project_id = os.getenv('SIGNALWIRE_PROJECT_ID')
        self.api_token = os.getenv('SIGNALWIRE_API_TOKEN')
        self.webhook_base_url = os.getenv('WEBHOOK_BASE_URL')
        
        if not all([self.space_url, self.project_id, self.api_token]):
            raise ValueError("SignalWire credentials not properly configured")
        
        self.auth = (self.project_id, self.api_token)
        self.base_url = f"https://{self.space_url}/api/laml/2010-04-01"
    
    def create_subproject(self, friendly_name: str) -> SignalWireSubproject:
        """Create a new SignalWire subproject"""
        try:
            url = f"{self.base_url}/Accounts.json"
            
            data = {'FriendlyName': friendly_name}
            
            response = requests.post(
                url,
                auth=self.auth,
                data=data,
                headers={'Content-Type': 'application/x-www-form-urlencoded'}
            )
            response.raise_for_status()
            
            result = response.json()
            
            return SignalWireSubproject(
                sid=result['sid'],
                friendly_name=result['friendly_name'],
                auth_token=result['auth_token'],
                status=result['status'],
                date_created=result['date_created']
            )
            
        except requests.RequestException as e:
            logger.error(f"Failed to create subproject: {e}")
            raise Exception("Failed to create SignalWire subproject")
    
    def search_available_numbers(self, country_code: str, limit: int = 10) -> List[AvailablePhoneNumber]:
        """Search for available phone numbers"""
        try:
            url = f"{self.base_url}/Accounts/{self.project_id}/AvailablePhoneNumbers/{country_code}/Local.json"
            
            params = {
                'PageSize': limit,
                'SmsEnabled': True
            }
            
            response = requests.get(url, auth=self.auth, params=params)
            response.raise_for_status()
            
            result = response.json()
            available_numbers = result.get('available_phone_numbers', [])
            
            return [
                AvailablePhoneNumber(
                    phone_number=num['phone_number'],
                    friendly_name=num.get('friendly_name', ''),
                    region=num.get('region', ''),
                    capabilities=num.get('capabilities', {})
                )
                for num in available_numbers
            ]
            
        except requests.RequestException as e:
            logger.error(f"Failed to search available numbers: {e}")
            raise Exception("Failed to search available phone numbers")
    
    def purchase_phone_number(self, phone_number: str, subproject_id: str, webhook_url: str) -> PurchasedPhoneNumber:
        """Purchase a phone number and assign to subproject"""
        try:
            url = f"{self.base_url}/Accounts/{subproject_id}/IncomingPhoneNumbers.json"
            
            data = {
                'PhoneNumber': phone_number,
                'SmsUrl': webhook_url,
                'SmsMethod': 'POST'
            }
            
            response = requests.post(
                url,
                auth=self.auth,
                data=data,
                headers={'Content-Type': 'application/x-www-form-urlencoded'}
            )
            response.raise_for_status()
            
            result = response.json()
            
            return PurchasedPhoneNumber(
                sid=result['sid'],
                phone_number=result['phone_number'],
                friendly_name=result.get('friendly_name', ''),
                account_sid=result['account_sid'],
                capabilities=result.get('capabilities', {})
            )
            
        except requests.RequestException as e:
            logger.error(f"Failed to purchase phone number: {e}")
            raise Exception("Failed to purchase phone number")
    
    def generate_webhook_url(self, user_id: int) -> str:
        """Generate webhook URL for a user"""
        return f"{self.webhook_base_url}/api/v1/webhooks/sms/{user_id}"
    
    def generate_friendly_name(self, email: str) -> str:
        """Generate a friendly name for the subproject"""
        import time
        timestamp = int(time.time())
        email_prefix = email.split('@')[0]
        # Remove non-alphanumeric characters
        clean_prefix = ''.join(c for c in email_prefix if c.isalnum())
        return f"{clean_prefix}_{timestamp}"

    def send_sms(self, to_number: str, from_number: str, body: str, subproject_id: str) -> str:
        """Send an SMS message from a subproject"""
        try:
            url = f"{self.base_url}/Accounts/{subproject_id}/Messages.json"
            
            data = {
                'To': to_number,
                'From': from_number,
                'Body': body
            }
            
            response = requests.post(
                url,
                auth=self.auth,
                data=data,
                headers={'Content-Type': 'application/x-www-form-urlencoded'}
            )
            response.raise_for_status()
            
            result = response.json()
            return result['sid']
            
        except requests.RequestException as e:
            logger.error(f"Failed to send SMS: {e}")
            raise Exception("Failed to send SMS")

# Create a singleton instance
signalwire_service = SignalWireService()