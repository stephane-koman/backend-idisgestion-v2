import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Utilisateur} from '../../models/utilisateur/utilisateur';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {RoleService} from '../../services/role/role.service';
import {Role} from '../../models/role/role';
import {Subject, Subscription} from 'rxjs';
import {RegisterForm} from '../../models/utilisateur/register-form';
import {PasswordValidator} from '../../directives/validators';
import {EmployeService} from '../../services/employe/employe.service';
import {ClientService} from '../../services/client/client.service';

@Component({
  selector: 'app-modal-utilisateur',
  templateUrl: './modal-utilisateur.component.html',
  styleUrls: ['./modal-utilisateur.component.scss']
})
export class ModalUtilisateurComponent implements OnInit, OnDestroy {

  public user: RegisterForm = new RegisterForm();
  userSubscription: Subscription = null;

  public type: string;
  userForm: FormGroup;

  allRoles: Array<Role> = new Array<Role>();
  roleSubscription: Subscription = null;

  allPersonnes: Array<any> = new Array<any>();
  personneSubscription: Subscription = null;

  typeUser: string = 'employe';

  public onClose: Subject<any>;

  isFocused = true;
  isLoading: boolean = false;

  hasClientAndOther: boolean = false;

  error: string = '';
  alert: any = {
    type: 'danger',
    dismissible: true
  };

  constructor(private utilisateurService: UtilisateurService,
              private roleService: RoleService,
              private employeService: EmployeService,
              private clientService: ClientService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.getAllRoles();
    this.createForm();
  }

  public showUserModal(type: string, user: Utilisateur): void {
    this.type = type;
    console.log(user);
    if (user !== null) {

      this.userForm.setValue({
        id: user.id || '',
        username: user.username || '',
        password: '',
        repassword: '',
        personne: user.personne,
        roles: user.roles || []
      });

      if (this.hasRole(user.roles, 'CLIENT')) {
        this.typeUser = 'client';
        this.getAllClients();
      } else {
        this.typeUser = 'employe';
        this.getAllEmployes();
      }
    }

    let id = this.userForm.get('id');
    let username = this.userForm.get('username');
    let password = this.userForm.get('password');
    let repassword = this.userForm.get('repassword');
    let roles = this.userForm.get('roles');
    let personne = this.userForm.get('personne');

    (this.type) ? id.disable() : id.enable();
    ((this.type === 's') || (this.type === 'u')) ? username.disable() : username.enable();
    (this.type === 's') ? password.disable() : password.enable();
    (this.type === 's') ? repassword.disable() : repassword.enable();
    (this.type === 's') ? roles.disable() : roles.enable();
    (this.type === 's') ? personne.disable() : personne.enable();

  }

  createForm() {

    this.userForm = this.fb.group({
      id: new FormControl(this.user.id),
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(4)]),
      repassword: new FormControl(this.user.repassword, [Validators.required]),
      personne: new FormControl(this.user.personne, [Validators.required]),
      roles: new FormControl(this.user.roles, [Validators.required])
    }, {
      validator: PasswordValidator.matchPassword// your validation method
    });

  }

  changePersonne(event) {
    this.hasClientAndOther = false;
    if (event.length > 0) {
      if (this.hasRole(event, 'CLIENT')) {
        this.typeUser = 'client';
        this.getAllClients();
      } else {
        this.typeUser = 'employe';
        this.getAllEmployes();
      }

      if ((this.hasRole(event, 'ADMIN') && this.hasRole(event, 'CLIENT')) || (this.hasRole(event, 'USER') && this.hasRole(event, 'CLIENT'))) {
        this.typeUser = '';
        this.userForm.patchValue({
          personne: null
        });
        this.allPersonnes = null;
        this.hasClientAndOther = true;
      }
    } else {
      this.typeUser = '';
      this.userForm.patchValue({
        personne: null
      });
      this.allPersonnes = null;
    }

  }

  getAllRoles() {
    this.roleSubscription = this.roleService.getAllRoles().subscribe((roles) => {
      this.allRoles = roles;
      console.log(roles);
    });
  }

  getAllClients() {
    this.personneSubscription = this.clientService.getAllClients().subscribe((clients) => {
      this.allPersonnes = clients;
    });
  }

  getAllEmployes() {
    this.personneSubscription = this.employeService.getAllEmployes().subscribe((employes) => {
      this.allPersonnes = employes;
    });
  }

  hasRole(roles: Array<Role>, role: string) {
    if (roles) {
      for (let r of roles) {
        if (r.roleName == role) return true;
      }
    }
    return false;
  }

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.saveUser();
    }
    if (this.type === 'u') {
      this.updateUser();
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

  saveUser() {
    this.isLoading = true;
    this.user.username = this.userForm.value.username;
    this.user.password = this.userForm.value.password;
    this.user.repassword = this.userForm.value.repassword;
    this.user.roles = this.userForm.value.roles;
    this.user.personne = this.userForm.value.personne;

    this.userSubscription = this.utilisateurService.addUser(this.user)
      .subscribe((user: Utilisateur) => {
        let data = {
          type: this.type,
          user: user
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave('Utilisateur enregistré avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  updateUser() {
    this.isLoading = true;
    this.user.id = this.userForm.getRawValue().id;
    this.user.username = this.userForm.getRawValue().username;
    this.user.password = this.userForm.getRawValue().password;
    this.user.repassword = this.userForm.getRawValue().repassword;
    this.user.roles = this.userForm.getRawValue().roles;
    this.user.personne = this.userForm.getRawValue().personne;

    this.userSubscription = this.utilisateurService.updateUser(this.user)
      .subscribe((user: Utilisateur) => {
        let data = {
          type: this.type,
          user: user
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate('Utilisateur modifié avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  dismiss() {
    this.error = '';
  }

  ngOnDestroy(){
    this.userSubscription !== null ? this.userSubscription.unsubscribe() : null;
    this.roleSubscription !== null ? this.roleSubscription.unsubscribe() : null;
    this.personneSubscription !== null ? this.personneSubscription.unsubscribe() : null;
  }

}
