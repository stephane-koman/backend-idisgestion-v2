import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { LoginComponent } from './views/login/login.component';
import {RoleGuard} from './guards/role.guard';
import {HomeGuard} from './guards/home.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Page de connexion'
    },
    canActivate: [HomeGuard]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Accueil'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER', 'CLIENT']}
      },
      {
        path: 'client',
        loadChildren: () => import('./views/client/client.module').then(m => m.ClientModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'employe',
        loadChildren: () => import('./views/employe/employe.module').then(m => m.EmployeModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'colis',
        loadChildren: () => import('./views/colis/colis.module').then(m => m.ColisModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'colis-client',
        loadChildren: () => import('./views/colis-client/colis-client.module').then(m => m.ColisClientModule),
        canActivate:[RoleGuard],
        data: {roles: ['CLIENT']}
      },
      {
        path: 'finances/facture',
        loadChildren: () => import('./views/facture/facture.module').then(m => m.FactureModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'finances/reglement',
        loadChildren: () => import('./views/reglement/reglement.module').then(m => m.ReglementModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/role',
        loadChildren: () => import('./views/role/role.module').then(m => m.RoleModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/utilisateur',
        loadChildren: () => import('./views/utilisateur/utilisateur.module').then(m => m.UtilisateurModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/site',
        loadChildren: () => import('./views/site/site.module').then(m => m.SiteModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/pays',
        loadChildren: () => import('./views/pays/pays.module').then(m => m.PaysModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/fonction',
        loadChildren: () => import('./views/fonction/fonction.module').then(m => m.FonctionModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/type-facture',
        loadChildren: () => import('./views/type-facture/type-facture.module').then(m => m.TypeFactureModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/type-reglement',
        loadChildren: () => import('./views/type-reglement/type-reglement.module').then(m => m.TypeReglementModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/devise',
        loadChildren: () => import('./views/devise/devise.module').then(m => m.DeviseModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/tva',
        loadChildren: () => import('./views/tva/tva.module').then(m => m.TvaModule),
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
