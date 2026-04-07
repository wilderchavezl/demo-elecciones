import { inject, Injectable } from '@angular/core';
import { ThemeConfig } from '@theme/config/config.model';
import { merge } from 'lodash-es';
import { BehaviorSubject, Observable } from 'rxjs';

import { THEME_CONFIG } from './config,constants';

@Injectable({
    providedIn: 'root',
})
export class ThemeConfigService {
    private _config = new BehaviorSubject(inject(THEME_CONFIG));

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for config
     */
    set config(value: ThemeConfig) {
        // Merge the new config over to the current config
        const config = merge({}, this._config.getValue(), value);

        // Execute the observable
        this._config.next(config);
    }

    get config$(): Observable<ThemeConfig> {
        return this._config.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resets the config to the default
     */
    reset(): void {
        // Set the config
        this._config.next(this.config);
    }
}
