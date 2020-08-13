import { Component, OnInit, Inject } from  '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent{

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<ItemCardComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description: this.data ? this.data.description : '',
      manufacturer: this.data? this.data.manufacturer : '',
      name: this.data? this.data.name : '',
      price: this.data? this.data.price : 0,
      tax: this.data? this.data.tax : 0,
      id: this.data ? this.data.id : ''
    })
  }

  submit(form){
    this.dialogRef.close({description: form.value.description, manufacturer: form.value.manufacturer, name: form.value.name, price: form.value.price, tax: form.value.tax, id: form.value.id});
  }
}
