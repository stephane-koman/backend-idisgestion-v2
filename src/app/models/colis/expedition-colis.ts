import {Utilisateur} from '../utilisateur/utilisateur';

export class ExpeditionColis{
  id: number;
  dateExpedition: Date;
  description: string;
  utilisateur: Utilisateur;
}
