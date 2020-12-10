import { FirestoreService } from './../firestore.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MessageService } from './../services/message.service';
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

  constructor(public curso: MessageService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    // for (let x = 1; x <= 10; x++)
    //   this.datos.push(new Articulo(x, `Curso ${x}`, Math.trunc(Math.random() * 30)));
    // this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    // this.dataSource.sort = this.sort;
    this.curso.getCursos().subscribe((data:any)=> {
      this.cursos = [];
      this.cursos = data.data;
      console.log(this.cursos);
      //this.lugares;
    });
  }

}