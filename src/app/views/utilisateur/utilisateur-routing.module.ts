import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UtilisateursComponent} from './utilisateurs.component';

const routes: Routes = [
  {
    path: '',
    component: UtilisateursComponent,
    data: {
      title: 'Paramètres'
    }, children: [
      {
        path: '',
        data: {
          title: 'Utilisateurs'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UtilisateurRoutingModule {
}
