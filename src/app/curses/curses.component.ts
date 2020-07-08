import { FirestoreService } from './../firestore.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort'; 

@Component({
  selector: 'app-curses',
  templateUrl: './curses.component.html',
  styleUrls: ['./curses.component.css']
})
export class CursesComponent implements OnInit {

  columnas: string[] = ['Curso', 'Nombre', 'Cupo'];
  public cursos = [];
  dataSource = null;
  showSpinner: boolean = true;

  constructor(public firestoreservice: FirestoreService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    // for (let x = 1; x <= 10; x++)
    //   this.datos.push(new Articulo(x, `Curso ${x}`, Math.trunc(Math.random() * 30)));
    // this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    // this.dataSource.sort = this.sort;
    this.firestoreservice.getCursos().subscribe((cursoSnapshot) => {
      this.cursos = [];
      cursoSnapshot.forEach((CursoData: any) => {
        // this.contador2++;
        this.cursos.push({
          id: CursoData.payload.doc.id,
          data: CursoData.payload.doc.data(),
        });
      });
      this.showSpinner = false;
      //this.lugares;
    });
  }

}