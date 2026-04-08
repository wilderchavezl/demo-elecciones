import { Injectable } from '@angular/core';
import { listaCandidatosSenadoresDistritoUnico } from '@mock-api/candidatos-senadores-distrito-unico';
import { listaPartidosPoliticos } from '@mock-api/partidos-politicos';
import { listaUbigeo } from '@mock-api/ubigeo';
import { CandidatoRequest } from '@shared/models/candidatos.model';
import { Response } from '@shared/models/response.model';
import { cloneDeep } from 'lodash-es';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CandidatosSenadoresDistritoUnicoService {
    getAll(): Observable<Response<CandidatoRequest[]>> {
        const partidosPoliticos = cloneDeep(listaPartidosPoliticos);
        const ubigeos = cloneDeep(listaUbigeo);
        const candidatos = cloneDeep(listaCandidatosSenadoresDistritoUnico);

        candidatos.sort((a, b) => {
            return a.idPartido - b.idPartido || a.posicion! - b.posicion!;
        });

        const candidatosRequest: CandidatoRequest[] = candidatos.map((candidato) => {
            const partidoPolitico = partidosPoliticos.find((partido) => partido.id === candidato.idPartido);
            const ubigeo = ubigeos.find((ubigeo) => ubigeo.id === candidato.idUbigeo);

            return {
                id: candidato.id,
                nombres: candidato.nombres,
                apellidos: candidato.apellidos,
                fotoUrl: candidato.fotoUrl,
                partidoPolitico: partidoPolitico!,
                posicion: candidato.posicion,
                ubigeo: ubigeo,
            };
        });

        return of({
            success: true,
            data: candidatosRequest,
        });
    }
}
