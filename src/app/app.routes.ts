import { Routes } from '@angular/router';

import { initialDataResolver } from './app.resolvers';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
            },
            {
                path: 'candidatos-presidente',
                loadComponent: () =>
                    import('./pages/presidente/presidente.component').then((m) => m.PresidenteComponent),
            },
            {
                path: 'candidatos-diputados',
                loadComponent: () => import('./pages/diputados/diputados.component').then((m) => m.DiputadosComponent),
            },
            {
                path: 'candidatos-senadores-distrito-unico',
                loadComponent: () =>
                    import('./pages/senadores-distrito-unico/senadores-distrito-unico.component').then(
                        (m) => m.SenadoresDistritoUnicoComponent
                    ),
            },
            {
                path: 'candidatos-senadores-distrito-multiple',
                loadComponent: () =>
                    import('./pages/senadores-distrito-multiple/senadores-distrito-multiple.component').then(
                        (m) => m.SenadoresDistritoMultipleComponent
                    ),
            },
            {
                path: 'candidatos-parlamento-andino',
                loadComponent: () =>
                    import('./pages/parlamento-andino/parlamento-andino.component').then(
                        (m) => m.ParlamentoAndinoComponent
                    ),
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];
