import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaysRoutingModule} from './pays-routing.module';
import {PaysComponent} from './pays.component';
import {
  AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {LaddaModule} from 'angular2-ladda';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {DataTableModule} from 'ng2-data-table';
import {ModalPaysComponent} from './modal-pays.component';
import {ModalRemovePaysComponent} from './modal-remove-pays.component';
import {PaysService} from '../../services/pays/pays.service';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    PaysRoutingModule,
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
    PaysComponent,
    ModalPaysComponent,
    ModalRemovePaysComponent,
  ],
  entryComponents: [ModalPaysComponent, ModalRemovePaysComponent],
  providers: [
    PaysService
  ]
})
export class PaysModule { }
