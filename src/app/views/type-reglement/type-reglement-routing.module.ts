import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TypeReglementComponent} from './type-reglement.component';

const routes: Routes = [
  {
    path: '',
    component: TypeReglementComponent,
    data: {
      title: 'Paramètres'
    }, children: [
      {
        path: '',
        data: {
          title: 'Type Reglement'
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
export class TypeReglementRoutingModule {
}
