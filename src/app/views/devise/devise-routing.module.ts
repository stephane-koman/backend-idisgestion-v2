import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeviseComponent} from './devise.component';

const routes: Routes = [
  {
    path: '',
    component: DeviseComponent,
    data: {
      title: 'Paramètres'
    }, children: [
      {
        path: '',
        data: {
          title: 'Devise'
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
export class DeviseRoutingModule {
}
