import { SpeechService } from './../speech.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  v: number = this.getVolume();
  speechData: any;
  html: string;
  speaking: boolean = false;

  constructor(private spk: SpeechService) { }

  ngOnInit() {
  }

  public onSidenavClose = () => {
    if(this.spk.isPaused() || this.spk.isSpeaking()){
      this.spk.stop();
    }
    this.sidenavClose.emit();
  }

  start(){
    this.speaking = true;
    this.sidenavClose.emit();
    this.html = document.getElementById('toRead').textContent;
    this.spk.stop();
    this.spk.start(this.html);
  }

  stop(){
    this.speaking = false;
    this.spk.stop();
  }
  pause(){
    this.sidenavClose.emit();
    this.spk.pause();
  }
  resume(){
    this.sidenavClose.emit();
    this.spk.resume();
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
