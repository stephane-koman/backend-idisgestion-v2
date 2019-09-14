import {Personne} from '../personne/personne';
import {DomaineActivite} from '../domaine-activite/domaine-activite';

export class Client extends Personne{
  codeClient: string;
  responsable: string;
  domaineActivite: DomaineActivite;
}
