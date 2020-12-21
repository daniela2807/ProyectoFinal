import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _http: HttpClient) { }
  sendMessage(body) {
    return this._http.post('https://us-central1-entrega1-cd65d.cloudfunctions.net/app/formulario', body);
    }

  firstapi(){
    return this._http.get('https://us-central1-entrega1-cd65d.cloudfunctions.net/app/home');
  }

  calcularIMC(body){
    return this._http.post('http://localhost:3000/imc',body);
  }

  getCursos(){
    return this._http.get('http://localhost:3000/getCursos');
  }

  deleteCurso(nombre){
    return this._http.delete(`http://localhost:3000/deleteCurso/${nombre}`);
  }

  insertCurso(body){
    return this._http.post('http://localhost:3000/insertCurso',body);
  }
}
