import { MessageService } from './../services/message.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor( public messageService: MessageService ) { 
    messageService.firstapi().subscribe( (data) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
