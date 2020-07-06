import { MessageService } from './../services/message.service';
import { FirestoreService } from "./../firestore.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {ActivatedRoute , Params, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ImgSrcDirective } from '@angular/flex-layout';

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
  //para mostrar el spinner mientras se carga la info
  showSpinner: boolean = true;
  showSpinner1: boolean = true;

  constructor(private firestoreservice: FirestoreService, private route: ActivatedRoute, 
    private modalService: NgbModal, private imc: MessageService) {

    this.forma = new FormGroup({
      'sexo': this.sexo,
      'estatura': this.estatura, 
      'peso': this.peso
    });
  }

  //metodo para calcular el IMC usando el API
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

  //Erorres en el form
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
