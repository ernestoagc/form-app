import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import{User} from '../../model/model.index'
import { AppConstants} from '../../util/constant'
import swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint:string=AppConstants.authenticationPath;

  private _user:User;
  private _token:string;

  public get user(){
    if(this._user !=null){
      return this._user;
    }else if(this._user==null && sessionStorage.getItem('usuario')!=null){
      this._user=JSON.parse(sessionStorage.getItem('usuario')) as User;
      return this._user;
    }
    return new User();
  }

  public get token():string{
    if(this._token !=null){
      return this._token;
    }else if(this._token==null && sessionStorage.getItem('token')!=null){
      this._token=sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }


  constructor(private http:HttpClient,) { }

  login(usuario:User):Observable<any>{

    const credenciales = btoa('angularApp' + ':'+'12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':'Basic ' + credenciales  });


    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.code);
    params.set('password',usuario.password);
      console.log("params: "+params.toString());
    return this.http.post(this.urlEndPoint+'/oauth/token',params.toString(),{headers:httpHeaders});
  
  }


  
  guardarUsuario(accessToken:string){
    let payload = this.obtenerDatosToken(accessToken);
    this._user=new User(); 
    console.log(JSON.stringify(payload));
    this._user.code=payload.user_name;
    this._user.email=payload.email;
    this._user.roles=payload.authorities;

    console.log("usuario guardarSesion: " + JSON.stringify(this._user));
    sessionStorage.setItem('usuario',JSON.stringify(this._user));

  }

  guardarToken(accessToken:string){

    this._token=accessToken;
    console.log("tokenGuardarSesion: " + this._token);
    sessionStorage.setItem('token',accessToken);

  }

  obtenerDatosToken(accessToken:string):any{ 
    if(accessToken!=null){ 
      return   JSON.parse(atob(accessToken.split(".")[1]));
    } 
    return null;
    
  }

  estaAutenticado():boolean{

    
    let payload = this.obtenerDatosToken(this.token);
    
    if(payload !=null && payload.user_name!=null ){
      console.log("estaAutenticado+3");
      return true;
     
    }

    console.log("estaAutenticado+4");
    return false;

    
  }

  logout():void{
    this._token=null;
    this._token=null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');

  }



}
