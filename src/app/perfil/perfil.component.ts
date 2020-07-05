
import { FirestoreService } from "./../firestore.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {ActivatedRoute , Params, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-perfil",
  templateUrl:  './perfil.component.html',
  styleUrls: ["./perfil.component.css"],
})
export class PerfilComponent implements OnInit {
  public cursos = [];
  public cursos2 = [];
  public clientes = [];
  public user = this.firestoreservice.afAuth.user;
  mostrarCubo: boolean = false;
  public correo;


  auxData: string;
  auxData2: string;  //Cambios 
  cad: string ="--CURSOS--";
  cad1: string ="Curso: ";
  salto: string= " \n";
  cad2: string ="Profesor: ";
  cad3: string ="Horario: ";
  cad4: string ="Cupos: ";
  
  cad00:  string ="--Informacion Personal--";
  cad01: string ="Nombre: ";
  cad02: string ="Apellido: ";
  cad03: string ="Edad: ";
  cad04: string ="Correo: ";
  cad05: string ="Activo: ";
  cad06: string ="Dia de Inscripcion: ";

  ngxQrcode2: any;


  constructor(private firestoreservice: FirestoreService, private route: ActivatedRoute, private modalService: NgbModal) {}

  ngOnInit() {
    this.correo=this.route.snapshot.paramMap.get('correo');
    console.log(this.user);
    this.firestoreservice.getClientes().subscribe((clienteSnapshot) => {
      this.clientes = [];
      clienteSnapshot.forEach((ClienteData: any) => {
        let client = {
          id: ClienteData.payload.doc.id,
          data: ClienteData.payload.doc.data(),
        };
        // client.data.DiaInscripcion = new Date(client.data.DiaInscripcion * 1000).toLocaleString();
        this.clientes.push(client);
      });
    });
    this.firestoreservice.getCursos().subscribe((cursoSnapshot) => {
      this.cursos = [];
      cursoSnapshot.forEach((CursoData: any) => {
        this.cursos.push({
          id: CursoData.payload.doc.id,
          data: CursoData.payload.doc.data(),
        });
        this.cursos2.push({
          data: CursoData.payload.doc.data(),
        });
        this.auxData = this.cad1.concat(
          JSON.stringify(this.cursos2),
          this.salto
        );  
      });
      this.ngxQrcode2 = this.auxData;
    });
  }

  public cubo() {
    this.mostrarCubo = true;

    console.log(this.cursos2[2]);
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal', centered: true });
  }

}
