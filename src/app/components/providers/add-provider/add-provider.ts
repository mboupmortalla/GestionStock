import {Component, EventEmitter, Output} from '@angular/core';
import {Provider} from "../../../models/models";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule } from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";


@Component({
  selector: 'app-add-provider',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './add-provider.html',
  styleUrl: './add-provider.scss'
})
export class AddProvider {
  @Output() providerAdded = new EventEmitter<Provider>();
  constructor(private route:Router) {
  }

  newProvider: Provider= {
  name: "",
  providerId: "",
  telephone: "",
  email: "",
  address: ""
}

  addProvider(): void {
    if (this.newProvider.name.trim()) {
      this.providerAdded.emit({
        ...this.newProvider,
        providerId: crypto.randomUUID() // générer un ID unique
      });

      // reset
      this.newProvider = {
        name: "",
        providerId: "",
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
