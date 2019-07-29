import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TypeFactureComponent} from './type-facture.component';

const routes: Routes = [
  {
    path: '',
    component: TypeFactureComponent,
    data: {
      title: 'Paramètres'
    }, children: [
      {
        path: '',
        data: {
          title: 'Type Facture'
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
export class TypeFactureRoutingModule {
}
