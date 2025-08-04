export const emailConfig = {
  user: process.env.EMAIL_USER || 'kontakt@softnami.pl',
  pass: process.env.EMAIL_PASS || 'twoje_haslo_email',
  to: 'kontakt@softnami.pl',
  host: 'smtp.mail.ovh.net',
  port: 587,
  secure: false
}; 