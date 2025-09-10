import {Component, ViewChild} from '@angular/core';
import {Category} from "../../models/models";
import {CATEGORIES} from "../../models/data";
import {AddCategory} from "./add-category/add-category"
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
import {MatIconModule} from '@angular/material/icon';
import {TablerIconComponent} from "angular-tabler-icons";

@Component({
  selector: 'app-categories',
  imports: [
    FormsModule,
    MatTableModule,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    AddCategory,
    MatFabButton,
    MatFormFieldModule,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconButton,
    MatInput,
    MatIconModule,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    NgIf,
    ReactiveFormsModule,
    TablerIconComponent
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {
  categories: Category[]=CATEGORIES;
  displayedColumns: string[] = ['name', 'description','action'];
  dataSource = new MatTableDataSource<Category>(this.categories);
  deleteModal: boolean=false;
  selected: Category | null=null;
  addModal: boolean;
  protected editModal: boolean;
  private list: Category[]=this.dataSource.data;
  constructor(breakpointObserver: BreakpointObserver,private route:Router) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe((result) => {
      this.displayedColumns = result.matches
        ? ['name', 'description','action']
        : ['name', 'description','action'];
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

  deleteCategory() {
    this.dataSource.data=this.categories.filter(e=>e!==this.selected);
    this.deleteModal=false;
    this.list=this.dataSource.data;

  }
  onCategoryAdded(categorie: Category): void {
    this.dataSource.data = [...this.dataSource.data, categorie];
    this.addModal=false;
    this.list=this.dataSource.data;


  }
  showModal(selectedElmt:Category | null = null,deleteModal=false,addModal=false): void {
    this.selected=selectedElmt!=null?selectedElmt:null;
    this.addModal=addModal;
    this.deleteModal=deleteModal;
  }

  closeModal() {
    this.addModal=false;
    this.deleteModal=false;
    this.editModal=false;
  }

  edit(element: Category): void {
    this.editModal=true;
    this.selected=element;
  }

  editCategory() {
    if (!this.selected) return;

    // Cherche l'index du produit à modifier
    const index = this.categories.findIndex(c => c.categoryId === this.selected!.categoryId);
    if (index !== -1) {
      // Mets à jour directement le produit dans le tableau
      this.categories[index] = this.selected!;

      // Met à jour la dataSource pour que la table reflète le changement
      this.dataSource.data = [...this.categories]; // On clone pour déclencher le changement
    }
    this.editModal=false;
  }
  search(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const search = input.value.trim().toLowerCase();

    if (search) {
      this.dataSource.data = this.list.filter(e =>
        e.name.toString().toLowerCase().includes(search) ||
        e.description.toString().toLowerCase().includes(search) 
      );
    } else {
      this.dataSource.data = this.list; // reset si vide
    }
  }
}
