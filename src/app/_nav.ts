interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
  roles?: Array<string>;
}

export const navItems: NavData[] = [
  {
    name: 'Tableau de bord',
    url: '/dashboard',
    icon: 'icon-speedometer',
    roles: ["ADMIN", "USER", "CLIENT"]
  },
  {
    title: true,
    name: 'MENU',
    roles: ["ADMIN", "USER", "CLIENT"]
  },
  {
    name: 'Clients',
    url: '/client',
    icon: 'icon-people',
    roles: ["ADMIN", "USER"]
  },
  {
    name: 'Employes',
    url: '/employe',
    icon: 'icon-people',
    roles: ["ADMIN", "USER"]
  },
  {
    name: 'Colis',
    url: '/colis-client',
    icon: 'icon-bag',
    roles: ["CLIENT"]
  },
  {
    name: 'Colis',
    url: '/colis',
    icon: 'icon-bag',
    roles: ["ADMIN", "USER"],
    children: [
      {
        name: 'Envoyés',
        url: '/colis/send',
        icon: 'icon-action-redo'
      },
      {
        name: 'Réçus',
        url: '/colis/receive',
        icon: 'icon-action-undo'
      }
    ]
  },
  {
    name: 'Finances',
    url: '/finances',
    icon: 'icon-diamond',
    roles: ["ADMIN", "USER"],
    children: [
      {
        name: 'Factures',
        url: '/finances/facture',
        icon: 'icon-calculator',
        roles: ["ADMIN", "USER"],
      },
      {
        name: 'Règlements',
        url: '/finances/reglement',
        icon: 'icon-calculator',
        roles: ["ADMIN", "USER"],
      }
    ]
  },
  {
    name: 'Paramètres',
    url: '/parametres',
    icon: 'icon-settings',
    roles: ["ADMIN"],
    children: [
      {
        name: 'Rôles',
        url: '/parametres/role',
        icon: 'icon-user-following'
      },
      {
        name: 'Utilisateurs',
        url: '/parametres/utilisateur',
        icon: 'icon-people'
      },
      {
        name: 'Fonctions',
        url: '/parametres/fonction',
        icon: 'icon-wrench'
      },
      {
        name: 'Sites',
        url: '/parametres/site',
        icon: 'icon-grid'
      },
      {
        name: 'Pays',
        url: '/parametres/pays',
        icon: 'icon-globe'
      },
      {
        name: 'Types Factures',
        url: '/parametres/type-facture',
        icon: 'icon-diamond'
      },
      {
        name: 'Types Règlements',
        url: '/parametres/type-reglement',
        icon: 'icon-diamond'
      },
      {
        name: 'Devises',
        url: '/parametres/devise',
        icon: 'icon-diamond'
      },
      {
        name: 'Tva',
        url: '/parametres/tva',
        icon: 'icon-diamond'
      }
    ]
  }
];
