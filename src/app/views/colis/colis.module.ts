import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColisReceiveComponent} from './colis-receive.component';
import {ColisSendComponent} from './colis-send.component';
import {ColisRoutingModule} from './colis-routing.module';
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
import { ModalRemoveColisComponent } from './modal-remove-colis.component';
import {SuiviColisComponent} from './suivi-colis.component';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {PdfJsViewerModule} from "ng2-pdfjs-viewer";
import {NgxSpinnerModule} from "ngx-spinner";

@NgModule({
  imports: [
    CommonModule,
    ColisRoutingModule,
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
    NgxQRCodeModule,
    PaginationModule,
    PdfJsViewerModule,
    NgxSpinnerModule
  ],
  declarations: [
    ColisReceiveComponent,
    ColisSendComponent,
    ModalRemoveColisComponent,
    SuiviColisComponent
  ],
  entryComponents: [
    ModalRemoveColisComponent,
    SuiviColisComponent
  ],
  providers: [
    ColisService,
    ClientService,
    SiteService,
    UtilisateurService
  ]
})
export class ColisModule { }
