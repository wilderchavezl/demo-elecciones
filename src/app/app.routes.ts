import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
            },
            {
                path: 'presidente',
                loadComponent: () =>
                    import('./pages/presidente/presidente.component').then((m) => m.PresidenteComponent),
            },
            {
                path: 'diputados',
                loadComponent: () => import('./pages/diputados/diputados.component').then((m) => m.DiputadosComponent),
            },
            {
                path: 'senadores',
                loadComponent: () => import('./pages/senadores/senadores.component').then((m) => m.SenadoresComponent),
            },
            {
                path: 'parlamento-andino',
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
