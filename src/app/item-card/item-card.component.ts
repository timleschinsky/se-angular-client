import { Component, OnInit } from  '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent{

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<ItemCardComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: '',
      manufacturer: '',
      name: '',
      price: 0,
      tax: 0
    })
  }

  submit(form){
    this.dialogRef.close(`${form.value.description}, ${form.value.manufacturer}, ${form.value.name}, ${form.value.price}, ${form.value.tax}`);
  }
}
