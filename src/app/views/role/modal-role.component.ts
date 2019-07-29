import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RoleService} from '../../services/role/role.service';
import {Role} from '../../models/role/role';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-modal-role',
  templateUrl: './modal-role.component.html',
  styleUrls: ['./modal-role.component.scss']
})
export class ModalRoleComponent implements OnInit, OnDestroy {

  public role: Role = new Role();
  roleSubscription: Subscription = null;
  public type: string;
  roleForm: FormGroup;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  error: string = "";
  alert: any = {
    type: "danger",
    dismissible: true
  };

  constructor(private roleService: RoleService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.createForm();
  }

  public showRoleModal(type: string, role: Role): void {
    this.type = type;
    console.log(role);
    if (role !== null) {
      this.roleForm.setValue({
        id: role.id || '',
        roleName: role.roleName || '',
      });

      let id = this.roleForm.get('id');
      let roleName = this.roleForm.get('roleName');

      (this.type) ? id.disable() : id.enable();
      (this.type === 's') ? roleName.disable() : roleName.enable();

    }

  }

  createForm() {

    this.roleForm = this.fb.group({
      id: new FormControl(''),
      roleName: new FormControl(this.role.roleName, [Validators.required, Validators.minLength(3)])
    });

  }

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.saveRole();
    }
    if (this.type === 'u') {
      this.updateRole();
    }
  }

  showSave(msg: string) {
    this.toastr.success(msg, 'Enregistrement', {
      closeButton: true,
      timeOut: 3000,
    });
  }

  showUpdate(msg: string) {
    this.toastr.warning(msg, 'Modification', {
      closeButton: true,
      timeOut: 3000,
    });
  }

  saveRole() {
    this.isLoading = true;
    this.role.roleName = this.roleForm.value.roleName;

    this.roleSubscription = this.roleService.addRole(this.role)
      .subscribe((role: Role) => {
        let data = {
          type: this.type,
          role: role
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave('Rôle enregistré avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  updateRole() {
    this.isLoading = true;
    this.role.id = this.roleForm.getRawValue().id;
    this.role.roleName = this.roleForm.getRawValue().roleName;

    this.roleSubscription = this.roleService.updateRole(this.role)
      .subscribe((role: Role) => {
        let data = {
          type: this.type,
          role: role
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate('Rôle modifié avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  dismiss(){
    this.error = "";
  }

  ngOnDestroy(){
    this.roleSubscription !== null ? this.roleSubscription.unsubscribe() : null;
  }

}
