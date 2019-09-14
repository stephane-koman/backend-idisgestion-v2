import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DomaineActiviteComponent} from './domaine-activite.component';

const routes: Routes = [
  {
    path: '',
    component: DomaineActiviteComponent,
    data: {
      title: 'Paramètres'
    }, children: [
      {
        path: '',
        data: {
          title: 'Domaine activité'
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
export class DomaineActiviteRoutingModule {
}
