
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import {map, catchError} from 'rxjs/operators'
import { AppConstants} from '../../util/constant'
import { of, Observable, throwError } from 'rxjs';
import{ApplicationForm} from '../../model/model.index'
import { ActivatedRoute,Router } from '@angular/router';
import {AuthService} from '../services.index'

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationFormService {

  private urlEndPoint:string=AppConstants.serviceFormPath;
  private httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});
 
  constructor(private http:HttpClient,
    private router:Router, private authService:AuthService) { }



  fetch():Observable<any>{
   return this.http.get(this.urlEndPoint+'findall').pipe( 
     
    map (function(response:any) {    
        console.log("respuesta: =>");
        console.log(response);            
      return   response;
      })
  );
  }

  search(page:number,puesto:string,estado:string):Observable<any>{
    console.log("puesto:"+puesto);
    console.log("estado:"+estado);
    console.log("page:"+page);
    return this.http.get(this.urlEndPoint + `page/ ${page}?position=${puesto}`).pipe( 
       map (function(response:any) {    
         console.log("respuesta: =>");
         console.log(response);            
       return   response;
       }),
       catchError(e =>{
        return throwError(e);
       }) 
   );
   }
 
  get(id:number):Observable<ApplicationForm>{
    return this.http.get(this.urlEndPoint +id).pipe( 
       map (function(response:ApplicationForm) {    
         console.log("respuesta: =>");
         console.log(response);            
       return   response;
       })
   );
   
   
   } 

  create(ApplicationForm:ApplicationForm):Observable<ApplicationForm>{
    return this.http.post<ApplicationForm>(this.urlEndPoint,ApplicationForm,{headers:this.httpHeaders});
  }
}
