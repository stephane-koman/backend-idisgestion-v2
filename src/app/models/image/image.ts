import {Pays} from '../pays/pays';
import {Devise} from '../devise/devise';
import {Tva} from '../tva/tva';

export class Image {
  id: number;
  nomImage: string;
  file: Blob;
  createAt: Date;
  updateAt: Date;
  enable: number;
}
