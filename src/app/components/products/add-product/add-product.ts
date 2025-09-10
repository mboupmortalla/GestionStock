import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {Product} from "../../../models/models";
import {MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {Router} from "@angular/router";
import {routes} from "../../../app.routes";

@Component({
  selector: 'app-add-product',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss'
})
export class AddProduct {
  @Output() productAdded = new EventEmitter<Product>();
  constructor(private route:Router) {
  }

  newProduct: Product = {
    productId: '',
    name: '',
    code: '',
    description: '',
    categoryId: '',
    sellingPrice: 0,
    purchasePrice: 0,
    quantity: 0
  };

  addProduct(): void {
    if (this.newProduct.name.trim()) {
      this.productAdded.emit({
        ...this.newProduct,
        productId: crypto.randomUUID() // générer un ID unique
      });

      // reset
      this.newProduct = {
        productId: '',
        name: '',
        code: '',
        description: '',
        categoryId: '',
        sellingPrice: 0,
        purchasePrice: 0,
        quantity: 0
      };
    }
  }

  closeModal() {
    this.route.navigate(['/products']);
  }
}
