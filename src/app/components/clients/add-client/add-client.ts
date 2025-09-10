import {Component, EventEmitter, Output} from '@angular/core';
import {Client} from "../../../models/models";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-add-client',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-client.html',
  styleUrl: './add-client.scss'
})
export class AddClient {
  @Output() clientAdded = new EventEmitter<Client>();
  constructor(private route:Router) {
  }

  newClient: Client= {
    name: "",
    clientId: "",
    telephone: "",
    email: "",
    address: ""
  }

  addClient(): void {
    if (this.newClient.name.trim()) {
      this.clientAdded.emit({
        ...this.newClient,
        clientId: crypto.randomUUID() // générer un ID unique
      });

      // reset
      this.newClient = {
        name: "",
        clientId: "",
        telephone: "",
        email: "",
        address: ""
      };
    }
  }

  closeModal() {
    this.route.navigate(['/products']);
  }
}
