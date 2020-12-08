import { NotificationsService } from 'angular2-notifications';
import { MessageService } from '../services/message.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacto = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Apellido: new FormControl('', Validators.required),
    Correo: new FormControl('', Validators.required),
    Asunto: new FormControl('', Validators.required),
    Mensaje: new FormControl('', Validators.required),
  });
  
  

  constructor(public _MessageService: MessageService, private notificacion: NotificationsService) { }

  ngOnInit(): void { 
    this.initMap()
  }


  initMap(): void {
    var coord = {lat:21.9112242 ,lng: -102.3139526};
    var map = new google.maps.Map(document.getElementById('map'),{
    zoom: 15,
    center: coord
    });
    var marker = new google.maps.Marker({
    position: coord,
    map: map
    });
  }

  Correo(form) {
    if(!this.contacto.invalid){
      //console.log(form);
      this._MessageService.sendMessage(form).subscribe(() => {
        console.log('Mensaje enviado correctamente');
        this.onSuccess("Mensaje enviado correctamente");
        this.contacto.reset();
      });
    } else{
      this.onError("Por favor llena los campos correctamente");
    }
  }

  onSuccess(message){
    this.notificacion.success('Todo bien', message, {
      position: ['bottom','right'],
      timeOut: 3500,
      animate: 'fade',
      showProgressBar: true
    });
  }

  onError(message){
    this.notificacion.error('Error', message, {
      position: ['bottom','right'],
      timeOut: 3500,
      animate: 'fade',
      showProgressBar: true
    });
  }

}
