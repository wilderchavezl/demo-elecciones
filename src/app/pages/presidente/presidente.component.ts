import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltip } from '@angular/material/tooltip';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { CandidatosPresidenteService } from '@shared/services/candidatos-presidente.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { cloneDeep } from 'lodash-es';

@Component({
    selector: 'app-presidente',
    templateUrl: './presidente.component.html',
    imports: [
        CdkScrollable,
        NgClass,
        MatButtonModule,
        MatIconModule,
        MatTooltip,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class PresidenteComponent implements OnInit {
    private candidatosService = inject(CandidatosPresidenteService);
    private localStorageService = inject(LocalStorageService);
    private storageKey = 'presidente';
    private candidatos: CandidatoRequest[] = [];

    public candidatosFiltrados: CandidatoRequest[] = [];
    public candidatosSeleccionados = new Map<number, boolean>();

    public formGroup = new FormGroup({
        seleccion: new FormControl<string[]>(['empty', 'true', 'false']),
    });
    public selecciones = [
        { value: 'empty', label: 'Vacíos' },
        { value: 'true', label: 'SI' },
        { value: 'false', label: 'NO' },
    ];

    ngOnInit(): void {
        this.candidatosSeleccionados = this.localStorageService.loadSeleccionados(this.storageKey);

        const savedForm = this.localStorageService.loadFormValues(this.storageKey);

        if (savedForm) {
            this.formGroup.patchValue(savedForm);
        }

        this.getCandidatosPresidente();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private getCandidatosPresidente(): void {
        this.candidatosService.getAll().subscribe({
            next: (response) => {
                this.candidatos = response.data;
                this.candidatosFiltrados = cloneDeep(this.candidatos);
                this.filtrarCandidatos();
            },
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    public get hasSeleccionados(): boolean {
        return this.candidatosSeleccionados.size > 0;
    }

    public eliminarSeleccionados(): void {
        this.candidatosSeleccionados.clear();
        this.localStorageService.saveSeleccionados(this.storageKey, this.candidatosSeleccionados);
        this.filtrarCandidatos();
    }

    public toggleSeleccionado(id: number, seleccion: boolean): void {
        const seleccionado = this.candidatosSeleccionados.get(id);

        if (seleccionado === seleccion) {
            this.candidatosSeleccionados.delete(id);
        } else {
            this.candidatosSeleccionados.set(id, seleccion);
        }

        this.localStorageService.saveSeleccionados(this.storageKey, this.candidatosSeleccionados);

        this.filtrarCandidatos();
    }

    public filtrarCandidatos(): void {
        this.localStorageService.saveFormValues(this.storageKey, this.formGroup.getRawValue());

        const seleccionValue = this.formGroup.get('seleccion')?.value || [];

        this.candidatosFiltrados = this.candidatos.filter((candidato) => {
            const seleccion = this.candidatosSeleccionados.get(candidato.id);

            const seleccionMatch =
                (seleccionValue.includes('empty') && seleccion === undefined) ||
                (seleccionValue.includes('true') && seleccion === true) ||
                (seleccionValue.includes('false') && seleccion === false);

            return seleccionMatch;
        });
    }
}
