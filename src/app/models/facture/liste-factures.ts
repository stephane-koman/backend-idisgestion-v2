import {Facture} from './facture';

export class ListeFactures {
  factures: Array<Facture>;
  page: number;
  nombreFactures: number;
  totalFactures: number;
  totalPages: number;
}
