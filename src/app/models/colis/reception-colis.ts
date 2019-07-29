import {Utilisateur} from '../utilisateur/utilisateur';

export class ReceptionColis{
  id: number;
  dateReception: Date;
  description: string;
  utilisateur: Utilisateur;
}
