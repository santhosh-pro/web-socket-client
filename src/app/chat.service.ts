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
  
  constructor() {
    // Connect Socket with server URL
    this.socket = io(environment.socketUrl);
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
