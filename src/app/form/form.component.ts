import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { FormResponse } from '../formResponse';
// import { MessageService } from '../message.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  data_feedback = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    feedback: new FormControl('', Validators.required),
    comment: new FormControl(''),
  });

  data: FormResponse = {
    name: "",
    email: "",
    feedback: "",
    comment: ""
  };

  constructor(
    private dataservice: DataService,
    // private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getFromAPI();
  }

  onSubmit(): void{
    
    if(!this.validateForm()){
      return;
    }

    this.data = this.data_feedback.value; 
    this.dataservice.postValues(this.data).subscribe(
      data => console.log(data)
    )
  }

  validateForm() {
    let valid: boolean = true;
    const controls = this.data_feedback.controls;
    // for (let name in controls) {
    //   this.messageService.clear();
    //   if (controls[name].invalid) {
    //     valid = false;
    //     this.messageService.add(`Invalid input in the field ${name.toUpperCase()}`);
    //   }
    // }
    return valid;
  }

  getFromAPI(): void{
    this.dataservice.getValues().subscribe(
      (data: FormResponse) => {
        this.setForm(data);
        this.data = data;
      }
    )
  }

  setForm(data: FormResponse): void {
    // console.log(data);
    this.data_feedback.setValue({
      name: data.name,
      email: data.email,
      feedback: data.feedback,
      comment: data.comment,
    });
  }
}
