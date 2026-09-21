export const INSTITUTIONAL_DOMAINS = ['unadvirtual.edu.co', 'unad.edu.co'] as const;

export function isInstitutionalEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return INSTITUTIONAL_DOMAINS.some(domain => normalized.endsWith(`@${domain}`));
}
