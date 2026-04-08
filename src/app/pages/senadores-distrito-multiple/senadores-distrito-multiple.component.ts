import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, inject, OnInit } from '@angular/core';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { PartidoPolitico } from '@shared/models/partidos-politicos.model';
import { Ubigeo } from '@shared/models/ubigeo.model';
import { CandidatosSenadoresDistritoMultipleService } from '@shared/services/candidatos-senadores-distrito-multiple.service';
import { PartidosPoliticosService } from '@shared/services/partidos-politicos.service';
import { UbigeoService } from '@shared/services/ubigeo.service';

@Component({
    selector: 'app-senadores-distrito-multiple',
    templateUrl: './senadores-distrito-multiple.component.html',
    imports: [CdkScrollable],
})
export class SenadoresDistritoMultipleComponent implements OnInit {
    private candidatosService = inject(CandidatosSenadoresDistritoMultipleService);
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
