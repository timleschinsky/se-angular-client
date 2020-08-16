import {NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';  // replaces previous Http service
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {createCustomElement} from '@angular/elements';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';

import {MatIconModule} from '@angular/material/icon';

import {AppComponent} from './app.component';
import {ItemCardComponent} from './item-card/item-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiModule} from '../generated/api';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
    imports: [BrowserModule, FormsModule, MatIconModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, MatDialogModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, ApiModule, MatToolbarModule, MatSelectModule, MatSnackBarModule],
    declarations: [AppComponent, ItemCardComponent],
    entryComponents: [ItemCardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(injector: Injector) {
        const custom = createCustomElement(ItemCardComponent, {injector});
        customElements.define('app-item-card', custom);
    }
}
