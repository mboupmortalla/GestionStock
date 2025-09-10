import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Product} from "../../models/models";
import {BreakpointObserver} from '@angular/cdk/layout';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {PRODUCTS} from "../../models/data";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TablerIconsModule} from 'angular-tabler-icons';
import {AddProduct} from "./add-product/add-product";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatLabel} from "@angular/material/input";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  imports: [
    MatCardModule,
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TablerIconsModule,
    MatPaginatorModule,
    MatDividerModule,
    AddProduct,
    FormsModule,
    MatFormFieldModule,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {
  products: Product[]=PRODUCTS;
  displayedColumns: string[] = ['name', 'description', 'quantity', 'purchasePrice','action'];
  dataSource = new MatTableDataSource<Product>(this.products);
  deleteModal: boolean=false;
  selected: Product | null;
  addModal: boolean;
  protected editModal: boolean;
  private list: Product[]=this.dataSource.data;
  constructor(breakpointObserver: BreakpointObserver,private route:Router) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['name', 'description', 'quantity', 'purchasePrice','action']
        : ['name', 'description', 'quantity', 'purchasePrice','action'];
    });
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deleteProduct() {
  this.dataSource.data=this.products.filter(e=>e!==this.selected);
  this.deleteModal=false;
    this.list=this.dataSource.data;

  }
  onProductAdded(product: Product): void {
    console.log("produit ajoute ",product);
    this.dataSource.data = [...this.dataSource.data, product];
    this.addModal=false;
    this.list=this.dataSource.data;


  }
  showModal(selectedElmt:Product | null = null,deleteModal=false,addModal=false): void {
    this.selected=selectedElmt!=null?selectedElmt:null;
    this.addModal=addModal;
    this.deleteModal=deleteModal;
  }

  closeModal() {
    this.addModal=false;
    this.deleteModal=false;
    this.editModal=false;
  }

  edit(element: Product): void {
    this.editModal=true;
    this.selected=element;
  }

  editProduct() {
    if (!this.selected) return;

    // Cherche l'index du produit à modifier
    const index = this.products.findIndex(p => p.productId === this.selected!.productId);
    if (index !== -1) {
      // Mets à jour directement le produit dans le tableau
      this.products[index] = this.selected!;

      // Met à jour la dataSource pour que la table reflète le changement
      this.dataSource.data = [...this.products]; // On clone pour déclencher le changement
    }
    this.editModal=false;
  }
  search(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const search = input.value.trim().toLowerCase();

    if (search) {
      this.dataSource.data = this.list.filter(e =>
        e.name.toString().toLowerCase().includes(search) ||
        e.quantity.toString().toLowerCase().includes(search) ||
        e.purchasePrice.toString().toLowerCase().includes(search) ||
        e.description.toString().toLowerCase().includes(search)

      );
    } else {
      this.dataSource.data = this.list; // reset si vide
    }
  }

}
