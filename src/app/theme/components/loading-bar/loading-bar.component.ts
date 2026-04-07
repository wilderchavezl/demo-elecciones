/* eslint-disable @typescript-eslint/no-explicit-any */
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    Component,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ThemeLoadingService } from '@theme/services/loading/loading.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'theme-loading-bar',
    templateUrl: './loading-bar.component.html',
    styleUrls: ['./loading-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [MatProgressBarModule],
})
export class ThemeLoadingBarComponent implements OnChanges, OnInit, OnDestroy {
    private _themeLoadingService = inject(ThemeLoadingService);

    @Input() autoMode = true;
    mode!: 'determinate' | 'indeterminate';
    progress = 0;
    show = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On changes
     *
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        // Auto mode
        if ('autoMode' in changes) {
            // Set the auto mode in the service
            this._themeLoadingService.setAutoMode(coerceBooleanProperty(changes['autoMode'].currentValue));
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the service
        this._themeLoadingService.mode$.pipe(takeUntil(this._unsubscribeAll)).subscribe((value) => {
            this.mode = value;
        });

        this._themeLoadingService.progress$.pipe(takeUntil(this._unsubscribeAll)).subscribe((value) => {
            this.progress = value;
        });

        this._themeLoadingService.show$.pipe(takeUntil(this._unsubscribeAll)).subscribe((value) => {
            this.show = value;
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
