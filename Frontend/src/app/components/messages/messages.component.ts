import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  message : String = "";
  message2 : String = "";
  messageCode : String = "";

  constructor ( private activatedRoute : ActivatedRoute, private router : Router ) {}
  ngOnInit() {

    this.messageCode = this.activatedRoute.snapshot.params.msg;

    if(this.messageCode == '1'){
      this.message = "¡Registro exitoso!";
      this.message2 = "Revise su email para activar su cuenta.";
    }
  }

}
