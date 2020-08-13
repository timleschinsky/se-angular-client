import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import {Observable} from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DemoService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data from a single API endpoint
    listItems() {
        console.log('listing..');
        return this.http.get('http://localhost:8080/item/');
    }

    getItem() {
        console.log('listing..');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        //let params = new HttpParams().set("id", "0"); {params: params}
        return this.http.get('http://localhost:8080/item/1');
    }

    createItem(item) {
        console.log('Creating..');
        return this.http.post('http://localhost:8080/item/', {description: item[0], manufacturer: item[1], name: item[2], price: item[3], tax: item[4]}, {headers: {'Access-Control-Allow-Origin' : '*'}});
    }

    deleteItem() {
        console.log('Deleting..');
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.delete('http://localhost:8080/item/2');
    }
}