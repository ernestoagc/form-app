import { Component, OnInit, Output, EventEmitter,ElementRef,ViewChild } from '@angular/core';
import { ApplicationForm, Valor } from 'src/app/model/model.index';
import { ActivatedRoute,Router } from '@angular/router';
import {Comun} from '../../util/comun';
import {ApplicationFormService,ModalService} from "../../services/services.index"
import swal from 'sweetalert2'

declare var $:any;
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  applicationForm:ApplicationForm;
  operacionExitosa:boolean;

  @Output() guardoCambio: EventEmitter <boolean> = new EventEmitter();


  constructor(private applicationFormService:ApplicationFormService,
    private activatedRoute:ActivatedRoute, private router:Router,
    private modalService:ModalService) {
      this.operacionExitosa=false;
      this.applicationForm=new ApplicationForm();
      
      console.log("applicationForm: " + JSON.stringify( this.applicationForm));
     }

  ngOnInit(): void {
    this.operacionExitosa=false;
    this.modalService.modalAbiertoSolicitud.subscribe(id=>{
      this.cargarSolicitud(id);
    });
    

  }

  
  estiloEstado(estadoSolicitud:string):string{
    return Comun.estiloEstado(estadoSolicitud);
   }

  cargarSolicitud(id:number):void{
    if(id==0){
      //nuevo
      this.applicationForm=new ApplicationForm();

      let estadoNuevo= new Valor();
      estadoNuevo.codigo="PENDIENTE";

      
    }else{      
      //llamar a la solicitud creada
      this.applicationFormService.get(id).subscribe(response =>{
        this.applicationForm=response;
        }      
      );

    }
    
  }

  new(){

    console.log("applicationForm: " + JSON.stringify( this.applicationForm));
  
    let idCreacion:number=0;

  this.applicationFormService.create(this.applicationForm).subscribe(
    (response)=>{      
      
      swal.fire({
        icon: 'success',
        title: 'Operation Done',
        text: 'Created new application form'
      });
    
     this.modalService.cerrarModal("SOLICITUD");
     this.router.navigate(['/forms']);

     this.operacionExitosa=true;
    this.applicationForm=response;
    console.log(this.applicationForm);
    
     
     
    
    },
    error=>{


    },
    ()=>{
      this.closeBtn.nativeElement.click();
    }

  );

  }

}
