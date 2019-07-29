import {Utilisateur} from './utilisateur';

export class ListeUtilisateurs {
  utilisateurs: Array<Utilisateur>;
  page: number;
  nombreUtilisateurs: number;
  totalUtilisateurs: number;
  totalPages: number;
}
