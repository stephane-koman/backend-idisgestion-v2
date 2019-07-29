import {Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ListeRoles} from '../../models/role/liste-roles';
import {RoleService} from '../../services/role/role.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder} from '@angular/forms';
import {TokenService} from '../../services/token/token.service';
import {Role} from '../../models/role/role';
import {ModalRoleComponent} from './modal-role.component';
import {ModalRemoveRoleComponent} from './modal-remove-role.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {

  modalRef: BsModalRef;

  allRoles: ListeRoles;
  roleSubscription: Subscription = null;
  roleName: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(
    private roleService: RoleService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.searchRoles();
  }

  searchRoleName() {
    this.searchRoles();
  }

  searchStatut() {
    this.searchRoles();
  }

// ---------------------------------- START API REQUEST-----------------------------------------------------
  searchRoles() {
    this.roleSubscription = this.roleService.searchRoles(this.roleName, this.enable, this.currentPage, this.size)
      .subscribe((roles) => {
        this.allRoles = roles;
        this.pages = new Array(roles.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchRoles();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchRoles();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchRoles();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchRoles();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchRoles();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchRoles();
  }

  reload() {
    this.currentPage = 0;
    this.searchRoles();
  }

  //---------------------------------- MODAL FORMS -------------------------------
  openModal(role: Role, type: string) {
    if (type === 'i') {
      this.modalRef = this.modalService.show(ModalRoleComponent, {class: 'modal-md modal-primary'});
    }
    if (type === 'u') {
      this.modalRef = this.modalService.show(ModalRoleComponent, {class: 'modal-md modal-warning'});
    }
    if (type === 's') {
      this.modalRef = this.modalService.show(ModalRoleComponent, {class: 'modal-md modal-default'});
    }

    (<ModalRoleComponent>this.modalRef.content).showRoleModal(
      type,
      role
    );

    (<ModalRoleComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'i' || result.type === 'u') {
        this.searchRoles();
      }
    });

  }

  openRemoveModal(role: Role, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveRoleComponent, {class: 'modal-sm'});

    (<ModalRemoveRoleComponent>this.modalRef.content).showRemoveModal(
      type,
      role
    );

    (<ModalRemoveRoleComponent>this.modalRef.content).onClose.subscribe(result => {
      if (result.type === 'd') {
        this.allRoles.roles[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allRoles.roles[index].enable = 1;
      }
      if (result.type === 'r') {
        this.searchRoles();
      }
    });

  }

  ngOnDestroy(){
    this.roleSubscription !== null ? this.roleSubscription.unsubscribe() : null;
  }

}
