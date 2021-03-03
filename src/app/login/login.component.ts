import { Component, OnInit } from '@angular/core';
import{User} from '../model/model.index';
import {AuthService} from '../services/services.index'
import { ActivatedRoute,Router } from '@angular/router';
import swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user:User;

  constructor(private authService:AuthService,private router:Router) { 
this.user=new User();

  }

  ngOnInit(): void {
    if(this.authService.estaAutenticado()){
      
      this.router.navigate(['/forms']);

      swal.fire({
        icon: 'success',
        title: 'Login',
        text: `${this.authService.user.code}. user is already authenticated`
      });
     
    }
  }


  login():void{
    console.log(this.user);
    

    this.authService.login(this.user).subscribe(response=>{
      console.log("response: " + JSON.stringify(response));
     
      
      this.authService.guardarUsuario(response.access_token);
      console.log("guardo Usuario");
      this.authService.guardarToken(response.access_token);
      console.log("guardo Token");
      let user = this.authService.user;
      console.log("usuario autorizado: " + user.code);
      this.router.navigate(['/forms']);
     
    },e=>{
      console.log("error: "+ JSON.stringify(e));
      if(e.status==400){

        swal.fire({
          icon: 'error',
          title: 'Error Login',
          text: 'Credentials are incorrects'
        });

      }else if(e.status==401){

        swal.fire({
          icon: 'error',
          title: 'Error Login',
          text: 'User does not exist in the system'
        });

      }

    }
    
    
    );;
    
  }

}
