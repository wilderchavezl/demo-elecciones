import { PartidoPolitico } from '@shared/models/partidos-politicos.model';
import { Ubigeo } from '@shared/models/ubigeo.model';

export interface Candidato {
    id: number;
    nombres: string;
    apellidos: string;
    fotoUrl: string;
    idPartido: number;
    idUbigeo?: number;
    posicion?: number;
}

export interface CandidatoRequest {
    id: number;
    nombres: string;
    apellidos: string;
    fotoUrl: string;
    partidoPolitico: PartidoPolitico;
    ubigeo?: Ubigeo;
    posicion?: number;
}
