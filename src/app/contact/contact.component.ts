import { MessageService } from '../services/message.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacto = new FormGroup({
    Nombre: new FormControl(''),
    Apellido: new FormControl(''),
    Correo: new FormControl(''),
    Asunto: new FormControl(''),
    Mensaje: new FormControl(''),
  });

  constructor(public _MessageService: MessageService) { }

  ngOnInit(): void {
  }

  Correo(form) {
    console.log(form);
    this._MessageService.sendMessage(form).subscribe(() => {
      console.log('Mensaje enviado correctamente');
   });
  }

}
