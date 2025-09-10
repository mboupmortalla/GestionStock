import {Component, ViewChild} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatTableDataSource,
  MatTableModule
} from "@angular/material/table";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {AddCategory} from "../categories/add-category/add-category";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginator} from "@angular/material/paginator";
import {DatePipe, NgIf} from "@angular/common";
import {TablerIconComponent} from "angular-tabler-icons";
import {Stock} from "../../models/models";
import {COMMANDS, PRODUCTS, PROVIDERS, STOCKS} from "../../models/data";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {AddStock} from "./add-stock/add-stock";

@Component({
  selector: 'app-stock',
  imports: [
    FormsModule,
    MatTableModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFabButton,
    MatFormFieldModule,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconButton,
    MatIconModule,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    NgIf,
    ReactiveFormsModule,
    TablerIconComponent,
    DatePipe,
    AddStock
  ],
  templateUrl: './stock.html',
  styleUrl: './stock.scss'
})
export class stock {
  stocks: Stock[]=STOCKS;
  products=PRODUCTS;
  provider=PROVIDERS;
  displayedColumns: string[] = ['produit', 'type','quantity','provider','date','action'];
  dataSource = new MatTableDataSource<Stock>(this.stocks);
  deleteModal: boolean=false;
  selected: Stock | null=null;
  addModal: boolean;
  protected editModal: boolean;
  private list: Stock[]=this.dataSource.data;
  constructor(breakpointObserver: BreakpointObserver,private route:Router) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['produit', 'type','quantity','provider','date','action']
        : ['produit', 'type','quantity','provider','date','action'];
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

  deleteStock() {
    this.dataSource.data=this.stocks.filter(e=>e!==this.selected);
    this.deleteModal=false;
    this.list=this.dataSource.data;

  }
  onStockAdded(stock: Stock): void {
    console.log("categorie ajoute ",stock);
    this.dataSource.data = [...this.dataSource.data, stock];
    this.addModal=false;
    this.list=this.dataSource.data;


  }
  showModal(selectedElmt:Stock | null = null,deleteModal=false,addModal=false): void {
    this.selected=selectedElmt!=null?selectedElmt:null;
    this.addModal=addModal;
    this.deleteModal=deleteModal;
  }

  closeModal() {
    this.addModal=false;
    this.deleteModal=false;
    this.editModal=false;
  }

  edit(element: Stock): void {
    this.editModal=true;
    this.selected=element;
  }

  getProductName(id:string): string {
    return this.products.filter((m)=> m.productId==id)[0].name;
  }

  getProviderName(id:string): string {
    return this.provider.filter((m)=> m.providerId==id)[0].name;
  }

  editStock() {
    if (!this.selected) return;

    // Cherche l'index du produit à modifier
    const index = this.stocks.findIndex(c => c.stockId === this.selected!.stockId);
    if (index !== -1) {
      // Mets à jour directement le produit dans le tableau
      this.stocks[index] = this.selected!;

      // Met à jour la dataSource pour que la table reflète le changement
      this.dataSource.data = [...this.stocks]; // On clone pour déclencher le changement
    }
    this.editModal=false;
  }
  search(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const search = input.value.trim().toLowerCase();

    if (search) {
      this.dataSource.data = this.list.filter(e =>
        e.type.toString().toLowerCase().includes(search) ||
        e.quantity.toString().toLowerCase().includes(search) ||
        this.getProductName(e.productId).toString().toLowerCase().includes(search) ||
        this.getProviderName(e.providerId).toString().toLowerCase().includes(search)
      );
    } else {
      this.dataSource.data = this.list; // reset si vide
    }
  }
}
