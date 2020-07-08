import { NotificationsService } from 'angular2-notifications';
import { MessageService } from './../services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { ImgSrcDirective } from '@angular/flex-layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Manejo del formulario reactivo de IMC
  forma: FormGroup;
  sexo = new FormControl('Hombre',[Validators.required]);
  estatura = new FormControl('',[Validators.required,Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]);
  peso = new FormControl('',[Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]);
  limpia: any={
    estatura: "",
    peso: ""
  }
  res_imc: number = 0;
  res_nivel: string = "";

  constructor(private imc: MessageService,  private modalService: NgbModal, private notificationService: NotificationsService) {
    this.forma = new FormGroup({
      'sexo': this.sexo,
      'estatura': this.estatura, 
      'peso': this.peso
    });
   }

   calcularIMC(){
    console.log(this.forma.value);
    console.log(this.forma);
    this.imc.calcularIMC(this.forma.value).subscribe((data:any)=>{
        console.log("IMC"+data.imc);
        console.log("Nivel"+data.nivel);
        this.res_imc = data.imc;
        this.res_nivel = data.nivel;
    });
    //this.forma.reset(this.limpia);
  }

  //Errores en el form
  getErrorMessageE() {
    if (this.estatura.hasError('required')) {
      return 'Ingresa un valor, por favor';
    }  
    return this.estatura.hasError('pattern') ? 'Ingresa una estatura válida, por favor sólo números' : '';
  }
  getErrorMessageP() {
    if (this.peso.hasError('required')) {
      return 'Ingresa un valor, por favor';
    }
    return this.peso.hasError('pattern') ? 'Ingresa un peso válido, por favor sólo números' : '';
  }

  openWindowCustomClass(content) {
    if(!this.forma.invalid){
      this.modalService.open(content, { centered: true });
    }
    else{
      this.onError("Por favor llena todo los campos correctamente");
    }
  }

  onError(message){
    this.notificationService.error('Error', message, {
      position: ['bottom','right'],
      timeOut: 3500,
      animate: 'fade',
      showProgressBar: true
    });
  }

  ngOnInit(): void {
    
  }

}
