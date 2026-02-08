/**
 * Dynamic Environment Configuration
 * Loads environment variables with sensible defaults
 * All configuration is centralized here for easy management
 */

const getEnvConfig = () => {
  return {
    // Frontend Server Configuration
    port: parseInt(import.meta.env.VITE_PORT || '5173', 10),
    host: import.meta.env.VITE_HOST || 'localhost',

    // API Configuration
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',
    apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '120000', 10),
    
    // GitHub OAuth Configuration
    github: {
      clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || '',
    },
    
    // Auth Configuration
    auth: {
      callbackUrl: import.meta.env.VITE_AUTH_CALLBACK_URL || 'http://localhost:5173/auth/callback',
    },

    // Application Settings
    app: {
      name: import.meta.env.VITE_APP_NAME || 'PortfolioSync',
      env: import.meta.env.VITE_APP_ENV || 'development',
    },

    // Helper to check if we're in production
    isProduction: import.meta.env.PROD,
    isDevelopment: import.meta.env.DEV,
  };
};

export const envConfig = getEnvConfig();

export default envConfig;
