import {Mouvement} from '../mouvement/mouvement';
import {TypeReglement} from '../type-reglement/type-reglement';
import {Facture} from '../facture/facture';

export class Reglement extends Mouvement{
  montantRegle: number;
  typeReglement: TypeReglement;
  facture: Facture;
}
