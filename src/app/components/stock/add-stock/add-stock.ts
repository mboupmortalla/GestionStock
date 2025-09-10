import {Component, EventEmitter, Output} from '@angular/core';
import {Product, Provider, Stock, StockType} from "../../../models/models";
import {Router} from "@angular/router";
import {PRODUCTS, PROVIDERS} from "../../../models/data";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-add-stock',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './add-stock.html',
  styleUrl: './add-stock.scss'
})
export class AddStock {
  @Output() stockAdded = new EventEmitter<Stock>();
  @Output() closed = new EventEmitter<void>();
  selectedProduct: string;
  type :StockType[] = [StockType.IN,StockType.OUT];
  selectedType:StockType;
  selectedProvider:string;
  products=PRODUCTS;
  providers=PROVIDERS;
  constructor(private route:Router) {
  }

  newStock : {
    date: Date;
    productId: string;
    providerId: string;
    quantity: number;
    stockId: string;
    type: StockType.IN
  } = {
    productId: "",
    stockId: "",
    type:StockType.IN,        //{"IN","OUT"}
    providerId: "",
    quantity: 0,
    date: new Date()
  }

  addStock(): void {
    if (this.selectedProduct) {
      this.stockAdded.emit({
        ...this.newStock,
        productId: this.selectedProduct,
        type: this.selectedType,
        providerId: this.selectedProvider,
        stockId: crypto.randomUUID(),
        clientId: '',
        UserId: ''
      });

      this.newStock = {
        productId: "",
        stockId: "",
        type:StockType.IN,        //{"IN","OUT"}
        providerId: "",
        quantity: 0,
        date: new Date(),

      };
    }
  }

  closeModal() {
    this.closed.emit();
  }

}
