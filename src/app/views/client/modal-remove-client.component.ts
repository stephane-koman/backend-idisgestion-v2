import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {ClientService} from '../../services/client/client.service';
import {Client} from '../../models/client/client';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-modal-remove-client',
  templateUrl: './modal-remove-client.component.html',
  styleUrls: ['./modal-remove-client.component.scss']
})
export class ModalRemoveClientComponent implements OnInit, OnDestroy {

  public client: Client = new Client();
  clientSubscription: Subscription =null;

  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private clientService: ClientService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, client: Client): void {
    this.type = type;
    this.client =  client;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.clientSubscription = this.clientService.disableClient(this.client)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            client: this.client
          };
          this.showDisable("Client désactivé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.clientSubscription = this.clientService.removeClient(this.client)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            client: this.client
          };
          this.showRemove("Client supprimé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.clientSubscription = this.clientService.enableClient(this.client)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            client: this.client
          };
          this.showEnable("Client activé avec succès");
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
    this.clientSubscription !== null ? this.clientSubscription.unsubscribe() : null;
  }

}
