import {Component, EventEmitter, Output} from '@angular/core';
import {Command, CommandStatus, CommandType, Product} from "../../../models/models";
import {CLIENTS, PRODUCTS, PROVIDERS} from "../../../models/data";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-add-command',
  imports: [
    FormsModule,
    MatButton,
    MatFormFieldModule,
    MatInput,
    MatLabel,
    MatSelectModule,
  ],
  templateUrl: './add-command.html',
  styleUrl: './add-command.scss'
})
export class AddCommand {
  @Output() commandAdded = new EventEmitter<Command>();
  @Output() closed = new EventEmitter<void>();
  selectedProduct: Product;
  type :CommandType[] = [CommandType.PURCHASE,CommandType.SELLING];
  status : CommandStatus[]=[CommandStatus.DELIVERED,CommandStatus.PENDING,CommandStatus.VALIDATED,CommandStatus.CANCELLED];
  selectedType:CommandType;
  selectedStatus:CommandStatus;
  selectedProvider:string;
  selectedClient:string;
  products=PRODUCTS;
  providers=PROVIDERS;
  clients=CLIENTS;
  constructor(private route:Router) {
  }

  newCommand: Command  = {
    commandId: "",
    type: CommandType.PURCHASE,      //{"PURCHASE","SELLING"}
    date: new Date(),
    status: CommandStatus.PENDING,     //{"PENDING", "VALIDATED", "DELIVERED", "CANCELLED"}
    products: null,
    providerId: "",
    clientId: "",
  }

  addCommand(): void {
    if (this.selectedProduct) {
      this.commandAdded.emit({
        ...this.newCommand,
        products: [this.selectedProduct],
        type: this.selectedType,
        status: this.selectedStatus,
        providerId: this.selectedProvider,
        commandId: crypto.randomUUID(),
        clientId: this.selectedClient,
      });

      this.newCommand  = {
        commandId: "",
        type: CommandType.PURCHASE,      //{"PURCHASE","SELLING"}
        date: new Date(),
        status: CommandStatus.PENDING,     //{"PENDING", "VALIDATED", "DELIVERED", "CANCELLED"}
        products: null,
        providerId: "",
        clientId: "",
      };
    }
  }

  closeModal() {
    this.closed.emit();
  }

}
