import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {EmployeService} from '../../services/employe/employe.service';
import {Employe} from '../../models/employe/employe';

@Component({
  selector: 'app-modal-remove-employe',
  templateUrl: './modal-remove-employe.component.html',
  styleUrls: ['./modal-remove-employe.component.scss']
})
export class ModalRemoveEmployeComponent implements OnInit, OnDestroy {

  public employe: Employe = new Employe();
  employeSubscription: Subscription = null;
  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private employeService: EmployeService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, employe: Employe): void {
    this.type = type;
    this.employe =  employe;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
     this.employeSubscription = this.employeService.disableEmploye(this.employe)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            employe: this.employe
          };
          this.showDisable("Employe désactivé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.employeSubscription = this.employeService.removeEmploye(this.employe)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            employe: this.employe
          };
          this.showRemove("Employe supprimé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.employeSubscription = this.employeService.enableEmploye(this.employe)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            employe: this.employe
          };
          this.showEnable("Employe activé avec succès");
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
    this.employeSubscription !== null ? this.employeSubscription.unsubscribe() : null;
  }

}
