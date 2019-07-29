import {TypeFacture} from '../type-facture/type-facture';
import {Mouvement} from '../mouvement/mouvement';
import {Tva} from '../tva/tva';

export class Facture extends Mouvement{
  numeroFacture: string;
  tva: Tva;
  exonere: boolean;
  montantFactureRegle: number;
  dateEcheance: string;
  typeFacture: TypeFacture;
}
