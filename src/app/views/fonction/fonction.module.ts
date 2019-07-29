import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FonctionRoutingModule} from './fonction-routing.module';
import {FonctionComponent} from './fonction.component';
import {
  AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {LaddaModule} from 'angular2-ladda';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {DataTableModule} from 'ng2-data-table';
import {ModalFonctionComponent} from './modal-fonction.component';
import {ModalRemoveFonctionComponent} from './modal-remove-fonction.component';
import {FonctionService} from '../../services/fonction/fonction.service';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    FonctionRoutingModule,
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
    FonctionComponent,
    ModalFonctionComponent,
    ModalRemoveFonctionComponent,
  ],
  entryComponents: [ModalFonctionComponent, ModalRemoveFonctionComponent],
  providers: [
    FonctionService
  ]
})
export class FonctionModule { }
