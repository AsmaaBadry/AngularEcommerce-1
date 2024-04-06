import { Component, OnInit } from '@angular/core';
import { Store } from '../../models/store';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  store: Store = new Store("Store", ["branch1", "branch2"], "assets/store-logo.jpg");
  isLogged!:boolean
  constructor(private _authentication: AuthenticationService) {}
  ngOnInit(): void {
    //this.isLogged=this._authentication.isLoggedIn()
    this._authentication.getAuthSubject().subscribe({
      next:(authStatus)=>{
        this.isLogged=authStatus;
      }
    })
  }
}
