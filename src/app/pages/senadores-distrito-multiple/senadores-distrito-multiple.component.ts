import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, inject, OnInit } from '@angular/core';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { CandidatosSenadoresDistritoMultipleService } from '@shared/services/candidatos-senadores-distrito-multiple.service';

@Component({
    selector: 'app-senadores-distrito-multiple',
    templateUrl: './senadores-distrito-multiple.component.html',
    imports: [CdkScrollable],
})
export class SenadoresDistritoMultipleComponent implements OnInit {
    private candidatosService = inject(CandidatosSenadoresDistritoMultipleService);

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
