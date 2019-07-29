import { NgModule } from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {ChartsModule} from 'ng2-charts';
import {BsDropdownModule, ButtonsModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {EmployeService} from '../../services/employe/employe.service';
import {ClientService} from '../../services/client/client.service';
import {ColisService} from '../../services/colis/colis.service';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [DashboardComponent],
  providers: [
    EmployeService,
    ClientService,
    ColisService
  ]
})
export class DashboardModule { }
