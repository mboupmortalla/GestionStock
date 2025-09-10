import {Component, ViewChild} from '@angular/core';
import {Product, Provider} from "../../models/models";
import {PROVIDERS} from "../../models/data";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatLabel} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {TablerIconComponent} from "angular-tabler-icons";
import {MatIconModule} from "@angular/material/icon";
import {AddProvider} from "./add-provider/add-provider";

@Component({
  selector: 'app-providers',
  imports: [
    FormsModule,
    MatButton,
    MatTableModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatIconModule,
    MatFabButton,
    MatFormFieldModule,
    MatHeaderCell,
    MatHeaderRow,
    AddProvider,
    MatHeaderRowDef,
    MatIconButton,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    NgIf,
    ReactiveFormsModule,
    TablerIconComponent
  ],
  templateUrl: './providers.html',
  styleUrl: './providers.scss'
})
export class Providers {
  providers: Provider[]=PROVIDERS;
  displayedColumns: string[] = ['name', 'telephone','address','email','action'];
  dataSource = new MatTableDataSource<Provider>(this.providers);
  deleteModal: boolean=false;
  selected: Provider | null=null;
  addModal: boolean;
  private list: Provider[]=this.dataSource.data;
  protected editModal: boolean;
  constructor(breakpointObserver: BreakpointObserver,private route:Router) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['name', 'telephone','address','email','action']
        : ['name', 'telephone','address','email','action'];
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

  deleteProvider() {
    this.dataSource.data=this.providers.filter(e=>e!==this.selected);
    this.deleteModal=false;
    this.list=this.dataSource.data;

  }
  onProviderAdded(provider: Provider): void {
    console.log("provider ajoute ",provider);
    this.dataSource.data = [...this.dataSource.data, provider];
    this.addModal=false;
    this.list=this.dataSource.data;

  }
  showModal(selectedElmt:Provider | null = null,deleteModal=false,addModal=false): void {
    this.selected=selectedElmt!=null?selectedElmt:null;
    this.addModal=addModal;
    this.deleteModal=deleteModal;
  }

  closeModal() {
    this.addModal=false;
    this.deleteModal=false;
    this.editModal=false;
  }

  edit(element: Provider): void {
    this.editModal=true;
    this.selected=element;
  }

  editProvider() {
    if (!this.selected) return;

    // Cherche l'index du produit à modifier
    const index = this.providers.findIndex(c => c.providerId === this.selected!.providerId);
    if (index !== -1) {
      // Mets à jour directement le produit dans le tableau
      this.providers[index] = this.selected!;

      // Met à jour la dataSource pour que la table reflète le changement
      this.dataSource.data = [...this.providers]; // On clone pour déclencher le changement
    }
    this.editModal=false;
  }
  search(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const search = input.value.trim().toLowerCase();

    if (search) {
      this.dataSource.data = this.list.filter(e =>
        e.name.toString().toLowerCase().includes(search) ||
        e.address.toString().toLowerCase().includes(search) ||
        e.telephone.toString().toLowerCase().includes(search) ||
        e.email.toString().toLowerCase().includes(search)
      );
    } else {
      this.dataSource.data = this.list; // reset si vide
    }
  }
}
