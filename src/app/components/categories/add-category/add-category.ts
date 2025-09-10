import {Component, EventEmitter, Output} from '@angular/core';
import {Category} from "../../../models/models";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-add-category',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.scss'
})
export class AddCategory {
  @Output() categoryAdded = new EventEmitter<Category>();
  constructor(private route:Router) {
  }

  newCategory: Category= {
    categoryId: "",
    name: "",
    description: ""
  }

  addCategory(): void {
    if (this.newCategory.name.trim()) {
      this.categoryAdded.emit({
        ...this.newCategory,
        categoryId: crypto.randomUUID() // générer un ID unique
      });

      // reset
      this.newCategory = {
        categoryId: "",
        name: "",
        description: ""
      };
    }
  }

  closeModal() {
    this.route.navigate(['/products']);
  }
}
