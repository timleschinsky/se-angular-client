import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ItemCardComponent} from './item-card/item-card.component';
import {Item, ItemService} from '../generated/api';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

interface Servers {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    itemDialogRef: MatDialogRef<ItemCardComponent>;

    public items: Item[] = [];
    dialogOpened = false;
    form: FormGroup;
    servers: Servers[] = environment.servers;
    server = this.servers[0].value;

    constructor(private demoService: ItemService, private dialog: MatDialog, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
        demoService.configuration.basePath = this.server;
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            description: '', manufacturer: '', name: '', priceGe: '', priceLe: '', tax: ''
        });
        this.listItems();
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
                            const tempItem: Item = {
                                description: result.description,
                                manufacturer: result.manufacturer,
                                name: result.name,
                                price: result.price,
                                tax: result.tax
                            };
                            this.updateItem(id, tempItem);
                        }
                    } else {
                        const tempItem: Item = {
                            description: result.description,
                            manufacturer: result.manufacturer,
                            name: result.name,
                            price: result.price,
                            tax: result.tax
                        };
                        this.createNew(tempItem);
                    }
                }
            }, error => console.log(error), () => {
                this.dialogOpened = false;
            });
    }

    listItems(reset: boolean = false): void {
        console.log('listing items from ' + this.demoService.configuration.basePath);
        if(reset) {
            this.form.reset();
        }
        this.demoService.getItems(this.form.value.name?.length > 0 ? this.form.value.name : undefined, this.form.value.manufacturer?.length > 0 ? this.form.value.manufacturer : undefined, this.form.value.description?.length > 0 ? this.form.value.description : undefined, this.form.value.priceGe?.length > 0 ? Number(this.form.value.priceGe) : undefined, this.form.value.priceLe?.length > 0 ? Number(this.form.value.priceLe) : undefined,).subscribe(data => {
            console.log(data);
            this.items = data;
        }, err => this.handleError('Could not load items', 'Dismiss', err), () => console.log('done loading items'));
    }

    createNew(item: Item): void {
        console.log('Creating..');
        this.demoService.createItem(item).subscribe(data => {
            this.items.push(data);
            console.log(data);
            this.showSuccessMessage('Item ' + data.name + ' created!', 'Cool');
        }, err => this.handleError('Could not create the item', 'Dismiss', err), () => console.log('created..'));
        console.log(this.items);
    }

    deleteItem(id, event): void {
        event.stopPropagation();
        console.log('deleting..');
        this.demoService.deleteItem(id).subscribe(data => {
            this.items.splice(this.items.findIndex(f => f.id === id), 1);
            this.showSuccessMessage('Item deleted!', 'Cool');
        }, err => this.handleError('Could not delete the item', 'Dismiss', err), () => console.log('done deleting item'));
    }

    updateItem(id: number, item: Item): void {
        console.log(this.items);
        console.log('updating..');
        this.demoService.updateItem(id, item).subscribe(data => {
            console.log(data);
            this.items[this.items.findIndex(f => f.id === id)] = data;
            console.log(this.items);
            this.showSuccessMessage('Item ' + data.name + ' updated!', 'Cool');
        }, err => this.handleError('Could not update the item', 'Dismiss', err), () => console.log('done updating'));
        console.log(id);
    }

    changeServer(): void {
        this.items = [];
        this.demoService.configuration.basePath = this.server;
        this.listItems(true);
    }

    handleError(message: string, action: string, err: any): void {
        console.log('An error occurred', err);
        this.snackBar.open(message, action, {
            duration: 6000,
        });
    }

    showSuccessMessage(message: string, action: string): void {
        this.snackBar.open(message, action, {
            duration: 6000,
        });
    }
}
