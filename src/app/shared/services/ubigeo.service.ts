import { Injectable } from '@angular/core';
import { listaUbigeo } from '@mock-api/ubigeo';
import { Response } from '@shared/models/response.model';
import { Ubigeo } from '@shared/models/ubigeo.model';
import { cloneDeep } from 'lodash-es';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UbigeoService {
    getAll(): Observable<Response<Ubigeo[]>> {
        return of({
            success: true,
            data: cloneDeep(listaUbigeo),
        });
    }
}
