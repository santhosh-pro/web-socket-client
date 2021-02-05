import { Component, OnInit } from '@angular/core';
import {ChatService} from './chat.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  messages:Array<string>=[];
  constructor(public chatService:ChatService) {

  }
  

  ngOnInit(): void {
    this.chatService.receiveMessage();

    this.chatService.receiveData$.subscribe(res=>{
      this.messages.push(res.message)
    });
  }

  sendMessage(value:string) {
    this.chatService.sendMessage({message:value})
  }


}
