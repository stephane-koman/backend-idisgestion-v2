import {Client} from './client';

export class ListeClients {
  clients: Array<Client>;
  page: number;
  nombreClients: number;
  totalClients: number;
  totalPages: number;
}
