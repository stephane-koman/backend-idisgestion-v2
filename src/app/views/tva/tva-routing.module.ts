import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TvaComponent} from './tva.component';

const routes: Routes = [
  {
    path: '',
    component: TvaComponent,
    data: {
      title: 'Paramètres'
    }, children: [
      {
        path: '',
        data: {
          title: 'Tva'
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
export class TvaRoutingModule {
}
