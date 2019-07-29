import {Role} from '../role/role';
import {Personne} from '../personne/personne';

export class RegisterForm {
  id: number;
  username: string;
  password: string;
  repassword: string;
  createAt: Date;
  updateAt: Date;
  enable: number;
  personne: Personne;
  roles: Array<Role>;
}
