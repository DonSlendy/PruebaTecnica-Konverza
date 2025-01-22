import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../Services/login.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private loginService:LoginService){}

  cerrarSesion() {
    this.loginService.logout();
  }

}
