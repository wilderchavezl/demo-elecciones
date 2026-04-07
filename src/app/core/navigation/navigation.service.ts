import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';

import { Navigation, navigation } from './navigation.model';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        const navegationItems = navigation();
        this._navigation.next(navegationItems);
        return of(navegationItems);
    }
}
