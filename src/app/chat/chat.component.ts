import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

declare let io:any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit, AfterViewInit{

  private socket;
  messages:Array<Object>;
  msg_input:string;
  username:string;

  user_count:number;

  // @ViewChild('username_modal') username_modal:ModalComponent;

  constructor() {
    this.user_count = 0;
    this.username = "anonymous"
  }

  on_msg_send(){

    if(this.msg_input.length > 0){

      this.socket.emit("chat", {username: this.username, msg: this.msg_input});
      this.messages.push({username: this.username, msg: this.msg_input, me: true})
      this.msg_input = "";

    }



  }


  ngAfterViewInit() {

  }

  on_username(){
    let uname = prompt("Enter your username", this.username);

    if(uname && uname.length){
      this.username =uname;
      localStorage.setItem('username', this.username);
    }

  }


  ngOnInit() {

    this.messages = [];

    if(!localStorage.getItem('username')){
      localStorage.setItem('username', this.username);
    }

    this.username = localStorage.getItem('username');

    this.socket = io(environment.socket_url);

    // this.socket.on('connect', function(socket_){
    //   console.log("user connected")
    // }.bind(this));

    this.socket.on('message_history', function(data){

      for(let msg of data.message_history){
        this.messages.push(msg);
      }

    }.bind(this));

    this.socket.on('disconnect', function(socket_){
      console.log("user disconnected")
    }.bind(this));


    this.socket.on('user_count_update', function (data) {

      this.user_count = data.user_count;

    }.bind(this));

    this.socket.on('chat_broadcast', function(data:Object){

      this.messages.push(data);

    }.bind(this));

  }

}
