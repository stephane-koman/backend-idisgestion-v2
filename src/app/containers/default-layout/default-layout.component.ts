import {Component, OnDestroy, Inject, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {NavData, navItems} from '../../_nav';
import {TokenService} from '../../services/token/token.service';
import {AuthenticationService} from '../../services/auth/authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public navItems = navItems;
  public newNavItems: NavData[] = [];
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(private tokenService: TokenService, private auth: AuthenticationService ,@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  public hasRoles(roles){
    return this.tokenService.hasRoles(roles);
  }


  ngOnInit(): void {
    navItems.forEach((ni) =>{
      if(this.hasRoles(ni.roles)){
        this.newNavItems.push(ni);
      }
    });
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout(){
    this.auth.logout();
  }
}
