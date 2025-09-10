import {Component, ViewChild} from '@angular/core';
import {Client} from "../../models/models";
import {CLIENTS} from "../../models/data";
import {MatIconModule} from '@angular/material/icon';
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
import {AddClient} from "./add-client/add-client";

@Component({
  selector: 'app-clients',
  imports: [
    AddClient,
    FormsModule,
    MatButton,
    MatTableModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFabButton,
    MatIconModule,
    MatFormFieldModule,
    MatHeaderCell,
    MatHeaderRow,
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
  templateUrl: './clients.html',
  styleUrl: './clients.scss'
})
export class Clients {
  clients: Client[]=CLIENTS;
  displayedColumns: string[] = ['name', 'telephone','address','email','action'];
  dataSource = new MatTableDataSource<Client>(this.clients);
  deleteModal: boolean=false;
  selected: Client | null=null;
  addModal: boolean;
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

  deleteClient() {
    this.dataSource.data=this.clients.filter(e=>e!==this.selected);
    this.deleteModal=false;
  }
  onClientAdded(client: Client): void {
    console.log("client ajoute ",client);
    this.dataSource.data = [...this.dataSource.data, client];
    this.addModal=false;

  }
  showModal(selectedElmt:Client | null = null,deleteModal=false,addModal=false): void {
    this.selected=selectedElmt!=null?selectedElmt:null;
    this.addModal=addModal;
    this.deleteModal=deleteModal;
  }

  closeModal() {
    this.addModal=false;
    this.deleteModal=false;
    this.editModal=false;
  }

  edit(element: Client): void {
    this.editModal=true;
    this.selected=element;
  }

  editClient() {
    if (!this.selected) return;

    // Cherche l'index du produit à modifier
    const index = this.clients.findIndex(c => c.clientId === this.selected!.clientId);
    if (index !== -1) {
      // Mets à jour directement le produit dans le tableau
      this.clients[index] = this.selected!;

      // Met à jour la dataSource pour que la table reflète le changement
      this.dataSource.data = [...this.clients]; // On clone pour déclencher le changement
    }
    this.editModal=false;
  }
}
