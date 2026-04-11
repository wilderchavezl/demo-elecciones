import { Injectable } from '@angular/core';

const STORAGE_KEY = 'elecciones';

interface StorageEntry {
    seleccionados: [number, boolean][];
    formulario: Record<string, unknown>;
}

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    private data: Record<string, StorageEntry> = {};

    /**
     * Constructor
     */
    constructor() {
        const raw = localStorage.getItem(STORAGE_KEY);

        if (raw) {
            try {
                this.data = JSON.parse(raw);
            } catch {
                this.data = {};
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    public saveSeleccionados(key: string, seleccionados: Map<number, boolean>): void {
        this.ensureEntry(key);

        this.data[key].seleccionados = Array.from(seleccionados.entries());

        this.persist();
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

        this.data[key].formulario = values;

        this.persist();
    }

    public loadFormValues(key: string): Record<string, unknown> | null {
        return this.data[key]?.formulario ?? null;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private ensureEntry(key: string): void {
        if (!this.data[key]) {
            this.data[key] = { seleccionados: [], formulario: {} };
        }
    }

    private persist(): void {
        if (Object.keys(this.data).length === 0) {
            return;
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    }
}
