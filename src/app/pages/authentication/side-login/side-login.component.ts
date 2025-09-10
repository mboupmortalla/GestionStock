import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {USERS} from "../../../models/data";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  users=USERS;
  isLoggedIn: boolean = false;
  isValid: boolean = true;
  message: string;

  constructor(private router: Router) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    const currentUser=this.f;
    this.isLoggedIn = this.users.some((u) =>
      u.email === currentUser.uname.getRawValue() &&
      u.password === currentUser.password.getRawValue()
    );
    if (this.isLoggedIn) {
    localStorage.setItem("isLoggedIn",this.isValid.toString());
    this.router.navigate(['/home']);
    }
    else
    {
      this.isValid = false;
      this.message = 'Invalid User';

      setTimeout(() => {
        this.isValid = true;
        this.message = '';
      }, 30000);
    }
  }
}
