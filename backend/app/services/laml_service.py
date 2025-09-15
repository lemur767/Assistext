# app/services/laml_service.py
import xml.etree.ElementTree as ET
from xml.dom import minidom
import html

class LaMLService:
    @staticmethod
    def escape_xml_content(text: str) -> str:
        """Escape XML special characters"""
        return html.escape(text, quote=False)
    
    @staticmethod
    def create_message_response(message: str, media_url: str = None) -> str:
        """Create a LaML message response"""
        # Create the root Response element
        response = ET.Element("Response")
        
        # Create Message element
        message_elem = ET.SubElement(response, "Message")
        
        # Add Body
        body_elem = ET.SubElement(message_elem, "Body")
        body_elem.text = LaMLService.escape_xml_content(message)
        
        # Add Media if provided
        if media_url:
            media_elem = ET.SubElement(message_elem, "Media")
            media_elem.text = LaMLService.escape_xml_content(media_url)
        
        # Convert to string with proper formatting
        return LaMLService._prettify_xml(response)
    
    @staticmethod
    def create_voice_response(message: str) -> str:
        """Create a LaML voice response"""
        response = ET.Element("Response")
        
        say_elem = ET.SubElement(response, "Say")
        say_elem.text = LaMLService.escape_xml_content(message)
        
        return LaMLService._prettify_xml(response)
    
    @staticmethod
    def create_empty_response() -> str:
        """Create an empty LaML response"""
        response = ET.Element("Response")
        return LaMLService._prettify_xml(response)
    
    @staticmethod
    def create_error_response(error_message: str = None) -> str:
        """Create a LaML error response"""
        default_message = "Sorry, I'm having trouble processing your message right now. Please try again later."
        message = error_message or default_message
        
        return LaMLService.create_message_response(message)
    
    @staticmethod
    def _prettify_xml(elem: ET.Element) -> str:
        """Convert XML element to pretty-printed string"""
        rough_string = ET.tostring(elem, encoding='unicode')
        
        # Parse and prettify
        reparsed = minidom.parseString(rough_string)
        pretty = reparsed.toprettyxml(indent="    ")
        
        # Remove empty lines and clean up
        lines = [line for line in pretty.split('\n') if line.strip()]
        
        # Ensure proper XML declaration
        if not lines[0].startswith('<?xml'):
            lines.insert(0, '<?xml version="1.0" encoding="UTF-8"?>')
        else:
            lines[0] = '<?xml version="1.0" encoding="UTF-8"?>'
        
        return '\n'.join(lines)

# Create a singleton instance
laml_service = LaMLService()