import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ColisClientComponent} from './colis-client.component';

const routes: Routes = [
  {
    path: '',
    component: ColisClientComponent,
    data: {
      title: 'Colis'
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
export class ColisClientRoutingModule {
}
