import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component } from '@angular/core';
import { CandidatoRequest } from '@shared/models/candidatos.model';

@Component({
    selector: 'app-diputados',
    templateUrl: './diputados.component.html',
    imports: [CdkScrollable],
})
export class DiputadosComponent {
    public candidatosDiputados: CandidatoRequest[] = [];
}
