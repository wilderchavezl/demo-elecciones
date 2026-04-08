import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, inject, OnInit } from '@angular/core';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { CandidatosSenadoresDistritoUnicoService } from '@shared/services/candidatos-senadores-distrito-unico.service';

@Component({
    selector: 'app-senadores-distrito-unico',
    templateUrl: './senadores-distrito-unico.component.html',
    imports: [CdkScrollable],
})
export class SenadoresDistritoUnicoComponent implements OnInit {
    private candidatosService = inject(CandidatosSenadoresDistritoUnicoService);

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
