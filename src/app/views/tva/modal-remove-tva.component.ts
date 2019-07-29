import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {Tva} from '../../models/tva/tva';
import {TvaService} from '../../services/tva/tva.service';

@Component({
  selector: 'app-modal-remove-tva',
  templateUrl: './modal-remove-tva.component.html',
  styleUrls: ['./modal-remove-tva.component.scss']
})
export class ModalRemoveTvaComponent implements OnInit, OnDestroy {

  public tva: Tva = new Tva();
  tvaSubscription: Subscription = null;
  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private tvaService: TvaService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, tva: Tva): void {
    this.type = type;
    this.tva =  tva;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.tvaSubscription = this.tvaService.disableTva(this.tva)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            tva: this.tva
          };
          this.showDisable("Tva désactivée avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.tvaSubscription = this.tvaService.removeTva(this.tva)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            tva: this.tva
          };
          this.showRemove("Tva supprimée avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.tvaSubscription = this.tvaService.enableTva(this.tva)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            tva: this.tva
          };
          this.showEnable("Tva activée avec succès");
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
    this.tvaSubscription !== null ? this.tvaSubscription.unsubscribe() : null;
  }

}
