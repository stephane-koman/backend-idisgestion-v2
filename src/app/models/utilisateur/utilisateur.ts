import {Role} from '../role/role';
import {Personne} from '../personne/personne';
import {Client} from '../client/client';

export class Utilisateur {
  id: number;
  username: string;
  password: string;
  createAt: Date;
  updateAt: Date;
  enable: number;
  personne: any;
  roles: Array<Role>;
}
