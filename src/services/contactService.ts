import { ContactApiResponse, ContactMethod } from "@/types/contact-types";
import { GET_CONTACT_US_CONTACT_METHODS_DATA } from "@/utils/backEndConstant";

export class ContactService {


  // Fetch all contact methods
  static async fetchContactMethods(): Promise<{
    data: ContactMethod[];
    error: string | null;
    code?: number;
    message?: string;
  }> {
    try {
      const response = await fetch(GET_CONTACT_US_CONTACT_METHODS_DATA, {

      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ContactApiResponse = await response.json();
      
      if (result.code === 200) {
        const methodsWithHighlight = result.data.map(method => ({
          ...method,
          highlight: method.action === 'emergency'
        }));
        
        return {
          data: methodsWithHighlight,
          error: null,
          code: result.code,
          message: result.message,
        };
      } else {
        return {
          data: [],
          error: result.message || 'Failed to fetch contact methods',
          code: result.code,
          message: result.message,
        };
      }
    } catch (err) {
      console.error('Error fetching contact methods:', err);
      return {
        data: [],
        error: err instanceof Error ? err.message : 'An error occurred',
      };
    }
  }

  // Get specific contact method by action type
  static async getContactMethodByAction(action: string): Promise<{
    data: ContactMethod | null;
    error: string | null;
  }> {
    try {
      const { data: allMethods, error } = await this.fetchContactMethods();
      
      if (error) {
        return { data: null, error };
      }

      const method = allMethods.find(m => m.action === action);
      return {
        data: method || null,
        error: method ? null : `No contact method found for action: ${action}`,
      };
    } catch (err) {
      console.error('Error fetching contact method by action:', err);
      return {
        data: null,
        error: err instanceof Error ? err.message : 'Failed to fetch contact method',
      };
    }
  }

  // Get emergency contact
  static async getEmergencyContact(): Promise<{
    data: ContactMethod | null;
    error: string | null;
  }> {
    return this.getContactMethodByAction('emergency');
  }

  // Get main phone contact
  static async getMainPhoneContact(): Promise<{
    data: ContactMethod | null;
    error: string | null;
  }> {
    return this.getContactMethodByAction('call');
  }

  // Get WhatsApp contact
  static async getWhatsAppContact(): Promise<{
    data: ContactMethod | null;
    error: string | null;
  }> {
    return this.getContactMethodByAction('whatsapp');
  }
}

// Alternative: ContactUtils for UI-related functions
export class ContactUtils {
  static copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
  }

  static getSocialIcon(iconName: string): React.ReactNode {
    // This function would return the JSX for icons
    // Since it's UI-specific, we'll keep it in the component
    return null;
  }

  static formatPhoneNumber(phone: string): string {
    // Format phone number for display
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
}