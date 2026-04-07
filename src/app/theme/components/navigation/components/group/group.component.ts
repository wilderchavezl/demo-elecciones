/* eslint-disable @typescript-eslint/no-explicit-any */
import { BooleanInput } from '@angular/cdk/coercion';
import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    inject,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil } from 'rxjs';

import { ThemeNavigationComponent } from '../../navigation.component';
import { ThemeNavigationItem } from '../../navigation.model';
import { ThemeNavigationService } from '../../navigation.service';
import { ThemeNavigationBasicItemComponent } from '../basic/basic.component';
import { ThemeNavigationCollapsableItemComponent } from '../collapsable/collapsable.component';
import { ThemeNavigationDividerItemComponent } from '../divider/divider.component';
import { ThemeNavigationSpacerItemComponent } from '../spacer/spacer.component';

@Component({
    selector: 'theme-navigation-group-item',
    templateUrl: './group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        MatIconModule,
        ThemeNavigationBasicItemComponent,
        ThemeNavigationCollapsableItemComponent,
        ThemeNavigationDividerItemComponent,
        forwardRef(() => ThemeNavigationGroupItemComponent),
        ThemeNavigationSpacerItemComponent,
    ],
})
export class ThemeNavigationGroupItemComponent implements OnInit, OnDestroy {
    static ngAcceptInputType_autoCollapse: BooleanInput;

    private _changeDetectorRef = inject(ChangeDetectorRef);
    private _themeNavigationService = inject(ThemeNavigationService);

    @Input() autoCollapse?: boolean;
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
