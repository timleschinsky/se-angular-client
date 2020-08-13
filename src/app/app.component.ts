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

  openItemDialog(item?) {
    this.itemDialogRef = this.dialog.open(ItemCardComponent, {
      hasBackdrop: false,
      data: {
        description: item ? item.description : '',
        manufacturer: item ? item.manufacturer : '',
        name: item ? item.name : '',
        price: item ? item.price : 0,
        tax: item ? item.tax : 0,
      }
    });

    this.itemDialogRef
      .afterClosed()
      .subscribe(result  => {
        if(item) {
          const index = this.items.findIndex(f => f.name == item.name);
          if(index !== -1) {
            this.tempItem.push(result.description);
            this.tempItem.push(result.manufacturer);
            this.tempItem.push(result.name);
            this.tempItem.push(result.price);
            this.tempItem.push(result.tax);
            this.updateItem(this.tempItem, index);
            this.tempItem.length = 0;
          }
        } else {
          if(result !== ''){
            this.tempItem.push(result.description);
            this.tempItem.push(result.manufacturer);
            this.tempItem.push(result.name);
            this.tempItem.push(result.price);
            this.tempItem.push(result.tax);
            this.createNew(this.tempItem);
            this.tempItem.length = 0;
          }
        }
      });
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
      data => {this.items.push(data);
                console.log(data);},
      err => console.error(err),
      () => console.log("created..")
    );
  }

  deleteItem(index, event) {
    event.stopPropagation();
    console.log('deleting..');
    console.log(index);
    this._demoService.deleteItem(index).subscribe(
      data => {console.log(this.items);
                this.items.splice(this.items.findIndex(f => f.id = index), 1);
                console.log(this.items);
                console.log(index);
                console.log(this.items.length);},
      err => console.error(err),
      () => console.log('done deleting item')
    );
  }

  updateItem(item, index) {
    console.log('updating..');
    this._demoService.updateItem(item, index).subscribe(
      data => this.items[index] = data,
      err => console.error(err),
      () => console.log('done updating')
    );
  }

  updateCards() {

  }
}
