import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {Role} from '../../models/role/role';
import {RoleService} from '../../services/role/role.service';

@Component({
  selector: 'app-modal-remove-role',
  templateUrl: './modal-remove-role.component.html',
  styleUrls: ['./modal-remove-role.component.scss']
})
export class ModalRemoveRoleComponent implements OnInit, OnDestroy {

  public role: Role = new Role();
  roleSubscription: Subscription = null;
  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private roleService: RoleService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, role: Role): void {
    this.type = type;
    this.role =  role;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.roleSubscription = this.roleService.disableRole(this.role)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            role: this.role
          };
          this.showDisable("Rôle désactivé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.roleSubscription = this.roleService.removeRole(this.role)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            role: this.role
          };
          this.showRemove("Rôle supprimé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.roleSubscription = this.roleService.enableRole(this.role)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            role: this.role
          };
          this.showEnable("Rôle activé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

  }

  showEnable(msg: string) {
    this.toastr.success(msg, "Activation", {
      closeButton: true,
      timeOut: 3000,
    });
  }

  showDisable(msg: string) {
    this.toastr.error(msg, "Désactivation", {
      closeButton: true,
      timeOut: 3000,
    });
  }
  showRemove(msg: string) {
    this.toastr.error(msg, "Suppression", {
      closeButton: true,
      timeOut: 3000,
    });
  }

  close(){
    this.modalRef.hide();
  }

  ngOnDestroy(){
    this.roleSubscription !== null ? this.roleSubscription.unsubscribe() : null;
  }

}
