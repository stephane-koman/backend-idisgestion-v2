import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SiteRoutingModule} from './site-routing.module';
import {SitesComponent} from './sites.component';
import {ModalSiteComponent} from './modal-site.component';
import {ModalRemoveSiteComponent} from './modal-remove-site.component';
import {
  AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {LaddaModule} from 'angular2-ladda';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {DataTableModule} from 'ng2-data-table';
import {SiteService} from '../../services/site/site.service';
import {PaysService} from '../../services/pays/pays.service';
import {NgSelectModule} from '@ng-select/ng-select';
import {TvaService} from '../../services/tva/tva.service';
import {DeviseService} from '../../services/devise/devise.service';

@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule,
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
    SitesComponent,
    ModalSiteComponent,
    ModalRemoveSiteComponent,
  ],
  entryComponents: [ModalSiteComponent, ModalRemoveSiteComponent],
  providers: [
    SiteService,
    TvaService,
    DeviseService,
    PaysService
  ]
})
export class SiteModule { }
