/* eslint-disable @angular-eslint/prefer-inject */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { Navigation } from '@core/navigation/navigation.model';
import { NavigationService } from '@core/navigation/navigation.service';
import { ThemeLoadingBarComponent } from '@theme/components/loading-bar/loading-bar.component';
import { ThemeNavigationComponent } from '@theme/components/navigation/navigation.component';
import { ThemeNavigationService } from '@theme/components/navigation/navigation.service';
import { ThemeMediaWatcherService } from '@theme/services/media-watcher/media-watcher.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'thin-layout',
    templateUrl: './thin.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [ThemeLoadingBarComponent, ThemeNavigationComponent, MatButtonModule, MatIconModule, RouterOutlet],
})
export class ThinLayoutComponent implements OnInit, OnDestroy {
    public isScreenSmall?: boolean;
    public navigation!: Navigation;

    private onDestroy: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private navigationService: NavigationService,
        private themeMediaWatcherService: ThemeMediaWatcherService,
        private themeNavigationService: ThemeNavigationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to navigation data
        this.getNavigation();

        // Subscribe to media changes
        this.getMediaChanges();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.onDestroy.next(null);
        this.onDestroy.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    getNavigation(): void {
        // Subscribe to navigation data
        this.navigationService.navigation$.pipe(takeUntil(this.onDestroy)).subscribe((navigation: Navigation) => {
            this.navigation = navigation;
        });
    }

    getMediaChanges(): void {
        // Subscribe to media changes
        this.themeMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this.onDestroy))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this.themeNavigationService.getComponent<ThemeNavigationComponent>(name);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
