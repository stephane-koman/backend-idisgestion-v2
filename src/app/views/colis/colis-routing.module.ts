import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ColisReceiveComponent} from './colis-receive.component';
import {ColisSendComponent} from './colis-send.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Colis'
    },
    children: [
      {
        path: 'send',
        component: ColisSendComponent,
        data: {
          title: 'Envoyés'
        }
      },
      {
        path: 'receive',
        component: ColisReceiveComponent,
        data: {
          title: 'Réçus'
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
export class ColisRoutingModule {
}
