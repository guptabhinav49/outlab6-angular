import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];
  vpos: MatSnackBarVerticalPosition = 'top';

  constructor(
    private snackbar: MatSnackBar,
  ) { }

  add(message: string) {
    this.messages.push(message);
  }

  clear(){
    this.messages = [];
  }

  pop(): void {
    if(this.messages.length===0)
      return;

    let message = "";
    let duration: number = 3000;

    if(this.messages.length > 2){
      duration = 5000;
    }
    // console.log(this.messages);
    for (let i in this.messages){
      message += " "+this.messages[i];
    }
    this.snackbar.open(message, "", {duration: duration, verticalPosition: this.vpos});

    this.messages = [];
  }
}
