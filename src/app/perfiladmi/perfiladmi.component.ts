import { FirestoreService } from "./../firestore.service";
import { Component, OnInit, NgZone } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: "app-perfiladmi",
  templateUrl: "./perfiladmi.component.html",
  styleUrls: ["./perfiladmi.component.css"],
})
export class PerfiladmiComponent implements OnInit {
  public clientes = [];
  public documentId = null;
  public cursos = [];
  public currentStatus = 1;
  mostrarGraf: boolean = false;

  //para mostrar el spinner mientras se carga la info
  showSpinner: boolean = true;
  showSpinner1: boolean = true;

  lugares = [];
  contador1: number = 0;
  contador2: number = 0;
  contador3: number = 0;
  contador4: number = 0;
  contador5: number = 0;
  contador6: number = 0;


  
  // Grafica dona cursos y miembros
  mostrarGraf2: boolean = false;
  lugares2 = [];
  contador01: number = 0;
  contador02: number = 0;
  public doughnutChartLabels = ["Miembros", "Cursos"];
  public doughnutChartData = [this.contador01, this.contador02];
  public doughnutChartType = "doughnut";



  public barChartOptions = {
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    responsive: true,
  };

  public barChartLabels = [
    "10-19",
    "20-29",
    "30-39",
    "40-49",
    "50-59",
    "60-69",
  ];
  public barChartType = "bar";
  public barChartLegend = true;

  public barChartData = [];

  public cursos2 = [];

  
  // grafica  miembros mensuales
  mostrarGraf3: boolean = false;
  lugares3 = [];
  contadorUno: number = 0;
  contadorDos: number = 0;
  contadorTres: number = 0;
  contadorCuatro: number = 0;
  contadorCinco: number = 0;
  contadorSeis: number = 0;
  contadorSiete: number = 0;
  contadorOcho: number = 0;
  contadorNueve: number = 0;
  contadorDiez: number = 0;
  contadorOnce: number = 0;
  contadorDoce: number = 0;

  public doughnutChartLabels2 = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  public doughnutChartData2 = [];
  public doughnutChartType2 = "doughnut";


  public newCursoForm = new FormGroup({
    Curso: new FormControl("", Validators.required),
    Hora: new FormControl("", Validators.required),
    Imparte: new FormControl("", Validators.required),
    Lugares: new FormControl("", Validators.required),
    Ubicacion: new FormControl("", Validators.required),
    id: new FormControl(""),
  });

  constructor(private firestoreservice: FirestoreService) {
    this.newCursoForm.setValue({
      Curso: "",
      Hora: "",
      Imparte: "",
      Lugares: "",
      Ubicacion: "",
      id: "",
    });
  }

  ngOnInit() {
    this.firestoreservice.getClientes().subscribe((clienteSnapshot) => {
      this.clientes = [];
      clienteSnapshot.forEach((ClienteData: any) => {
        let client = {
          id: ClienteData.payload.doc.id,
          data: ClienteData.payload.doc.data(),
        };
        //client.data.DiaInscripcion = new Date(client.data.DiaInscripcion * 1000).toLocaleString();
        this.clientes.push(client);


        this.contador01++;
        switch (client.data.Edad) {
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
            this.contador1++;
            break;
          case 20:
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
          case 27:
          case 28:
          case 29:
            this.contador2++;
            break;
          case 30:
          case 31:
          case 32:
          case 33:
          case 34:
          case 35:
          case 36:
          case 37:
          case 38:
          case 39:
            this.contador3++;
            break;
          case 40:
          case 41:
          case 42:
          case 43:
          case 44:
          case 45:
          case 46:
          case 47:
          case 48:
          case 49:
            this.contador4++;
            break;
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
          case 58:
          case 59:
            this.contador5++;
            break;
          case 60:
          case 61:
          case 62:
          case 63:
          case 64:
          case 65:
          case 66:
          case 67:
          case 68:
          case 69:
            this.contador6++;
            break;
          default:
            console.log("No lo hará.");
        }

        console.log(
          "no entre" +
            client.data.DiaInscripcion[0] +
            "es" +
            client.data.DiaInscripcion[1] +
            "es" +
            client.data.DiaInscripcion[2] +
            "es" +
            client.data.DiaInscripcion[3] +
            "es" +
            client.data.DiaInscripcion[4] +
            "es" +
            client.data.DiaInscripcion[5] +
            "es" +
            client.data.DiaInscripcion[6]
        );
        if (
          client.data.DiaInscripcion[3] <= 7 ||
          client.data.DiaInscripcion[2] <= 7
        ) {
          console.log(
            "entree" +
              client.data.DiaInscripcion[0] +
              "es" +
              client.data.DiaInscripcion[1] +
              "es" +
              client.data.DiaInscripcion[2] +
              "es" +
              client.data.DiaInscripcion[3] +
              "es" +
              client.data.DiaInscripcion[4] +
              "es" +
              client.data.DiaInscripcion[5] +
              "es" +
              client.data.DiaInscripcion[6]
          );
          if (
            (client.data.DiaInscripcion[3] || client.data.DiaInscripcion[2]) ==
            1
          ) {
            this.contadorUno++;
          } else if (
            (client.data.DiaInscripcion[3] || client.data.DiaInscripcion[2]) ==
            2
          ) {
            this.contadorDos++;
          } else if (
            (client.data.DiaInscripcion[3] || client.data.DiaInscripcion[2]) ==
            3
          ) {
            this.contadorTres++;
          } else if (
            (client.data.DiaInscripcion[3] || client.data.DiaInscripcion[2]) ==
            4
          ) {
            this.contadorCuatro++;
          } else if (
            (client.data.DiaInscripcion[3] || client.data.DiaInscripcion[2]) ==
            5
          ) {
            this.contadorCinco++;
          } else if (
            (client.data.DiaInscripcion[3] || client.data.DiaInscripcion[2]) ==
            6
          ) {
            this.contadorSeis++;
            console.log("entre3");
          } else if (
           ( client.data.DiaInscripcion[3] == 7 ||
            client.data.DiaInscripcion[2] == 7)
          ) {
            this.contadorSiete++;

            console.log("entre2");
            console.log("AQUII" + this.contadorSiete);
          }else if((client.data.DiaInscripcion[3] || client.data.DiaInscripcion[2] ) ==8){
            this.contadorOcho++ ;
           }else if((client.data.DiaInscripcion[3] || client.data.DiaInscripcion[2] ) ==9){
            this.contadorNueve++ ;
           }else if((client.data.DiaInscripcion[3] || client.data.DiaInscripcion[2] ) ==10){
            this.contadorDiez++ ;
           }else if((client.data.DiaInscripcion[3] || client.data.DiaInscripcion[2] ) ==11){
            this.contadorOnce++ ;
           }else if((client.data.DiaInscripcion[3] || client.data.DiaInscripcion[2] ) ==12){
            this.contadorDoce++ ;
           }
        }



      });
      this.showSpinner = false;
    });

    this.firestoreservice.getCursos().subscribe((cursoSnapshot) => {
      this.cursos = [];
      cursoSnapshot.forEach((CursoData: any) => {
         this.contador02++;
        this.cursos.push({
          id: CursoData.payload.doc.id,
          data: CursoData.payload.doc.data(),
        });
      });
      this.lugares;
      this.showSpinner1 = false;
    });
  }

  public deleteClient(documentId) {
    this.firestoreservice.deleteCliente(documentId).then(
      () => {
        console.log("Documento eliminado Wuuuu");
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public editCurso(documentId) {
    let editSubscribe = this.firestoreservice
      .getCurso(documentId)
      .subscribe((curso) => {
        this.currentStatus = 2;
        this.documentId = documentId;
        this.newCursoForm.setValue({
          id: documentId,
          Curso: curso.payload.data()["Curso"],
          Hora: curso.payload.data()["Hora"],
          Imparte: curso.payload.data()["Imparte"],
          Lugares: curso.payload.data()["Lugares"],
          Ubicacion: curso.payload.data()["Ubicacion"],
        });
        editSubscribe.unsubscribe();
      });
  }

  public grafica() {
    let buttonvalue = document.getElementById("grafica").innerText;
    let button = document.getElementById("grafica");
    if (buttonvalue == "Ocultar Grafica") {
      document.getElementById("grafica").innerText = "Estadisticas";
      this.mostrarGraf = false;
      button.blur();
    } else {
      document.getElementById("grafica").innerText = "Ocultar Grafica";
      this.mostrarGraf = true;
      this.barChartData = [
        {
          data: [
            this.contador1,
            this.contador2,
            this.contador3,
            this.contador4,
            this.contador5,
            this.contador6,
          ],
          backgroundColor: "#7b1fa2",
          hoverBackgroundColor: "#69f0ae",
          borderColor: "#ffffff",
          pointBackgroundColor: "#ffffff",
          label: "Edades",
        },
      ];
      button.blur();
    }
  }

    //cursos y miembros
  public grafica2() {
    let buttonvalue = document.getElementById("grafica3").innerText;
    let button = document.getElementById("grafica3");
    if (buttonvalue == "Ocultar Grafica") {
      document.getElementById("grafica3").innerText = "Estadisticas Cursos y Miembros Generales";
      this.mostrarGraf2 = false;
      button.blur();
    } else {
      document.getElementById("grafica3").innerText = "Ocultar Grafica";
      this.mostrarGraf2 = true;
      this.doughnutChartData = [this.contador01, this.contador02];
    }
    
    
  }

  public grafica3() {
    let buttonvalue = document.getElementById("grafica2").innerText;
    let button = document.getElementById("grafica2");
    if (buttonvalue == "Ocultar Grafica") {
      document.getElementById("grafica2").innerText = "Miembros mensuales";
      this.mostrarGraf3 = false;
      button.blur();
    } else {
      document.getElementById("grafica2").innerText = "Ocultar Grafica";
    this.mostrarGraf3 = true;
    this.doughnutChartData2 = [
      
          this.contadorUno,
          this.contadorDos,
          this.contadorTres,
          this.contadorCuatro,
          this.contadorCinco,
          this.contadorSeis,
          this.contadorSiete,
          this.contadorOcho,
          this.contadorNueve,
          this.contadorDiez,
          this.contadorOnce,
          this.contadorDoce,
       
       
      
    ];
    
    button.blur();
    
        }
      }
    



  public deleteCurso(documentId) {
    this.firestoreservice.deleteCurso(documentId).then(
      () => {
        console.log("Documento elimiando ");
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public newCurso(form, documentId = this.documentId) {
    if (this.currentStatus === 1) {
      let data = {
        Curso: form.Curso,
        Hora: form.Hora,
        Imparte: form.Imparte,
        Lugares: form.Lugares,
        Ubicacion: form.Lugares,
      };
      this.firestoreservice.createCurso(data).then(
        () => {
          console.log("Documento creado");
          this.newCursoForm.setValue({
            Curso: "",
            Hora: "",
            Imparte: "",
            Lugares: "",
            Ubicacion: "",
            id: "",
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      let data = {
        Curso: form.Curso,
        Hora: form.Hora,
        Imparte: form.Imparte,
        Lugares: form.Lugares,
        Ubicacion: form.Ubicacion,
      };
      this.firestoreservice.updateCurso(documentId, data).then(
        () => {
          this.currentStatus = 1;
          this.newCursoForm.setValue({
            Curso: "",
            Hora: "",
            Imparte: "",
            Lugares: "",
            Ubicacion: "",
            id: "",
          });
          console.log("Documento editado exitosamente");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
