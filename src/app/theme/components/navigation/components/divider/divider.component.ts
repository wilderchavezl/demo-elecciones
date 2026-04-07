/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ThemeNavigationComponent } from '../../navigation.component';
import { ThemeNavigationItem } from '../../navigation.model';
import { ThemeNavigationService } from '../../navigation.service';

@Component({
    selector: 'theme-navigation-divider-item',
    templateUrl: './divider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass],
})
export class ThemeNavigationDividerItemComponent implements OnInit, OnDestroy {
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _themeNavigationService = inject(ThemeNavigationService);

    @Input() item!: ThemeNavigationItem;
    @Input() name!: string;

    private _themeNavigationComponent?: ThemeNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the parent navigation component
        this._themeNavigationComponent = this._themeNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._themeNavigationComponent.onRefreshed.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
