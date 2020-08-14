import { Component, OnInit, Inject } from  '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  templateUrl: './item-detail-card.component.html',
  styleUrls: ['./item-detail-card.component.css']
})
export class ItemDetailCardComponent implements OnInit {

  form: FormGroup;
  public item = [];

  constructor(
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<ItemDetailCardComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit(): void {
    this.item = this.data.item;
    this.form = this.formBuilder.group({})
  }

  submit(form){
    this.dialogRef.close();
  }

}
