import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, inject, OnInit } from '@angular/core';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { CandidatosPresidenteService } from '@shared/services/candidatos-presidente.service';

@Component({
    selector: 'app-presidente',
    templateUrl: './presidente.component.html',
    imports: [CdkScrollable],
})
export class PresidenteComponent implements OnInit {
    private candidatosPresidenteService = inject(CandidatosPresidenteService);

    public candidatosPresidente: CandidatoRequest[] = [];

    ngOnInit(): void {
        this.getCandidatosPresidente();
    }

    private getCandidatosPresidente(): void {
        this.candidatosPresidenteService.getAll().subscribe({
            next: (response) => {
                this.candidatosPresidente = response.data;
            },
        });
    }
}
