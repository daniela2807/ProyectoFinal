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

  lugares = [];
  contador1: number = 0;
  contador2: number = 0;
  contador3: number = 0;
  contador4: number = 0;
  contador5: number = 0;
  contador6: number = 0;

  public barChartOptions = {
    scaleShowVerticalLines: false,
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
      });
    });

    this.firestoreservice.getCursos().subscribe((cursoSnapshot) => {
      this.cursos = [];
      cursoSnapshot.forEach((CursoData: any) => {
        // this.contador2++;
        this.cursos.push({
          id: CursoData.payload.doc.id,
          data: CursoData.payload.doc.data(),
        });
      });
      this.lugares;
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
        label: "Edades",
      },
    ];
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
