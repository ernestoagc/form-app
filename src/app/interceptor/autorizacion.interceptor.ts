import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { AuthService } from '../services/services.index';
import { finalize, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Injectable()
export class AutorizacionInterceptor implements HttpInterceptor {

    

  constructor(private authService: AuthService,private router:Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
   Observable<HttpEvent<any>> {
    console.log("AutorizacionInterceptor");  

	return next.handle(req).pipe(

        catchError(e=>{


            if(e.status ==401 || e.status ==403){
                if(this.authService.estaAutenticado()){
                    this.authService.logout();
                }
                this.router.navigate(['/login']);

            }else if(e.status ==500 || e.status ==504  ){
                let detalleError = e.error.mensaje?e.error.mensaje : e.error.message;

                swal.fire({
                    icon: 'error',
                    title: 'It was a system problem',
                    text: 'Please contact the administrator',
                    footer: detalleError
                  });
            } else if(e.status ==404 ){
                let detalleError = e.error.mensaje?e.error.mensaje : e.error.message;

                swal.fire({
                    icon: 'info',
                    title: 'It was a problem.',
                    text: detalleError
                  });
            }if(e.status ==400 ){
                let detalleError = e.error.mensaje?e.error.mensaje : e.error.message;

                swal.fire({
                    icon: 'error',
                    title: 'It was a problem.',
                    text: detalleError
                  });
            }
            
            

            return throwError(e);
            
        })
    );
	
  }

}