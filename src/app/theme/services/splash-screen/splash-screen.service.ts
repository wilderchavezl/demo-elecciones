import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ThemeSplashScreenService {
    private readonly _document = inject(DOCUMENT);
    private readonly _router = inject(Router);
    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    /**
     * Constructor
     */
    constructor() {
        // Hide it on the first NavigationEnd event
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                this.hide();
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the splash screen
     */
    show(): void {
        if (!this.isBrowser) return;
        this._document.body.classList.remove('theme-splash-screen-hidden');
    }

    /**
     * Hide the splash screen
     */
    hide(): void {
        if (!this.isBrowser) return;
        setTimeout(() => {
            this._document.body.classList.add('theme-splash-screen-hidden');
        });
    }
}
