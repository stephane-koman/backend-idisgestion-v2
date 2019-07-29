import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TypeFactureRoutingModule} from './type-facture-routing.module';
import {TypeFactureComponent} from './type-facture.component';
import {
  AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {LaddaModule} from 'angular2-ladda';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {DataTableModule} from 'ng2-data-table';
import {ModalTypeFactureComponent} from './modal-type-facture.component';
import {ModalRemoveTypeFactureComponent} from './modal-remove-type-facture.component';
import {TypeFactureService} from '../../services/type-facture/type-facture.service';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    TypeFactureRoutingModule,
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
    TypeFactureComponent,
    ModalTypeFactureComponent,
    ModalRemoveTypeFactureComponent,
  ],
  entryComponents: [ModalTypeFactureComponent, ModalRemoveTypeFactureComponent],
  providers: [
    TypeFactureService
  ]
})
export class TypeFactureModule { }
