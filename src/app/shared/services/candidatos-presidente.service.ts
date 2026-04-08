import { Injectable } from '@angular/core';
import { listaCandidatosPresidente } from '@mock-api/candidatos-presidente';
import { listaPartidosPoliticos } from '@mock-api/partidos-politicos';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { Response } from '@shared/models/response.model';
import { cloneDeep } from 'lodash-es';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CandidatosPresidenteService {
    getCandidatosPresidente(): Observable<Response<CandidatoRequest[]>> {
        const partidosPoliticos = cloneDeep(listaPartidosPoliticos);
        const candidatosPresidente = cloneDeep(listaCandidatosPresidente);

        const candidatosRequest: CandidatoRequest[] = candidatosPresidente.map((candidato) => {
            const partidoPolitico = partidosPoliticos.find((partido) => partido.id === candidato.idPartido);

            return {
                id: candidato.id,
                nombres: candidato.nombres,
                apellidos: candidato.apellidos,
                fotoUrl: candidato.fotoUrl,
                partidoPolitico: partidoPolitico!,
            };
        });

        return of({
            success: true,
            data: candidatosRequest,
        });
    }
}
