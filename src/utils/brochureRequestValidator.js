/**
 * Digital Brochure Request & Indian Mobile Verification Validator
 */
export class BrochureRequestValidator {
  static validateRequest(lead) {
    const { fullName, phone, email, reraConsentAccepted } = lead;
    const errors = [];

    if (!fullName || fullName.trim().length < 2) {
      errors.push('Full name must be at least 2 characters');
    }

    // 10-digit Indian phone validation (strip non-digits, drop leading country code 91 if 12 digits)
    let phoneClean = (phone || '').replace(/\D/g, '');
    if (phoneClean.length === 12 && phoneClean.startsWith('91')) {
      phoneClean = phoneClean.slice(2);
    }

    const validPhone = /^[6-9]\d{9}$/.test(phoneClean);
    if (!validPhone) {
      errors.push('Must provide a valid 10-digit mobile number');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push('Must provide a valid email address');
    }

    if (!reraConsentAccepted) {
      errors.push('Must accept statutory RERA communication consent');
    }

    return {
      isValid: errors.length === 0,
      sanitizedPhone: validPhone ? phoneClean : null,
      errors
    };
  }
}
