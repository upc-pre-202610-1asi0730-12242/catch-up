const logoApiUrl = import.meta.env.VITE_LOGO_API_URL;
const apiKey = import.meta.env.VITE_LOGO_PUBLISHABLE_API_KEY;

/**
 * Infrastructure adapter for building logo.dev URLs from source domains.
 */
export class LogoDevApi {
    /**
     * @param {string} domain
     * @returns {string}
     */
    getUrlToLogo(domain) {
        return `${logoApiUrl}/${new URL(domain).host}?token=${apiKey}`;
    }
}