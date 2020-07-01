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
  public doughnutChartLabels = ["Miembros", "Cursos"];
  public doughnutChartData = [this.contador1, this.contador2];
  public doughnutChartType = "doughnut";

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
        this.contador1++;
      });
    });

    this.firestoreservice.getCursos().subscribe((cursoSnapshot) => {
      this.cursos = [];
      cursoSnapshot.forEach((CursoData: any) => {
        this.contador2++;
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
    this.doughnutChartData = [this.contador1, this.contador2];
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
