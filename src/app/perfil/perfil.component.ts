
import { FirestoreService } from "./../firestore.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute , Params, Router} from '@angular/router';

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
  
  ngxQrcode2: any;

  //para mostrar el spinner mientras se carga la info
  showSpinner: boolean = true;
  showSpinner1: boolean = true;

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
      this.showSpinner = false;
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
      this.showSpinner1 = false;
    });
  }

  public cubo() {
    this.mostrarCubo = true;

    console.log(this.cursos2[2]);
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { centered: true });
  }

}
