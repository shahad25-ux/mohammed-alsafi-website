// قائمة المسؤولين المصرح لهم بالدخول إلى Dashboard
export const ADMIN_EMAILS = [
  'shahadalfahad70@gmail.com',
  'moalsafiy@gmail.com',
];

// التحقق من أن المستخدم مسؤول
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

