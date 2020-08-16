import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ItemCardComponent} from './item-card/item-card.component';
import {Item, ItemService} from '../generated/api';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../environments/environment';

interface Servers {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    itemDialogRef: MatDialogRef<ItemCardComponent>;

    tempItem: Item;
    public items: Item[] = [];
    dialogOpened = false;
    form: FormGroup;
    servers: Servers[] = environment.servers;
    server = this.servers[0].value;

    constructor(private demoService: ItemService, private dialog: MatDialog, private formBuilder: FormBuilder) {
        demoService.configuration.basePath = this.server;
    }

    ngOnInit() {
        this.demoService.getItems().subscribe(items => this.items = items);
        this.form = this.formBuilder.group({
            description: undefined, manufacturer: undefined, name: undefined, priceGe: undefined, priceLe: undefined, tax: undefined
        });
    }

    openItemDialog(id?: number, item?: Item): void {
        if(this.dialogOpened) {
            return;
        }
        this.dialogOpened = true;
        this.itemDialogRef = this.dialog.open(ItemCardComponent, {
            hasBackdrop: false, data: {
                description: item ? item.description : '',
                manufacturer: item ? item.manufacturer : '',
                name: item ? item.name : '',
                price: item ? item.price : 0,
                tax: item ? item.tax : 0,
                title: id ? 'Update' : 'Create'
            }
        });

        this.itemDialogRef
            .afterClosed()
            .subscribe(result => {
                if(result !== '') {
                    if(id) {
                        const index = this.items.findIndex(f => f.id === item.id);
                        if(index !== -1) {
                            this.tempItem = {
                                description: result.description,
                                manufacturer: result.manufacturer,
                                name: result.name,
                                price: result.price,
                                tax: result.tax
                            };
                            this.updateItem(id, this.tempItem);
                        }
                    } else {
                        this.tempItem = {
                            description: result.description,
                            manufacturer: result.manufacturer,
                            name: result.name,
                            price: result.price,
                            tax: result.tax
                        };
                        this.createNew(this.tempItem);
                    }
                }
            }, error => console.log(error), () => {
                this.dialogOpened = false;
            });
    }

    listItems(reset: boolean = false): void {
        console.log('listing..');
        if(reset) {
            this.form.reset();
        }
        this.demoService.getItems(this.form.value.name, this.form.value.manufacturer, this.form.value.description, Number(this.form.value.priceGe), Number(this.form.value.priceLe)).subscribe(data => {
            console.log(data);
            this.items = data;
        }, err => console.error(err), () => console.log('done loading items'));
    }

    createNew(item: Item): void {
        console.log('Creating..');
        this.demoService.createItem(item).subscribe(data => {
            this.items.push(data);
            console.log(data);
        }, err => console.error(err), () => console.log('created..'));
        console.log(this.items);
    }

    deleteItem(id, event): void {
        event.stopPropagation();
        console.log('deleting..');
        this.demoService.deleteItem(id).subscribe(data => {
            this.items.splice(this.items.findIndex(f => f.id === id), 1);
        }, err => console.error(err), () => console.log('done deleting item'));
    }

    updateItem(id: number, item: Item): void {
        console.log(this.items);
        console.log('updating..');
        this.demoService.updateItem(id, item).subscribe(data => {
            console.log(data);
            this.items[this.items.findIndex(f => f.id === id)] = data;
            console.log(this.items);
        }, err => console.error(err), () => console.log('done updating'));
        console.log(id);
    }

    changeServer() {
        this.demoService.configuration.basePath = this.server;
        this.listItems(true);
        this.form.reset();
    }
}
