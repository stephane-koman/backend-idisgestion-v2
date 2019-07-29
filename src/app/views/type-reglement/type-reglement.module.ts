import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TypeReglementRoutingModule} from './type-reglement-routing.module';
import {TypeReglementComponent} from './type-reglement.component';
import {
  AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {LaddaModule} from 'angular2-ladda';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {DataTableModule} from 'ng2-data-table';
import {ModalTypeReglementComponent} from './modal-type-reglement.component';
import {ModalRemoveTypeReglementComponent} from './modal-remove-type-reglement.component';
import {TypeReglementService} from '../../services/type-reglement/type-reglement.service';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    TypeReglementRoutingModule,
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
    TypeReglementComponent,
    ModalTypeReglementComponent,
    ModalRemoveTypeReglementComponent,
  ],
  entryComponents: [ModalTypeReglementComponent, ModalRemoveTypeReglementComponent],
  providers: [
    TypeReglementService
  ]
})
export class TypeReglementModule { }
