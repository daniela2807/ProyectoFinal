import { FirestoreService } from './../firestore.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public contra1 = document.getElementById("contra1");
  public contra2 = document.getElementById("contra2");
  public user$: Observable<any> = this.firestoreservice.afAuth.user;
  public newClientForm = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Apellido: new FormControl('', Validators.required),
    Edad: new FormControl('', Validators.required),
    Correo: new FormControl('', Validators.required),
    Contraseña: new FormControl('', Validators.required),
    Contraseña2: new FormControl('', Validators.required),
    id: new FormControl('')
  });


  constructor(private firestoreservice: FirestoreService, private router: Router, private notificationService: NotificationsService) { }

  ngOnInit(): void {
  }

  public newClient(form) {
    let activo = true;
    let f = new Date();
    let fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    //console.log(`Status: ${this.currentStatus}`);
    let data = {
      Nombre: form.Nombre,
      Apellido: form.Apellido,
      Edad: form.Edad,
      Correo: form.Correo,
      Activo: activo,
      DiaInscripcion: fecha,
    }
    let data2 = {
      Correo: form.Correo,
      Contraseña: form.Contraseña
    }
    if (form.Contraseña.length < 6) {
      this.onError('La contraseña debe ser mayor a 6 caracteres :( ');
    }
    else if(form.Contraseña !== form.Contraseña2) {
      this.onError('Las contraseñas no coinciden :( ');
    }
    else {
      this.firestoreservice.createClient(data).then(() => {
        console.log('Documento creado exitosamente');
        this.newClientForm.setValue({
          Nombre: '',
          Apellido: '',
          Edad: '',
          Correo: '',
          Contraseña: '',
          Contraseña2: '',
          id: '',
        });
      }, (error) => {
        console.error(error);
      });

      console.log(data2.Correo, data2.Contraseña);
      const user = this.firestoreservice.register(data2.Correo, data2.Contraseña);
      console.log(user);
      if (user) {
        this.router.navigate(['/home']);
      }
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

}
