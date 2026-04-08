import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, inject, OnInit } from '@angular/core';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { PartidoPolitico } from '@shared/models/partidos-politicos.model';
import { CandidatosSenadoresDistritoUnicoService } from '@shared/services/candidatos-senadores-distrito-unico.service';
import { PartidosPoliticosService } from '@shared/services/partidos-politicos.service';

@Component({
    selector: 'app-senadores-distrito-unico',
    templateUrl: './senadores-distrito-unico.component.html',
    imports: [CdkScrollable],
})
export class SenadoresDistritoUnicoComponent implements OnInit {
    private candidatosService = inject(CandidatosSenadoresDistritoUnicoService);
    private partidosPoliticosService = inject(PartidosPoliticosService);

    public candidatos: CandidatoRequest[] = [];
    public partidosPoliticos: PartidoPolitico[] = [];

    ngOnInit(): void {
        this.getCandidatosDiputados();
        this.getPartidosPoliticos();
    }

    private getCandidatosDiputados(): void {
        this.candidatosService.getAll().subscribe({
            next: (response) => {
                this.candidatos = response.data;
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
