import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const QUERY_PARAM = 'data';

interface StorageEntry {
    seleccionados: [number, boolean][];
    form: Record<string, unknown>;
}

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    private data: Record<string, StorageEntry> = {};
    private router = inject(Router);
    private location = inject(Location);

    /**
     * Constructor
     */
    constructor() {
        const params = new URLSearchParams(window.location.search);
        const encoded = params.get(QUERY_PARAM);

        if (encoded) {
            try {
                this.data = JSON.parse(atob(encoded));
            } catch {
                this.data = {};
            }
        }

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => this.updateUrl());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    public saveSeleccionados(key: string, seleccionados: Map<number, boolean>): void {
        this.ensureEntry(key);

        this.data[key].seleccionados = Array.from(seleccionados.entries());

        this.updateUrl();
    }

    public loadSeleccionados(key: string): Map<number, boolean> {
        const entry = this.data[key];

        if (!entry?.seleccionados) {
            return new Map();
        }

        return new Map(entry.seleccionados);
    }

    public saveFormValues(key: string, values: Record<string, unknown>): void {
        this.ensureEntry(key);

        this.data[key].form = values;

        this.updateUrl();
    }

    public loadFormValues(key: string): Record<string, unknown> | null {
        return this.data[key]?.form ?? null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private ensureEntry(key: string): void {
        if (!this.data[key]) {
            this.data[key] = { seleccionados: [], form: {} };
        }
    }

    private updateUrl(): void {
        if (Object.keys(this.data).length === 0) {
            return;
        }

        const encoded = btoa(JSON.stringify(this.data));
        const urlTree = this.router.parseUrl(this.router.url);

        urlTree.queryParams = { ...urlTree.queryParams, [QUERY_PARAM]: encoded };

        this.location.replaceState(this.router.serializeUrl(urlTree));
    }
}
