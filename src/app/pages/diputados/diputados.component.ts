import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, inject, OnInit } from '@angular/core';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { CandidatosDiputadosService } from '@shared/services/candidatos-diputados.service';

@Component({
    selector: 'app-diputados',
    templateUrl: './diputados.component.html',
    imports: [CdkScrollable],
})
export class DiputadosComponent implements OnInit {
    private candidatosService = inject(CandidatosDiputadosService);

    public candidatos: CandidatoRequest[] = [];

    ngOnInit(): void {
        this.getCandidatosDiputados();
    }

    private getCandidatosDiputados(): void {
        this.candidatosService.getAll().subscribe({
            next: (response) => {
                this.candidatos = response.data;
            },
        });
    }
}
