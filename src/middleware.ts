import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match locales and exclude generic paths
    matcher: ['/', '/(uk|en)/:path*', '/((?!_next|_vercel|monitoring|api|favicon.ico|.*\\.[^/]+$).*)'],
};
