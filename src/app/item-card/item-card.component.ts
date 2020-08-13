import { Component, OnInit, Output, EventEmitter } from  '@angular/core';
import {DemoService} from '../demo.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {

  form: FormGroup;
  description: string = '';
  manufacturer: string = '';
  name: string = '';
  price: number = 0;
  tax: number = 0;

  item = [];

  //constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ItemCardComponent>) {}

  @Output() createNewItem = new EventEmitter<any>();

  create(){
    this.item.push(this.description);
    this.item.push(this.manufacturer);
    this.item.push(this.name);
    this.item.push(this.price);
    this.item.push(this.tax);
    this.createNewItem.emit(this.item);
  }

  ngOnInit(): void {
    /*
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.matDialog.open(ItemCardComponent, dialogConfig);
    */
  }
}
