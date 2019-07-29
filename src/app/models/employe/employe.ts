import {Personne} from '../personne/personne';
import {Site} from '../site/site';
import {Fonction} from '../fonction/fonction';

export class Employe extends Personne{
  matricule: string;
  fonction: Fonction;
  site: Site;
}
