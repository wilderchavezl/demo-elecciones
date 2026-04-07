import { EnvironmentProviders, Provider } from '@angular/core';

import { provideIcons } from './icons/icons.provider';

export const provideCore = (): (Provider | EnvironmentProviders)[] => {
    return [provideIcons()];
};
