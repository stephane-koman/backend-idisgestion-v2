import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TvaRoutingModule} from './tva-routing.module';
import {TvaComponent} from './tva.component';
import {
  AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {LaddaModule} from 'angular2-ladda';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {DataTableModule} from 'ng2-data-table';
import {ModalTvaComponent} from './modal-tva.component';
import {ModalRemoveTvaComponent} from './modal-remove-tva.component';
import {TvaService} from '../../services/tva/tva.service';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    TvaRoutingModule,
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
    TvaComponent,
    ModalTvaComponent,
    ModalRemoveTvaComponent,
  ],
  entryComponents: [ModalTvaComponent, ModalRemoveTvaComponent],
  providers: [
    TvaService
  ]
})
export class TvaModule { }
