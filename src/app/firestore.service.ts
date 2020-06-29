import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { first} from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  public user: User;
  
  constructor(private firestore: AngularFirestore, public afAuth: AngularFireAuth) {
  }

  //crea un nuevo cliente
  public createClient(data: {Nombre: string, Apellido: string, Edad: number, Correo: string, Activo: boolean, DiaInscripcion: string}){
    return this.firestore.collection('Clientes').add(data);
  }

  public createCurso(data: {Curso: string, Hora: string, Imparte: string, Lugares: number, Ubicacion: string}){
    return this.firestore.collection('Cursos').add(data);
  }

  //Obtiene un cliente
  public getCliente(documentId: string) {
    return this.firestore.collection('Clientes').doc(documentId).snapshotChanges();
  }

  public getCurso(documentId: string) {
    return this.firestore.collection('Cursos').doc(documentId).snapshotChanges();
  }

  //Obtiene todos los clientes 
  public getClientes(){
    return this.firestore.collection('Clientes').snapshotChanges();
  }

  public getCursos(){
    return this.firestore.collection('Cursos').snapshotChanges();
  }

  //Actualiza un cliente
  public updateCliente(documentId: string, data: any){
    return this.firestore.collection('Clientes').doc(documentId).set(data);
  }

  public updateCurso(documentId: string, data: any){
    return this.firestore.collection('Cursos').doc(documentId).set(data);
  }
  
  public deleteCliente(documentId: string){
    return this.firestore.collection('Clientes').doc(documentId).delete();
  }

  
  public deleteCurso(documentId: string){
    return this.firestore.collection('Cursos').doc(documentId).delete();
  }

  async login(correo: string, password: string){
    try{
      //console.log(correo, password);
      const result = await this.afAuth.signInWithEmailAndPassword(correo, password);
      return result;
    }catch(error){
      console.log(error);
    }
  }

  async register(correo: string, password: string){
    try{
      console.log(correo, password);
      const result = await this.afAuth.createUserWithEmailAndPassword(correo, password);
      return result;
    }
    catch(error){ console.log(error);
    }
  }

  async logout(){
    try{
      await this.afAuth.signOut();
    } catch(error){
      console.log(error);
    }
  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
