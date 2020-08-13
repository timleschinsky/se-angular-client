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
    this.dialogRef.close({description: form.value.description, manufacturer: form.value.manufacturer, name: form.value.name, price: form.value.price, tax: form.value.tax});
  }
}
