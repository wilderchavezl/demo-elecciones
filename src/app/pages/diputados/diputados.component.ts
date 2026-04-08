import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, inject, OnInit } from '@angular/core';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { PartidoPolitico } from '@shared/models/partidos-politicos.model';
import { Ubigeo } from '@shared/models/ubigeo.model';
import { CandidatosDiputadosService } from '@shared/services/candidatos-diputados.service';
import { PartidosPoliticosService } from '@shared/services/partidos-politicos.service';
import { UbigeoService } from '@shared/services/ubigeo.service';

@Component({
    selector: 'app-diputados',
    templateUrl: './diputados.component.html',
    imports: [CdkScrollable],
})
export class DiputadosComponent implements OnInit {
    private candidatosService = inject(CandidatosDiputadosService);
    private ubigeoService = inject(UbigeoService);
    private partidosPoliticosService = inject(PartidosPoliticosService);

    public candidatos: CandidatoRequest[] = [];
    public ubigeos: Ubigeo[] = [];
    public partidosPoliticos: PartidoPolitico[] = [];

    ngOnInit(): void {
        this.getCandidatosDiputados();
        this.getUbigeos();
        this.getPartidosPoliticos();
    }

    private getCandidatosDiputados(): void {
        this.candidatosService.getAll().subscribe({
            next: (response) => {
                this.candidatos = response.data;
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
}
