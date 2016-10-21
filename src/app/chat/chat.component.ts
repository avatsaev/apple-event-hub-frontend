import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";

declare let io:any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {

  private socket;
  messages:Array<Object>;
  msg_input:string;

  constructor() {

  }

  on_msg_send(){
    console.log("sending...");
    console.log(this.msg_input)

    this.socket.emit("chat", {username: 'anon', msg: this.msg_input});
    this.messages.push({username: 'anon', msg: this.msg_input, me: true})
    this.msg_input = "";

  }

  ngOnInit() {

    this.messages = [];

    this.socket = io(environment.socket_url);

    this.socket.on('connect', function(socket_){
      console.log("user connected")
    }.bind(this));

    this.socket.on('disconnect', function(socket_){
      console.log("user disconnected")
    }.bind(this));

    this.socket.on('chat_broadcast', function(data:Object){

      console.log(data);
      this.messages.push(data)
    }.bind(this));
  }

}
