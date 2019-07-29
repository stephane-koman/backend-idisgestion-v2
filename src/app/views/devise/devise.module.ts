import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeviseRoutingModule} from './devise-routing.module';
import {DeviseComponent} from './devise.component';
import {
  AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {LaddaModule} from 'angular2-ladda';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {DataTableModule} from 'ng2-data-table';
import {ModalDeviseComponent} from './modal-devise.component';
import {ModalRemoveDeviseComponent} from './modal-remove-devise.component';
import {DeviseService} from '../../services/devise/devise.service';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    DeviseRoutingModule,
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
    ModalModule.forRoot(),
    PaginationModule
  ],
  declarations: [
    DeviseComponent,
    ModalDeviseComponent,
    ModalRemoveDeviseComponent,
  ],
  entryComponents: [ModalDeviseComponent, ModalRemoveDeviseComponent],
  providers: [
    DeviseService
  ]
})
export class DeviseModule { }
