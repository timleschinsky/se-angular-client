import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DemoService} from './demo.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ItemCardComponent } from './item-card/item-card.component';
import { filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  itemDialogRef: MatDialogRef<ItemCardComponent>;

  tempItem = [];
  public items = [];

  constructor(private _demoService: DemoService, private dialog: MatDialog) {}

  openItemDialog() {
    this.itemDialogRef = this.dialog.open(ItemCardComponent, {
      hasBackdrop: false
    });

    this.itemDialogRef
      .afterClosed()
      .subscribe(result  => {
        this.tempItem.push(result.description);
        this.tempItem.push(result.manufacturer);
        this.tempItem.push(result.name);
        this.tempItem.push(result.price);
        this.tempItem.push(result.tax);
        this.createNew(this.tempItem);
        this.tempItem.length = 0;});
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
