import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import{ApplicationForm} from '../../model/model.index'
import { ActivatedRoute,Router } from '@angular/router';
import {Comun} from '../../util/comun';
import { timeout, catchError } from 'rxjs/operators';
import {ApplicationFormService, ModalService, ObjectTransferService} from "../../services/services.index"
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $:any;



@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  
  pageSearch=0;
  finalPage:number;
  showDropDown = false;

  totalForms:number=0;

  
 notEmptyPost = true;
 notscrolly = true;



  applicationForms:ApplicationForm[];
  searchTerm:string="";
  constructor(private applicationFormService:ApplicationFormService,
    private activatedRoute:ActivatedRoute, 
    private router:Router,
    private objectTransferService:ObjectTransferService,
    private spinner: NgxSpinnerService,
    private modalService:ModalService) {
     // this.initForm();
   }



  ngOnInit(): void {    
    this.activatedRoute.params.subscribe(params =>{    
      let codigoPagina = params['page'];

      if (!codigoPagina){
        this.pageSearch=0;
      }     
      
    });

    this.modalService.modalCerrado.subscribe(modal => {
      if(modal=="SOLICITUD"){
        this.cargarListado(0); 
      }
    });   

  }

  getFormResult(applicationForms:any){
    console.log("llega el emit");
     this.applicationForms=applicationForms.content;
     this.notEmptyPost=true;
     this.notscrolly=true;
     this.pageSearch=0;
this.searchTerm=applicationForms.keyword;
     this.finalPage= applicationForms.totalPages;
     this.totalForms=applicationForms.totalElements;
  }

  estiloEstado(estadoSolicitud:string):string{
   return Comun.estiloEstado(estadoSolicitud);
  }

  cargarListado(pagina: number){
    if (!pagina){
      pagina=0;
    }

    console.log("pagina: " + pagina.toString());   

    this.applicationFormService.search(pagina,this.searchTerm,"").subscribe(
      response =>{
        this.applicationForms=response.content;
        this.totalForms=response.totalElements;
      }
    );
  }

  abrirModal(id:number){
    if (!id){
      id=0;
    }     
    this.modalService.abrirModalSolicitud(id); 

  }
   


  onScroll():void{


    try {

      
    if (this.notscrolly && this.notEmptyPost) {
     
      this.spinner.show();
      this.notscrolly = false;
      this.loadNextPost();
     }

    }catch(e){
      console.log("error deslizar");
      this.spinner.hide();
    }

  }


  loadNextPost():void{
     
    console.log("scroolbar");    
    console.log("finalPage:  " + this.finalPage);
    console.log("pageSearch:   " + this.pageSearch);

    if(this.pageSearch<this.finalPage){
      this.pageSearch=this.pageSearch+1;
    }   
    this.applicationFormService.search(this.pageSearch,this.searchTerm,"").subscribe(
      (respuestaSolicitudes) =>{     
      timeout(3000);     
      const nuevasSolicitudes = respuestaSolicitudes.content;
      this.spinner.hide();
      
        if (nuevasSolicitudes.length === 0 ) {
          this.notEmptyPost =  false;
        }

        this.applicationForms = this.applicationForms.concat(nuevasSolicitudes);
        this.notscrolly = true;
    },    
    error=>{
      this.spinner.hide();
    },
    ()=>{}
    );

  }
 

}
