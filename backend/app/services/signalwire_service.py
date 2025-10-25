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
    signing_key: str
    status: str
    date_created: str

class SignalWireService:
    def __init__(self):
        self.space_url = os.getenv('SIGNALWIRE_SPACE_URL')
        self.project_id = os.getenv('SIGNALWIRE_PROJECT_ID')
        self.api_token = os.getenv('SIGNALWIRE_API_TOKEN')
        self.webhook_base_url = os.getenv('WEBHOOK_BASE_URL')
        
        if not all([self.space_url, self.project_id, self.api_token, self.webhook_base_url]):
            raise ValueError("SignalWire credentials and WEBHOOK_BASE_URL not properly configured")

        if not self.webhook_base_url.startswith('https://'):
            raise ValueError("WEBHOOK_BASE_URL must use HTTPS")
        
        self.auth = (self.project_id, self.api_token)
        self.base_url = f"https://{self.space_url}/api/laml/2010-04-01"
    
    def create_token(self, name: str, subproject_id: str) -> str:
        """Create a new API token (PSK) for a subproject"""
        try:
            url = f"https://{self.space_url}/api/project/tokens"
            
            data = {
                'name': name,
                'permissions': [
                    "messaging",
                    "calling",
                ],
                'subproject_id': subproject_id
            }
            
            response = requests.post(
                url,
                auth=self.auth,
                json=data
            )
            response.raise_for_status()
            
            result = response.json()
            return result['token']
            
        except requests.RequestException as e:
            logger.error(f"Failed to create token for subproject {subproject_id}: {e}")
            raise Exception("Failed to create SignalWire token")

    def create_subproject(self, friendly_name: str) -> SignalWireSubproject:
        """Create a new SignalWire subproject and a signing key for it"""
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
            subproject_sid = result['sid']
            subproject_auth_token = result['auth_token']

            token_name = f"signing-key-{friendly_name}"
            signing_key = self.create_token(token_name, subproject_sid)
            
            return SignalWireSubproject(
                sid=subproject_sid,
                friendly_name=result['friendly_name'],
                auth_token=subproject_auth_token,
                signing_key=signing_key,
                status=result['status'],
                date_created=result['date_created']
            )
            
        except requests.RequestException as e:
            logger.error(f"Failed to create subproject: {e}")
            raise Exception("Failed to create SignalWire subproject")
    
    def search_available_numbers(self, country_code: str, limit: int = 10, city: Optional[str] = None, region: Optional[str] = None) -> List[AvailablePhoneNumber]:
        """Search for available phone numbers"""
        try:
            url = f"{self.base_url}/Accounts/{self.project_id}/AvailablePhoneNumbers/{country_code}/Local.json"
            
            params = {
                'PageSize': limit,
                'SmsEnabled': True
            }

            if city:
                params['InLocality'] = city
            if region:
                params['InRegion'] = region
            
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
            # Step 1: Purchase the number for the main project
            purchase_url = f"{self.base_url}/Accounts/{self.project_id}/IncomingPhoneNumbers.json"
            purchase_data = {
                'PhoneNumber': phone_number,
                'SmsUrl': webhook_url,
                'SmsMethod': 'POST'
            }
            
            purchase_response = requests.post(
                purchase_url,
                auth=self.auth,
                data=purchase_data,
                headers={'Content-Type': 'application/x-www-form-urlencoded'}
            )
            purchase_response.raise_for_status()
            purchased_number_data = purchase_response.json()
            purchased_number_sid = purchased_number_data['sid']

            # Step 2: Transfer the number to the subproject
            transfer_url = f"{self.base_url}/Accounts/{self.project_id}/IncomingPhoneNumbers/{purchased_number_sid}.json"
            transfer_data = {'AccountSid': subproject_id}

            transfer_response = requests.post(
                transfer_url,
                auth=self.auth,
                data=transfer_data,
                headers={'Content-Type': 'application/x-www-form-urlencoded'}
            )
            transfer_response.raise_for_status()
            
            transferred_number_data = transfer_response.json()

            # Step 3: Update the SmsUrl for the transferred number in the subproject
            update_url = f"{self.base_url}/Accounts/{subproject_id}/IncomingPhoneNumbers/{purchased_number_sid}.json"
            update_data = {
                'SmsUrl': webhook_url,
                'SmsMethod': 'POST'
            }

            update_response = requests.post(
                update_url,
                auth=self.auth,
                data=update_data,
                headers={'Content-Type': 'application/x-www-form-urlencoded'}
            )
            update_response.raise_for_status()
            
            # Use the updated data for the return object
            transferred_number_data = update_response.json()

            return PurchasedPhoneNumber(
                sid=transferred_number_data['sid'],
                phone_number=transferred_number_data['phone_number'],
                friendly_name=transferred_number_data.get('friendly_name', ''),
                account_sid=transferred_number_data['account_sid'],
                capabilities=transferred_number_data.get('capabilities', {})
            )
            
        except requests.RequestException as e:
            logger.error(f"Failed to purchase and transfer phone number: {e}")
            raise Exception("Failed to purchase and transfer phone number")
    
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

    def send_sms(self, to_number: str, from_number: str, body: str, subproject_id: str, auth_token: str) -> str:
        """Send an SMS message from a subproject"""
        logger.info(f"Sending SMS from subproject {subproject_id} with auth token {auth_token}")
        try:
            url = f"{self.base_url}/Accounts/{subproject_id}/Messages.json"
            
            data = {
                'To': to_number,
                'From': from_number,
                'Body': body
            }
            
            # Use the subproject's auth token for authentication
            auth = (subproject_id, auth_token)
            
            response = requests.post(
                url,
                auth=auth,
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