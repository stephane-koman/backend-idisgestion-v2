import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReglementsComponent} from './reglements.component';

const routes: Routes = [
  {
    path: '',
    component: ReglementsComponent,
    data: {
      title: 'Finances'
    }, children: [
      {
        path: '',
        data: {
          title: 'Reglements'
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
export class ReglementRoutingModule {
}
