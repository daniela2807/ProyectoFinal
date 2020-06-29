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

  datos: Articulo[] = [];
  dataSource = null;

  constructor() { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    for (let x = 1; x <= 10; x++)
      this.datos.push(new Articulo(x, `Curso ${x}`, Math.trunc(Math.random() * 30)));
    this.dataSource = new MatTableDataSource<Articulo>(this.datos);
    this.dataSource.sort = this.sort;
  }

}

export class Articulo {
  constructor(public Curso: number, public Nombre: string, public Cupo: number) {
  }
}