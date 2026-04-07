import { compactNavigation, defaultNavigation, futuristicNavigation, horizontalNavigation } from '@mock-api/navigation';
import { ThemeNavigationItem } from '@theme/components/navigation/navigation.model';
import { cloneDeep } from 'lodash-es';

export interface Navigation {
    compact: ThemeNavigationItem[];
    default: ThemeNavigationItem[];
    futuristic: ThemeNavigationItem[];
    horizontal: ThemeNavigationItem[];
}

export function navigation(): Navigation {
    const _compactNavigation: ThemeNavigationItem[] = compactNavigation;
    const _defaultNavigation: ThemeNavigationItem[] = defaultNavigation;
    const _futuristicNavigation: ThemeNavigationItem[] = futuristicNavigation;
    const _horizontalNavigation: ThemeNavigationItem[] = horizontalNavigation;

    // Fill compact navigation children using the default navigation
    _compactNavigation.forEach((compactNavItem) => {
        _defaultNavigation.forEach((defaultNavItem) => {
            if (defaultNavItem.id === compactNavItem.id) {
                compactNavItem.children = cloneDeep(defaultNavItem.children);
            }
        });
    });

    // Fill futuristic navigation children using the default navigation
    _futuristicNavigation.forEach((futuristicNavItem) => {
        _defaultNavigation.forEach((defaultNavItem) => {
            if (defaultNavItem.id === futuristicNavItem.id) {
                futuristicNavItem.children = cloneDeep(defaultNavItem.children);
            }
        });
    });

    // Fill horizontal navigation children using the default navigation
    _horizontalNavigation.forEach((horizontalNavItem) => {
        _defaultNavigation.forEach((defaultNavItem) => {
            if (defaultNavItem.id === horizontalNavItem.id) {
                horizontalNavItem.children = cloneDeep(defaultNavItem.children);
            }
        });
    });

    return {
        compact: cloneDeep(_compactNavigation),
        default: cloneDeep(_defaultNavigation),
        futuristic: cloneDeep(_futuristicNavigation),
        horizontal: cloneDeep(_horizontalNavigation),
    };
}
