import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { PartidoPolitico } from '@shared/models/partidos-politicos.model';
import { Ubigeo } from '@shared/models/ubigeo.model';
import { CandidatosDiputadosService } from '@shared/services/candidatos-diputados.service';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { PartidosPoliticosService } from '@shared/services/partidos-politicos.service';
import { UbigeoService } from '@shared/services/ubigeo.service';
import { cloneDeep } from 'lodash-es';

@Component({
    selector: 'app-diputados',
    templateUrl: './diputados.component.html',
    imports: [CdkScrollable, NgClass, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class DiputadosComponent implements OnInit {
    private candidatosService = inject(CandidatosDiputadosService);
    private ubigeoService = inject(UbigeoService);
    private partidosPoliticosService = inject(PartidosPoliticosService);
    private localStorageService = inject(LocalStorageService);
    private storageKey = 'diputados';
    private candidatos: CandidatoRequest[] = [];

    public candidatosFiltrados: CandidatoRequest[] = [];
    public candidatosSeleccionados = new Map<number, boolean>();
    public ubigeos: Ubigeo[] = [];
    public partidosPoliticos: PartidoPolitico[] = [];
    public selecciones = [
        { value: 'empty', label: 'Vacíos' },
        { value: 'true', label: 'SI' },
        { value: 'false', label: 'NO' },
    ];

    public formGroup = new FormGroup({
        seleccion: new FormControl<string[]>(['empty', 'true', 'false']),
        ubigeo: new FormControl<number | null>(14),
        partido: new FormControl<number | null>(null),
    });

    ngOnInit(): void {
        this.candidatosSeleccionados = this.localStorageService.loadSeleccionados(this.storageKey);

        const savedForm = this.localStorageService.loadFormValues(this.storageKey);

        if (savedForm) {
            this.formGroup.patchValue(savedForm);
        }

        this.getCandidatosDiputados();
        this.getUbigeos();
        this.getPartidosPoliticos();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private getCandidatosDiputados(): void {
        this.candidatosService.getAll().subscribe({
            next: (response) => {
                this.candidatos = response.data;
                this.candidatosFiltrados = cloneDeep(this.candidatos);
                this.filtrarCandidatos();
            },
        });
    }

    private getUbigeos(): void {
        this.ubigeoService.getAll().subscribe({
            next: (response) => {
                this.ubigeos = response.data;
            },
        });
    }

    private getPartidosPoliticos(): void {
        this.partidosPoliticosService.getAll().subscribe({
            next: (response) => {
                this.partidosPoliticos = response.data;
            },
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
        const partidoValue = this.formGroup.get('partido')?.value || null;
        const ubigeoValue = this.formGroup.get('ubigeo')?.value || null;

        this.candidatosFiltrados = this.candidatos.filter((candidato) => {
            const seleccion = this.candidatosSeleccionados.get(candidato.id);
            const partidoPoliticoId = candidato.partidoPolitico.id;
            const ubigeoId = candidato.ubigeo?.id;

            const seleccionMatch =
                (seleccionValue.includes('empty') && seleccion === undefined) ||
                (seleccionValue.includes('true') && seleccion === true) ||
                (seleccionValue.includes('false') && seleccion === false);
            const partidoPoliticoMatch = partidoValue === null || partidoValue === partidoPoliticoId;
            const ubigeoMatch = ubigeoValue === null || ubigeoValue === ubigeoId;

            return seleccionMatch && partidoPoliticoMatch && ubigeoMatch;
        });
    }
}
