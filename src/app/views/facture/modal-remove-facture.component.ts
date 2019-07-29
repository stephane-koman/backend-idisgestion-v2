import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FactureService} from '../../services/facture/facture.service';
import {Subject, Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Facture} from '../../models/facture/facture';

@Component({
  selector: 'app-modal-remove-facture',
  templateUrl: './modal-remove-facture.component.html',
  styleUrls: ['./modal-remove-facture.component.scss']
})
export class ModalRemoveFactureComponent implements OnInit {

  public facture: Facture = new Facture();
  factureSubscription: Subscription =null;

  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private factureService: FactureService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, facture: Facture): void {
    this.type = type;
    this.facture =  facture;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.factureSubscription = this.factureService.disableFacture(this.facture)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            facture: this.facture
          };
          this.showDisable("Facture désactivée avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.factureSubscription = this.factureService.removeFacture(this.facture)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            facture: this.facture
          };
          this.showRemove("Facture supprimée avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.factureSubscription = this.factureService.enableFacture(this.facture)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            facture: this.facture
          };
          this.showEnable("Facture activée avec succès");
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
    this.factureSubscription !== null ? this.factureSubscription.unsubscribe() : null;
  }


}
