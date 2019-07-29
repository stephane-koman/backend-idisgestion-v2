import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SitesComponent} from './sites.component';

const routes: Routes = [
  {
    path: '',
    component: SitesComponent,
    data: {
      title: 'Paramètres'
    }, children: [
      {
        path: '',
        data: {
          title: 'Sites'
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
export class SiteRoutingModule {
}
