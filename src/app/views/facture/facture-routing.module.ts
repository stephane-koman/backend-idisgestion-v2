import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FacturesComponent} from './factures.component';

const routes: Routes = [
  {
    path: '',
    component: FacturesComponent,
    data: {
      title: 'Finances'
    }, children: [
      {
        path: '',
        data: {
          title: 'Factures'
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
export class FactureRoutingModule {
}
