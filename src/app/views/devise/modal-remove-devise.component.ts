import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {Devise} from '../../models/devise/devise';
import {DeviseService} from '../../services/devise/devise.service';

@Component({
  selector: 'app-modal-remove-devise',
  templateUrl: './modal-remove-devise.component.html',
  styleUrls: ['./modal-remove-devise.component.scss']
})
export class ModalRemoveDeviseComponent implements OnInit, OnDestroy {

  public devise: Devise = new Devise();
  deviseSubscription: Subscription = null;
  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private deviseService: DeviseService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, devise: Devise): void {
    this.type = type;
    this.devise =  devise;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.deviseSubscription = this.deviseService.disableDevise(this.devise)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            devise: this.devise
          };
          this.showDisable("Devise désactivée avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.deviseSubscription = this.deviseService.removeDevise(this.devise)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            devise: this.devise
          };
          this.showRemove("Devise supprimée avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.deviseSubscription = this.deviseService.enableDevise(this.devise)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            devise: this.devise
          };
          this.showEnable("Devise activée avec succès");
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
    this.deviseSubscription !== null ? this.deviseSubscription.unsubscribe() : null;
  }

}
