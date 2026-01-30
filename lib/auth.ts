import { cookies } from 'next/headers';

const SESSION_COOKIE = 'dmi-factory-session';
const SESSION_VALUE = 'authenticated';

export function getPassword(): string {
  return process.env.FACTORY_PASSWORD || 'dmi2026';
}

export function verifyPassword(password: string): boolean {
  return password === getPassword();
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return session?.value === SESSION_VALUE;
}

export function getSessionCookieConfig() {
  return {
    name: SESSION_COOKIE,
    value: SESSION_VALUE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  };
}
