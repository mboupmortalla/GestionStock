// mock-data.ts

import {
  Category,
  Client,
  Command,
  CommandStatus,
  CommandType,
  Product,
  Provider,
  Stock,
  StockType,
  User,
  UserRole
} from './models';

// Catégories
export const CATEGORIES: Category[] = [
  { categoryId: 'C1', name: 'Alimentation', description: 'Produits alimentaires et boissons locales' },
  { categoryId: 'C2', name: 'Électronique', description: 'Matériel et appareils électroniques' },
  { categoryId: 'C3', name: 'Vêtements', description: 'Habillement et accessoires' },
  { categoryId: 'C4', name: 'Construction', description: 'Matériaux de construction' },
  { categoryId: 'C5', name: 'Cosmétiques', description: 'Produits de beauté et soins corporels' }
];

// Produits
export const PRODUCTS: Product[] = [
  { productId: 'P1', name: 'Riz parfumé 50kg', code: 'AL001', description: 'Riz parfumé importé', categoryId: 'C1', sellingPrice: 35000, purchasePrice: 28000, quantity: 200 },
  { productId: 'P2', name: 'Huile 20L', code: 'AL002', description: 'Huile végétale bidon 20L', categoryId: 'C1', sellingPrice: 25000, purchasePrice: 21000, quantity: 120 },
  { productId: 'P3', name: 'Smartphone Itel A58', code: 'EL001', description: 'Téléphone entrée de gamme', categoryId: 'C2', sellingPrice: 75000, purchasePrice: 60000, quantity: 80 },
  { productId: 'P4', name: 'Téléviseur Samsung 32"', code: 'EL002', description: 'TV LED Samsung 32 pouces', categoryId: 'C2', sellingPrice: 145000, purchasePrice: 120000, quantity: 40 },
  { productId: 'P5', name: 'Boubou bazin', code: 'VT001', description: 'Tenue traditionnelle en bazin', categoryId: 'C3', sellingPrice: 25000, purchasePrice: 15000, quantity: 60 },
  { productId: 'P6', name: 'Sac de ciment 50kg', code: 'CN001', description: 'Ciment Dangote 50kg', categoryId: 'C4', sellingPrice: 4500, purchasePrice: 4000, quantity: 500 },
  { productId: 'P7', name: 'Fer à béton 8mm', code: 'CN002', description: 'Fer à béton standard 8mm', categoryId: 'C4', sellingPrice: 6000, purchasePrice: 5000, quantity: 300 },
  { productId: 'P8', name: 'Savon Diambar', code: 'CS001', description: 'Savon de ménage traditionnel', categoryId: 'C5', sellingPrice: 500, purchasePrice: 350, quantity: 1000 },
  { productId: 'P9', name: 'Crème éclaircissante Carotène', code: 'CS002', description: 'Crème cosmétique', categoryId: 'C5', sellingPrice: 2000, purchasePrice: 1500, quantity: 200 },
  { productId: 'P10', name: 'Tissu wax 6 yards', code: 'VT002', description: 'Tissu africain wax', categoryId: 'C3', sellingPrice: 12000, purchasePrice: 8000, quantity: 150 }
];

// Fournisseurs
export const PROVIDERS: Provider[] = [
  { providerId: 'PR1', name: 'Sénégal Distribution', telephone: '+221338210001', email: 'contact@sendist.sn', address: 'Dakar' },
  { providerId: 'PR2', name: 'Ndar Commerce', telephone: '+221339210002', email: 'info@ndarcommerce.sn', address: 'Saint-Louis' },
  { providerId: 'PR3', name: 'Kaolack Import', telephone: '+221339410003', email: 'contact@kaoimport.sn', address: 'Kaolack' },
  { providerId: 'PR4', name: 'Thiès Matériaux', telephone: '+221339510004', email: 'ventes@thiesmat.sn', address: 'Thiès' },
  { providerId: 'PR5', name: 'Touba Textiles', telephone: '+221339610005', email: 'touba@textiles.sn', address: 'Touba' }
];

// Clients
export const CLIENTS: Client[] = [
  { clientId: 'CL1', name: 'Awa Diop', telephone: '+221770111111', email: 'awadiop@gmail.com', address: 'Dakar' },
  { clientId: 'CL2', name: 'Entreprise BTP SA', telephone: '+221770222222', email: 'contact@btpsa.sn', address: 'Thiès' },
  { clientId: 'CL3', name: 'Moussa Sow', telephone: '+221770333333', email: 'msow@hotmail.com', address: 'Saint-Louis' },
  { clientId: 'CL4', name: 'Fatou Ndiaye', telephone: '+221770444444', email: 'fatou.ndiaye@yahoo.fr', address: 'Kaolack' },
  { clientId: 'CL5', name: 'Boutique Serigne Fallou', telephone: '+221770555555', email: 'boutique.sf@gmail.com', address: 'Touba' }
];

// Utilisateurs
export const USERS: User[] = [
  { userId: 'U1', name: 'Admin Système', email: 'admin@stockapp.sn', password: 'admin123', role: UserRole.ADMIN },
  { userId: 'U2', name: 'Alioune Ba', email: 'alioune@provider.sn', password: 'provider123', role: UserRole.PROVIDER },
  { userId: 'U3', name: 'Khady Ndiaye', email: 'khady@stockapp.sn', password: 'user123', role: UserRole.USER }
];

// Stocks
// @ts-ignore
// @ts-ignore
export const STOCKS: Stock[] = [
  { stockId: 'S1', productId: 'P1', clientId: 'CL1', type: StockType.IN, providerId: 'PR1', quantity: 2, date: new Date('2025-08-01'), UserId: 'U1' },
  { stockId: 'S2', productId: 'P3', clientId: 'CL2', type: StockType.OUT, providerId: 'PR2', quantity: 30, date: new Date('2025-08-03'), UserId: 'U2' },
  { stockId: 'S3', productId: 'P6', clientId: 'CL3', type: StockType.OUT, providerId: 'PR4', quantity: 50, date: new Date('2025-08-05'), UserId: 'U1' },
  { stockId: 'S4', productId: 'P8', clientId: 'CL4', type: StockType.IN, providerId: 'PR5', quantity: 100, date: new Date('2025-08-07'), UserId: 'U3' }
];

// Commandes
export const COMMANDS: Command[] = [
  { commandId: 'CMD1', type: CommandType.PURCHASE, date: new Date('2025-08-10'), status: CommandStatus.VALIDATED, products: [PRODUCTS[0], PRODUCTS[1]], providerId: 'PR1', clientId: 'CL1' },
  { commandId: 'CMD2', type: CommandType.SELLING, date: new Date('2025-08-12'), status: CommandStatus.PENDING, products: [PRODUCTS[3]], providerId: 'PR2', clientId: 'CL2' },
  { commandId: 'CMD3', type: CommandType.SELLING, date: new Date('2025-08-15'), status: CommandStatus.DELIVERED, products: [PRODUCTS[5], PRODUCTS[6]], providerId: 'PR4', clientId: 'CL3' }
];
