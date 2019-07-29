import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {LaddaModule} from 'angular2-ladda';
import {DataTableModule} from 'ng2-data-table';
import {ToastrModule} from 'ngx-toastr';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ColisService} from '../../services/colis/colis.service';
import {ClientService} from '../../services/client/client.service';
import {SiteService} from '../../services/site/site.service';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {ColisClientRoutingModule} from './colis-client-routing.module';
import {ColisClientComponent} from './colis-client.component';

@NgModule({
  imports: [
    CommonModule,
    ColisClientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule ,
    DataTableModule,
    LaddaModule.forRoot({
      style: "expand-left",
      spinnerSize: 40,
      spinnerColor: "white",
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
    NgxQRCodeModule,
    PaginationModule
  ],
  declarations: [
    ColisClientComponent
  ],
  providers: [
    ColisService,
    ClientService,
    SiteService
  ]
})
export class ColisClientModule { }
