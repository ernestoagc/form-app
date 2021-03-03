import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/services.index';
import{User} from '../../model/model.index'
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  user:User;
  ngOnInit(): void {
    this.user=this.authService.user;
  }

  cerrarSesion(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
