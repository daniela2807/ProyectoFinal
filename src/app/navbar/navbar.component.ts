import { FirestoreService } from './../firestore.service';
import { SpeechService } from '../speech.service';
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  

  @Output() public sidenavToggle = new EventEmitter();

  public user$: Observable<any> = this.firestoreservice.afAuth.user;

  index: number;
  v: number = this.getVolume();
  speechData: any;
  html: string;
  constructor(private spk: SpeechService, private firestoreservice: FirestoreService, public router: Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.firestoreservice.logout();
    this.router.navigate(['/admin']);
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit("Hola");
  }

  start(){
    this.html = document.getElementById('toRead').textContent;
    this.spk.stop();
    this.spk.start(this.html);
  }
  pause(){
    this.spk.pause();
  }
  resume(){
    this.spk.resume();
  }

  ruta(){
    let route = this.router;
    this.firestoreservice.afAuth.onAuthStateChanged(function(user){
      if (user.email === 'admin@hotmail.com') {
        route.navigate(['/perfiladmi']);
      } else {
        route.navigate(['/perfil']);
      }
    });
  }

  getSpeechData(){
    this.speechData = this.spk.speechData;
    //this.index = this.speechData.findIndex();
    //console.log(this.speechData);
  }

  setVolume(v){
    this.spk.setVolume(v);
  }

  getVolume(){
    return this.spk.getVolume();
  }

  setLanguage(lang){
    this.spk.setLanguage(lang);
  }
}
