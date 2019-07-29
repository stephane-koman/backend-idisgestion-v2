import { NgModule } from '@angular/core';
import {FactureRoutingModule} from './facture-routing.module';
import {FacturesComponent} from './factures.component';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LaddaModule} from 'angular2-ladda';
import {
  AlertModule, BsDatepickerModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule,
  TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {DataTableModule} from 'ng2-data-table';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {ToastrModule} from 'ngx-toastr';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ColisService} from '../../services/colis/colis.service';
import {FactureService} from '../../services/facture/facture.service';
import {TypeFactureService} from '../../services/type-facture/type-facture.service';
import {TvaService} from '../../services/tva/tva.service';
import {DeviseService} from '../../services/devise/devise.service';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {ModalRemoveFactureComponent} from './modal-remove-facture.component';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import {PdfJsViewerModule} from "ng2-pdfjs-viewer";
import {NgxSpinnerModule} from "ngx-spinner";
defineLocale('fr', frLocale);

@NgModule({
  imports: [
    CommonModule,
    FactureRoutingModule,
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
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxQRCodeModule,
    PaginationModule,
    PdfJsViewerModule,
    NgxSpinnerModule
  ],
  declarations: [
    FacturesComponent,
    ModalRemoveFactureComponent
  ],
  entryComponents: [
    ModalRemoveFactureComponent
  ],
  providers: [
    ColisService,
    FactureService,
    TypeFactureService,
    TvaService,
    DeviseService,
    UtilisateurService
  ]
})
export class FactureModule { }
