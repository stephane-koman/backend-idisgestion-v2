import {Colis} from '../colis/colis';
import {Utilisateur} from '../utilisateur/utilisateur';
import {Devise} from '../devise/devise';

export class Mouvement{
  id: number;
  type: string;
  debit: number;
  credit: number;
  devise: Devise;
  colis: Colis;
  utilisateur: Utilisateur;
  createAt: Date;
  updateAt: Date;
  enable: number;
}
