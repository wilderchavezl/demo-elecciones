import { ThemeConfig } from '@theme/config/config.model';

/**
 * Default configuration for the entire application. This object is used by
 * ThemeConfigService to set the default configuration.
 *
 * If you need to store global configuration for your app, you can use this
 * object to set the defaults. To access, update and reset the config, use
 * ThemeConfigService and its methods.
 *
 * "Screens" are carried over to the BreakpointObserver for accessing them within
 * components, and they are required.
 *
 * "Themes" are required for Tailwind to generate themes.
 */
export const themeConfig: ThemeConfig = {
    layout: 'thin',
    scheme: 'light',
    screens: {
        sm: '600px',
        md: '960px',
        lg: '1280px',
        xl: '1440px',
    },
    theme: 'theme-brand',
    themes: [
        {
            id: 'theme-default',
            name: 'Default',
        },
        {
            id: 'theme-brand',
            name: 'Brand',
        },
    ],
};
