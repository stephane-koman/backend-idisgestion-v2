import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaysComponent} from './pays.component';

const routes: Routes = [
  {
    path: '',
    component: PaysComponent,
    data: {
      title: 'Paramètres'
    }, children: [
      {
        path: '',
        data: {
          title: 'Pays'
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
export class PaysRoutingModule {
}
