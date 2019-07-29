import {Utilisateur} from '../utilisateur/utilisateur';

export class LivraisonColis{
  id: number;
  dateLivraison: Date;
  description: string;
  utilisateur: Utilisateur;
}
