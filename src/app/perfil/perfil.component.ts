import { FirestoreService } from './../firestore.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public cursos = [];
  public clientes = [];
  public user$: Observable<any> = this.firestoreservice.afAuth.user;
  constructor(private firestoreservice: FirestoreService) {
  }

  ngOnInit() {
    this.firestoreservice.getClientes().subscribe((clienteSnapshot) => {
      this.clientes = [];
      clienteSnapshot.forEach((ClienteData: any) => {
        let client =
        {
          id: ClienteData.payload.doc.id,
          data: ClienteData.payload.doc.data(),
        }
        //client.data.DiaInscripcion = new Date(client.data.DiaInscripcion * 1000).toLocaleString();
        this.clientes.push(client);
      });
    });
    this.firestoreservice.getCursos().subscribe((cursoSnapshot) => {
      this.cursos = [];
      cursoSnapshot.forEach((CursoData: any) => {
        this.cursos.push({
          id: CursoData.payload.doc.id,
          data: CursoData.payload.doc.data()
        });
      });
    });
  }

}
