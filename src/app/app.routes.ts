import { Routes, RouterModule } from '@angular/router';


import { FormsComponent } from './pages/forms/forms.component';
import { FormComponent } from './pages/form/form.component';
import { PagesComponent } from './pages/pages.component';
import {LoginComponent} from './login/login.component';

import {AutorizacionGuard} from './guard/autorizacion.guard';


const appRoutes: Routes = [    
    { path: 'login', component: LoginComponent },
    {path:'',component:PagesComponent, canActivate:[AutorizacionGuard] ,
        children:[
            { path: 'form', component: FormComponent },
            { path: 'forms', component: FormsComponent},
            { path: 'forms/page/:page', component: FormsComponent },
            { path: 'forms/:id', component: FormComponent, },
            { path: '', redirectTo:'/forms',pathMatch:'full'},
        ]
    },
   
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes,{useHash:false, scrollPositionRestoration:'enabled'})
