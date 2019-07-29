import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployesComponent} from './employes.component';

const routes: Routes = [
  {
    path: '',
    component: EmployesComponent,
    data: {
      title: 'Employes'
    }
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
export class EmployeRoutingModule {
}
