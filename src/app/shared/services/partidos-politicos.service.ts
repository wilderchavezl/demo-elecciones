import { Injectable } from '@angular/core';
import { listaPartidosPoliticos } from '@mock-api/partidos-politicos';
import { PartidoPolitico } from '@shared/models/partidos-politicos.model';
import { Response } from '@shared/models/response.model';
import { cloneDeep } from 'lodash-es';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PartidosPoliticosService {
    getAll(): Observable<Response<PartidoPolitico[]>> {
        const partidosPoliticos = cloneDeep(listaPartidosPoliticos);
        const data = partidosPoliticos.sort((a, b) => a.nombre.localeCompare(b.nombre));

        return of({
            success: true,
            data: data,
        });
    }
}
