import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientRoutingModule} from './client-routing.module';
import {ClientsComponent} from './clients.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LaddaModule} from 'angular2-ladda';
import {
  AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {DataTableModule} from 'ng2-data-table';
import {ToastrModule} from 'ngx-toastr';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ClientService} from '../../services/client/client.service';
import {ModalClientComponent} from './modal-client.component';
import {ModalRemoveClientComponent} from './modal-remove-client.component';

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule ,
    DataTableModule,
    LaddaModule.forRoot({
      style: 'expand-left',
      spinnerSize: 40,
      spinnerColor: 'white',
      spinnerLines: 12
    }),
    BsDropdownModule.forRoot(),
    TabsModule,
    ToastrModule.forRoot(), // ToastrModule added
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule
  ],
  declarations: [
    ClientsComponent,
    ModalClientComponent,
    ModalRemoveClientComponent
  ],
  entryComponents: [
    ModalClientComponent,
    ModalRemoveClientComponent
  ],
  providers: [
    ClientService
  ]
})
export class ClientModule { }
