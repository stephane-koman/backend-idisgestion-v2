import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DomaineActiviteRoutingModule} from './domaine-activite-routing.module';
import {DomaineActiviteComponent} from './domaine-activite.component';
import {
  AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {LaddaModule} from 'angular2-ladda';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {DataTableModule} from 'ng2-data-table';
import {ModalDomaineActiviteComponent} from './modal-domaine-activite.component';
import {ModalRemoveDomaineActiviteComponent} from './modal-remove-domaine-activite.component';
import {DomaineActiviteService} from '../../services/domaine-activite/domaine-activite.service';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    DomaineActiviteRoutingModule,
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
    DomaineActiviteComponent,
    ModalDomaineActiviteComponent,
    ModalRemoveDomaineActiviteComponent,
  ],
  entryComponents: [ModalDomaineActiviteComponent, ModalRemoveDomaineActiviteComponent],
  providers: [
    DomaineActiviteService
  ]
})
export class DomaineActiviteModule { }
