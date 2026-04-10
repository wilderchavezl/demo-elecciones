import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { CandidatosPresidenteService } from '@shared/services/candidatos-presidente.service';
import { cloneDeep } from 'lodash-es';

@Component({
    selector: 'app-presidente',
    templateUrl: './presidente.component.html',
    imports: [CdkScrollable, NgClass, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class PresidenteComponent implements OnInit {
    private candidatosService = inject(CandidatosPresidenteService);
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

        this.filtrarPorSeleccion(this.formGroup.get('seleccion')?.value || []);
    }

    public filtrarPorSeleccion(value: string[]): void {
        this.candidatosFiltrados = this.candidatos.filter((candidato) => {
            const seleccion = this.candidatosSeleccionados.get(candidato.id);

            if (value.includes('empty') && seleccion === undefined) {
                return true;
            }

            if (value.includes('true') && seleccion === true) {
                return true;
            }

            if (value.includes('false') && seleccion === false) {
                return true;
            }

            return false;
        });
    }
}
