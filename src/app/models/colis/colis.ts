import {EnregistrementColis} from './enregistrement-colis';
import {ExpeditionColis} from './expedition-colis';
import {ArriveeColis} from './arrivee-colis';
import {ReceptionColis} from './reception-colis';
import {LivraisonColis} from './livraison-colis';
import {Site} from '../site/site';
import {Utilisateur} from '../utilisateur/utilisateur';
import {Client} from '../client/client';
import {DetailsColis} from './details-colis';
import {Devise} from '../devise/devise';
import {Image} from '../image/image';

export class Colis{
  id: number;
  reference: string;
  codeLivraison: string;
  qrCode: string;
  valeurColis: number;
  description: string;
  nomDestinataire: string;
  contactDestinataire: string;
  adresseDestinataire: string;
  createAt: Date;
  updateAt: Date;
  enable: number;
  enregistrementColis: EnregistrementColis;
  expeditionColis: ExpeditionColis;
  arriveeColis: ArriveeColis;
  receptionColis: ReceptionColis;
  livraisonColis: LivraisonColis;
  siteExpediteur: Site;
  siteDestinataire: Site;
  utilisateur: Utilisateur;
  client: Client;
  devise: Devise;
  detailsColis: Array<DetailsColis>;
  images: Array<Image>;
}
