# EmailJS Setup Instructions

To enable email functionality for the job application form, you need to set up EmailJS service:

## 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account
- Create a new service (Gmail, Outlook, etc.)

## 2. Create Email Template
Create a new email template with the following structure:

**Template ID**: job_application_template
**Template Content**:
```
Subject: New Job Application - {{from_name}}

Hello {{to_name}},

You have received a new job application with the following details:

Applicant Information:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Applied Position: {{profile}}
- Experience Level: {{experience_level}}
- Years of Experience: {{experience_years}}
- Current CTC: {{current_ctc}}
- Expected CTC: {{expected_ctc}}

Resume: {{resume_name}}

Full Details:
{{message}}

Best regards,
RNR Consulting Application System
```

## 3. Configure ApplicationForm.tsx
Update the following variables in `src/components/ApplicationForm.tsx`:

```javascript
// Replace these with your actual EmailJS credentials
const SERVICE_ID = 'your_service_id';
const TEMPLATE_ID = 'job_application_template';
const PUBLIC_KEY = 'your_public_key';

// Initialize EmailJS
window.emailjs.init(PUBLIC_KEY);

// Send email
await window.emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
```

## 4. Get Your Credentials
- **Service ID**: Found in EmailJS Dashboard > Email Services
- **Template ID**: Found in EmailJS Dashboard > Email Templates
- **Public Key**: Found in EmailJS Dashboard > Account > API Keys

## 5. Test Configuration
1. Fill out the application form
2. Submit the form
3. Check your email inbox for the application details

## Note
The current implementation includes file upload as base64, but EmailJS free tier has limitations on attachment size. Consider upgrading to a paid plan or implementing server-side file handling for larger files.

## Security Considerations
- Store credentials as environment variables in production
- Implement rate limiting to prevent spam
- Add CAPTCHA for additional security
- Validate file types and sizes on both client and server side
