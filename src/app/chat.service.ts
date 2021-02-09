import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: any;
  private readonly _receiveData = new BehaviorSubject<any>([]);
  readonly receiveData$ = this._receiveData.asObservable();
  socketOptions = {
    transportOptions: {
      polling: {
        extraHeaders: {
          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNjEyODY3OTM0LCJleHAiOjE2MTI5NTQzMzR9.AzBMD9AdfhPnl3_rzJi1l5SQjCLWcOW1zCQs0N-QgL4', //'Bearer h93t4293t49jt34j9rferek...'
        }
      }
    }
 };
  constructor() {
    // Connect Socket with server URL
    this.socket = io(environment.socketUrl,{ query:{token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiQURNSU4iXSwiaWF0IjoxNjEyODY3OTM0LCJleHAiOjE2MTI5NTQzMzR9.AzBMD9AdfhPnl3_rzJi1l5SQjCLWcOW1zCQs0N-QgL4'}});
  }

  receiveMessage(){
    this.socket.on('msgToClient', res => {
     this._receiveData.next(res);
    });
  }

  sendMessage(data:any){
    this.socket.emit('msgToServer',data)
  }


}
