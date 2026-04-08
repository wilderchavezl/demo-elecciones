import { Injectable } from '@angular/core';
import { listaCandidatosParlamentoAndino } from '@mock-api/candidatos-parlamento-andino';
import { listaPartidosPoliticos } from '@mock-api/partidos-politicos';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { Response } from '@shared/models/response.model';
import { cloneDeep } from 'lodash';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CandidatosParlamentoAndinoService {
    getAll(): Observable<Response<CandidatoRequest[]>> {
        const partidosPoliticos = cloneDeep(listaPartidosPoliticos);
        const candidatos = cloneDeep(listaCandidatosParlamentoAndino);

        candidatos.sort((a, b) => {
            return a.idPartido - b.idPartido || a.posicion! - b.posicion!;
        });

        const candidatosRequest: CandidatoRequest[] = candidatos.map((candidato) => {
            const partidoPolitico = partidosPoliticos.find((partido) => partido.id === candidato.idPartido);

            return {
                id: candidato.id,
                nombres: candidato.nombres,
                apellidos: candidato.apellidos,
                fotoUrl: candidato.fotoUrl,
                partidoPolitico: partidoPolitico!,
                posicion: candidato.posicion,
            };
        });

        return of({
            success: true,
            data: candidatosRequest,
        });
    }
}
