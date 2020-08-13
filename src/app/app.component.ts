import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DemoService} from './demo.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ItemCardComponent } from './item-card/item-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  itemDialogRef: MatDialogRef<ItemCardComponent>;

  public items = [];

  constructor(private _demoService: DemoService, private dialog: MatDialog) {}

  openItemDialog() {
    this.itemDialogRef = this.dialog.open(ItemCardComponent);
  } 

  listItems() {
    console.log('listing..');
    this._demoService.listItems().subscribe(
      data => {console.log(data)},
      err => console.error(err),
      () => console.log('done loading items')
    );
  }

  getItem() {
    console.log('listing..');
    this._demoService.getItem().subscribe(
      data => {console.log(data)},
      err => console.error(err),
      () => console.log('done loading item')
    );
  }

  createNew(item) {
    console.log('Creating..');
    this._demoService.createItem(item).subscribe(
      data => {this.items.push(data)},
      err => console.error(err),
      () => console.log("created..")
    );
  }

  deleteItem() {
    console.log('deleting..');
    this._demoService.deleteItem().subscribe(
      data => {console.log(data)},
      err => console.error(err),
      () => console.log('done deleting item')
    );
  }
}
