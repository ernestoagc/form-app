import { Component, OnInit, ɵConsole } from '@angular/core';
import { ModalService} from '../services/services.index';
declare var $:any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor(private modalService:ModalService) {
   }

  ngOnInit(): void {
  }


}
