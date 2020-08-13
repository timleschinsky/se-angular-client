import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DemoService} from './demo.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ItemCardComponent } from './item-card/item-card.component';
import { filter} from 'rxjs/operators';
import { ItemsDetailCardComponent } from './items-detail-card/items-detail-card.component';
import { ItemDetailCardComponent } from './item-detail-card/item-detail-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  itemDialogRef: MatDialogRef<ItemCardComponent>;
  itemListDialogRef: MatDialogRef<ItemsDetailCardComponent>;
  itemDetailDialogRef: MatDialogRef<ItemDetailCardComponent>;

  tempItem = [];
  public items = [];

  constructor(private _demoService: DemoService, private dialog: MatDialog) {}

  openItemDialog(item?, id?) {
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
          const index = this.items.findIndex(f => f.id == item.id);
          if(index !== -1) {
            this.tempItem.push(result.description);
            this.tempItem.push(result.manufacturer);
            this.tempItem.push(result.name);
            this.tempItem.push(result.price);
            this.tempItem.push(result.tax);
            this.updateItem(this.tempItem, id);
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
      data => {console.log(data);
                this.itemListDialogRef = this.dialog.open(ItemsDetailCardComponent, {
                  hasBackdrop: false,
                  data: {
                    items: data
                  }
                });
              },
      err => console.error(err),
      () => console.log('done loading items')
    );
  }

  getItem(id, event) {
    event.stopPropagation();
    console.log('listing..');
    this._demoService.getItem(id).subscribe(
      data => {console.log(data);
                this.itemDetailDialogRef = this.dialog.open(ItemDetailCardComponent, {
                  hasBackdrop: false,
                  data: {
                    item: data
                  }
                });
                },
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
    console.log(this.items);
  }

  deleteItem(id, event) {
    event.stopPropagation();
    console.log('deleting..');
    this._demoService.deleteItem(id).subscribe(
      data => {this.items.splice(this.items.findIndex(f => f.id == id), 1);},
      err => console.error(err),
      () => console.log('done deleting item')
    );
  }

  updateItem(item, id) {
    item.id = id;
    console.log(this.items);
    console.log('updating..');
    this._demoService.updateItem(item, id).subscribe(
      data => {console.log(data);
                this.items[this.items.findIndex(f => f.id == id)] = data;
                console.log(this.items);},
      err => console.error(err),
      () => console.log('done updating')
    );
    console.log(id);
  }
}
