import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import {TokenService} from './services/token/token.service';
import {httpInterceptorProviders} from './http-interceptors';
import {RoleGuard} from './guards/role.guard';
import {HomeGuard} from './guards/home.guard';
import {HandleErrorService} from './services/error/handle-error.service';
import {AlertModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TooltipModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LaddaModule} from 'angular2-ladda';

import {PaginationModule} from './components/pagination/pagination.module';
import {LoginModule} from './views/login/login.module';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {NgSelectModule} from '@ng-select/ng-select';
import {DataTableModule} from 'ng2-data-table';

export function tokenGetter() {
  return localStorage.getItem('jwt_token');
}

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200', '127.0.0.1:4200', 'http://127.0.0.1:4200']
      }
    }),
    NgSelectModule ,
    DataTableModule,
    LaddaModule.forRoot({
      style: 'expand-left',
      spinnerSize: 40,
      spinnerColor: 'white',
      spinnerLines: 12
    }),
    FormsModule,
    ChartsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    LaddaModule,
    LoginModule,
    PaginationModule
  ],
  exports: [BrowserAnimationsModule],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    P404Component
  ],
  providers: [
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
    TokenService,
    httpInterceptorProviders,
    RoleGuard,
    HomeGuard,
    HandleErrorService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
