import {Utilisateur} from '../utilisateur/utilisateur';

export class EnregistrementColis{
  id: number;
  dateEnregistrement: Date;
  description: string;
  utilisateur: Utilisateur;
}
