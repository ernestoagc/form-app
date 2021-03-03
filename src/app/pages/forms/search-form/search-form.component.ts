import { Component, OnInit , Output,Input, EventEmitter} from '@angular/core';
import {  ApplicationForm } from '../../../model/model.index';
import {ApplicationFormService} from "../../../services/services.index"

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output() formResult: EventEmitter<any> = new EventEmitter();
 


  @Input()page:number; 

  applicationForms:any;
  puestoBuscar:any="";
  
  constructor(private applicationFormService:ApplicationFormService) { }
  keyword = 'name';
  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes():void{
      this.page=0;
      console.log("puestoBuscarBuscar: "+this.puestoBuscar);
    console.log("page: " + this.page.toString()); 


    let keywordBusqueda:string="";

    if(typeof(this.puestoBuscar) != 'string' ){
      console.log("no es string");
      keywordBusqueda=this.puestoBuscar.name;
    }else{
      console.log("SI ES string");
      keywordBusqueda=this.puestoBuscar;
    }

    this.applicationFormService.search(this.page,keywordBusqueda,"").subscribe(
      respuesta =>{
        this.applicationForms=respuesta.content;
        respuesta.keyword=keywordBusqueda;
        this.formResult.emit(respuesta);
        console.log("listandoRecomendaciones: "+ JSON.stringify( this.applicationForms));
      }
    );
  }

  buscar():void{

    

    console.log("busqueda puestoBuscar: "+ this.puestoBuscar);
    console.log("busqueda keyword: "+ this.keyword);



    

   this.cargarSolicitudes();
  }

  public countries = [
    {
      id: 1,
      name: 'java',
    },
    {
      id: 2,
      name: 'net',
    } 
  ];

  
  selectEvent(item:any) { 
    console.log("itemSeleccionado: "+JSON.stringify( item.name));

  }

  onChangeSearch(search: string) { 
  }

  onFocused(e) { 
  }

}
