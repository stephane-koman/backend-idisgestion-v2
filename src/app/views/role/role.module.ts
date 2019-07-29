import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleRoutingModule} from './role-routing.module';
import {RolesComponent} from './roles.component';
import {ModalRoleComponent} from './modal-role.component';
import {ModalRemoveRoleComponent} from './modal-remove-role.component';
import {RoleService} from '../../services/role/role.service';
import {
  AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {LaddaModule} from 'angular2-ladda';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {DataTableModule} from 'ng2-data-table';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule ,
    DataTableModule,
    LaddaModule.forRoot({
      style: 'expand-left',
      spinnerSize: 40,
      spinnerColor: 'white',
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
    RolesComponent,
    ModalRoleComponent,
    ModalRemoveRoleComponent,
  ],
  entryComponents: [ModalRoleComponent, ModalRemoveRoleComponent],
  providers: [
    RoleService
  ]
})
export class RoleModule {
}
