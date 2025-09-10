import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Accueil',
    iconName: 'solar:home-bold',
    route: '/home',
  },
  {
    navCap: 'Products',
  },
  {
    displayName: 'Produits',
    iconName: 'solar:list-linear',
    route: '/products',
  },
  {
    navCap: 'Providers',
  },
  {
    displayName: 'Fournisseurs',
    iconName: 'solar:user-linear',
    route: '/providers',
  },
  {
    navCap: 'Stocks',
  },
  {
    displayName: 'Stock',
    iconName: 'solar:box-line-duotone',
    route: '/stocks',
  },
  {
    navCap: 'Commands',
  },
  {
    displayName: 'Commandes',
    iconName: 'solar:command-line-duotone',
    route: '/commands',
  },
  {
    navCap: 'Categories',
  },
  {
    displayName: 'Categories',
    iconName: 'solar:text-selection-linear',
    route: '/categories',
  },

];
