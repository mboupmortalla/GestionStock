import {Component, ViewChild} from '@angular/core';
import {Command} from '../../models/models';
import {CLIENTS, COMMANDS} from "../../models/data";
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
import {DatePipe, NgIf} from "@angular/common";
import {TablerIconComponent} from "angular-tabler-icons";
import {MatIconModule} from "@angular/material/icon";
import {AddCommand} from "./add-command/add-command";

@Component({
  selector: 'app-command',
  imports: [
    FormsModule,
    MatTableModule,
    MatButton,
    MatCell,
    AddCommand,
    MatCellDef,
    MatColumnDef,
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
    DatePipe,
    MatFabButton,
    TablerIconComponent
  ],
  templateUrl: './command.html',
  styleUrl: './command.scss'
})
export class command {
  commands: Command[]=COMMANDS;
  displayedColumns: string[] = ['name', 'status','type','date','Produits','Clients','action'];
  dataSource = new MatTableDataSource<Command>(this.commands);
  deleteModal: boolean=false;
  selected: Command | null=null;
  addModal: boolean;
  protected editModal: boolean;
  private list: Command[]=this.dataSource.data;
  constructor(breakpointObserver: BreakpointObserver,private route:Router) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['name', 'status','type','date','Produits','Clients','action']
        : ['name', 'status','type','date','Produits','Clients','action'];
    });
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  searchText: any;
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  deleteCommand() {
    this.dataSource.data=this.commands.filter(e=>e!==this.selected);
    this.list=this.dataSource.data;
    this.deleteModal=false;
  }
  onCommandAdded(command: Command): void {
    console.log("command ajoute ",command);
    this.dataSource.data = [...this.dataSource.data, command];
    this.addModal=false;
    this.list=this.dataSource.data;


  }
  showModal(selectedElmt:Command | null = null,deleteModal=false,addModal=false): void {
    this.selected=selectedElmt!=null?selectedElmt:null;
    this.addModal=addModal;
    this.deleteModal=deleteModal;
  }

  closeModal() {
    this.addModal=false;
    this.deleteModal=false;
    this.editModal=false;
  }

  edit(element: Command): void {
    this.editModal=true;
    this.selected=element;
  }
  getClientName(id:string): string {
    return CLIENTS.filter((m)=> m.clientId==id)[0].name;
  }
  editCommand() {
    if (!this.selected) return;

    // Cherche l'index du produit à modifier
    const index = this.commands.findIndex(c => c.commandId === this.selected!.commandId);
    if (index !== -1) {
      // Mets à jour directement le produit dans le tableau
      this.commands[index] = this.selected!;

      // Met à jour la dataSource pour que la table reflète le changement
      this.dataSource.data = [...this.commands]; // On clone pour déclencher le changement
    }
    this.editModal=false;
  }

  search(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const search = input.value.trim().toLowerCase();

    if (search) {
      this.dataSource.data = this.list.filter(e =>
        e.type.toString().toLowerCase().includes(search) ||
        e.status.toString().toLowerCase().includes(search) ||
        this.getClientName(e.clientId).toString().toLowerCase().includes(search) ||
        e.products?.some(e=>e.name.includes(search))
      );
    } else {
      this.dataSource.data = this.list; // reset si vide
    }
  }
}
