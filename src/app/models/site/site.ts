import {Pays} from '../pays/pays';
import {Devise} from '../devise/devise';
import {Tva} from '../tva/tva';

export class Site {
  id: number;
  nomSite: string;
  codeSite: string;
  contact: string;
  email: string;
  siret: string;
  adresse: string;
  description: string;
  createAt: Date;
  updateAt: Date;
  enable: number;
  tva: Tva;
  devise: Devise;
  pays: Pays
}
