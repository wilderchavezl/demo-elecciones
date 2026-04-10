import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { PartidoPolitico } from '@shared/models/partidos-politicos.model';
import { CandidatosParlamentoAndinoService } from '@shared/services/candidatos-parlamento-andino.service';
import { PartidosPoliticosService } from '@shared/services/partidos-politicos.service';
import { cloneDeep } from 'lodash-es';

@Component({
    selector: 'app-parlamento-andino',
    templateUrl: './parlamento-andino.component.html',
    imports: [CdkScrollable, NgClass, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class ParlamentoAndinoComponent implements OnInit {
    private candidatosService = inject(CandidatosParlamentoAndinoService);
    private partidosPoliticosService = inject(PartidosPoliticosService);
    private candidatos: CandidatoRequest[] = [];

    public candidatosFiltrados: CandidatoRequest[] = [];
    public candidatosSeleccionados = new Map<number, boolean>();
    public partidosPoliticos: PartidoPolitico[] = [];

    public formGroup = new FormGroup({
        partido: new FormControl<number | null>(null),
        seleccion: new FormControl<string[]>(['empty', 'true', 'false']),
    });
    public selecciones = [
        { value: 'empty', label: 'Vacíos' },
        { value: 'true', label: 'SI' },
        { value: 'false', label: 'NO' },
    ];

    ngOnInit(): void {
        this.getCandidatosDiputados();
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

        this.filtrarCandidatos();
    }

    public filtrarCandidatos(): void {
        const seleccionValue = this.formGroup.get('seleccion')?.value || [];
        const partidoValue = this.formGroup.get('partido')?.value || null;

        this.candidatosFiltrados = this.candidatos.filter((candidato) => {
            const seleccion = this.candidatosSeleccionados.get(candidato.id);
            const partidoPoliticoId = candidato.partidoPolitico.id;

            const seleccionMatch =
                (seleccionValue.includes('empty') && seleccion === undefined) ||
                (seleccionValue.includes('true') && seleccion === true) ||
                (seleccionValue.includes('false') && seleccion === false);
            const partidoPoliticoMatch = partidoValue === null || partidoValue === partidoPoliticoId;

            return seleccionMatch && partidoPoliticoMatch;
        });
    }
}
