/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IsActiveMatchOptions, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeUtilsService } from '@theme/services/utils/utils.service';
import { Subject, takeUntil } from 'rxjs';

import { ThemeNavigationComponent } from '../../navigation.component';
import { ThemeNavigationItem } from '../../navigation.model';
import { ThemeNavigationService } from '../../navigation.service';

@Component({
    selector: 'theme-navigation-basic-item',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass, RouterLink, RouterLinkActive, MatTooltipModule, NgTemplateOutlet, MatIconModule],
})
export class ThemeNavigationBasicItemComponent implements OnInit, OnDestroy {
    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _themeNavigationService = inject(ThemeNavigationService);
    private _themeUtilsService = inject(ThemeUtilsService);

    @Input() item!: ThemeNavigationItem;
    @Input() name!: string;

    // Set the equivalent of {exact: false} as default for active match options.
    // We are not assigning the item.isActiveMatchOptions directly to the
    // [routerLinkActiveOptions] because if it's "undefined" initially, the router
    // will throw an error and stop working.
    isActiveMatchOptions: IsActiveMatchOptions = this._themeUtilsService.subsetMatchOptions;

    private _themeNavigationComponent?: ThemeNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Set the "isActiveMatchOptions" either from item's
        // "isActiveMatchOptions" or the equivalent form of
        // item's "exactMatch" option
        this.isActiveMatchOptions =
            (this.item.isActiveMatchOptions ?? this.item.exactMatch)
                ? this._themeUtilsService.exactMatchOptions
                : this._themeUtilsService.subsetMatchOptions;

        // Get the parent navigation component
        this._themeNavigationComponent = this._themeNavigationService.getComponent(this.name);

        // Mark for check
        this._changeDetectorRef.markForCheck();

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
