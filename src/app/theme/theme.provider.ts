import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { EnvironmentProviders, inject, provideEnvironmentInitializer, Provider } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { themeConfig } from '@core/config/app.config';

import { THEME_CONFIG } from './services/config/config,constants';
import { themeLoadingInterceptor } from './services/loading/loading.interceptor';
import { ThemeLoadingService } from './services/loading/loading.service';
import { ThemeMediaWatcherService } from './services/media-watcher/media-watcher.service';
import { ThemePlatformService } from './services/platform/platform.service';
import { ThemeSplashScreenService } from './services/splash-screen/splash-screen.service';
import { ThemeUtilsService } from './services/utils/utils.service';

/**
 * Theme provider
 */
export const provideTheme = (): (Provider | EnvironmentProviders)[] => {
    // Base providers
    const providers: (Provider | EnvironmentProviders)[] = [
        {
            // Disable 'theme' sanity check
            provide: MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme: false,
                version: true,
            },
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill',
            },
        },
        {
            provide: THEME_CONFIG,
            useValue: themeConfig,
        },
        provideHttpClient(withInterceptors([themeLoadingInterceptor])),
        provideEnvironmentInitializer(() => inject(ThemeLoadingService)),
        provideEnvironmentInitializer(() => inject(ThemeMediaWatcherService)),
        provideEnvironmentInitializer(() => inject(ThemePlatformService)),
        provideEnvironmentInitializer(() => inject(ThemeSplashScreenService)),
        provideEnvironmentInitializer(() => inject(ThemeUtilsService)),
    ];

    // Return the providers
    return providers;
};
