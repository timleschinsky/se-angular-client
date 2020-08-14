import { Component, OnInit, Inject } from  '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  templateUrl: './items-detail-card.component.html',
  styleUrls: ['./items-detail-card.component.css']
})
export class ItemsDetailCardComponent implements OnInit {

  form: FormGroup;
  public itemList = [];

  constructor(
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<ItemsDetailCardComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit(): void {
    this.itemList = this.data.items;
    this.form = this.formBuilder.group({})
  }

  submit(form){
    this.dialogRef.close();
  }

}
