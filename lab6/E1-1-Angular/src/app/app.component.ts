import { Component } from '@angular/core';

class Item {
    purchase: string;
    done: boolean;
    price: number;

    constructor(purchase: string, price: number) {

        this.purchase = purchase;
        this.price = price;
        this.done = false;
    }
}

class WatchItem {
    type: string;
    brand: string;

    constructor(type: string, brand: string) {
        this.brand = brand;
        this.type = type;

    }
}
// Тип годинника, марка годинника, марка – тип 



@Component({
    selector: 'purchase-app',
    template: `
    <div class="container-fluid">
        <div class="page-header">
            <h1> Список покупок </h1>
        </div>
        <div class="panel">
            <div class="form-inline">
                <div class="form-group">
                    <div class="col-md-8">
                        <input class="form-control" [(ngModel)]="text" placeholder = "Название" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-6">
                        <input type="number" class="form-control" [(ngModel)]="price" placeholder="Цена" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-md-offset-2 col-md-8">
                        <button class="btn btn-default" (click)="addItem(text, price)">Добавить</button>
                    </div>
                </div>
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Предмет</th>
                        <th>Цена</th>
                        <th>Куплено</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let item of items">
                        <td>{{item.purchase}}</td>
                        <td>{{item.price}}</td>
                        <td><input type="checkbox" [(ngModel)]="item.done" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="page-header">
                    <h1> Типы часов </h1>
                </div>
                <div class="panel">
                    <div class="form-inline">
                        <div class="form-group">
                            <div class="col-md-8">
                                <input class="form-control" [(ngModel)]="watchType" placeholder = "Название" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-offset-2 col-md-8">
                                <button class="btn btn-default" (click)="addWatchType(watchType)">Добавить</button>
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Типы часов</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="let watchType of watchTypes">
                                <td>{{watchType}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-4">
                <div class="page-header">
                    <h1> Производители часов </h1>
                </div>
                <div class="panel">
                    <div class="form-inline">
                        <div class="form-group">
                            <div class="col-md-8">
                                <input class="form-control" [(ngModel)]="watchBrand" placeholder = "Название" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-offset-2 col-md-8">
                                <button class="btn btn-default" (click)="addWatchBrand(watchBrand)">Добавить</button>
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Производители часов</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="let watchBrnd of watchBrands">
                                <td>{{watchBrnd}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-4">
                <div class="page-header">
                    <h1> Часы </h1>
                </div>
                <div class="panel">
                    <div class="form-inline">
                        <div class="form-group">
                            <div class="col-md-4">
                                <label>Производитель
                                    <select class="form-control" [(ngModel)]="newwatchBrand">
                                    <option disabled [ngValue]="undefined">Выбрать</option>
                                        <option *ngFor="let watchBrnd of watchBrands" 
                                            [value]="watchBrnd">
                                            {{watchBrnd}}
                                        </option>
                                    </select>  
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-4">
                                <label>Производитель
                                    <select class="form-control" [(ngModel)]="newwatchType">
                                        <option disabled [ngValue]="undefined">Выбрать</option>
                                        <option *ngFor="let watchTyp of watchTypes" [value]="watchTyp">
                                            {{watchTyp}}
                                        </option>
                                    </select>  
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class=" col-md-4">
                                <button class="btn btn-default" (click)="addWatch(newwatchBrand, newwatchType)">Добавить</button>
                            </div>
                        </div>
                    </div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Тип</th>
                                <th>Производитель</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="let watch of watches">
                                <td>{{watch.type}}</td>
                                <td>{{watch.brand}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `
})



export class AppComponent {
    items: Item[] =
        [
            { purchase: "Хлеб", done: false, price: 15.9 },
            { purchase: "Масло", done: false, price: 60 },
            { purchase: "Картофель", done: true, price: 22.6 },
            { purchase: "Сыр", done: false, price: 310 }
        ];


    watchTypes: string[] = [];
    watchBrands: string[] = [];
    watches: WatchItem[] = [];

    
    addItem(text: string, price: number): void {

        if (text == null || text.trim() == "" || price == null)
            return;
        this.items.push(new Item(text, price));
    }


    addWatchType(text: string): void {
        if (text == null || text.trim() == "")
            return;
        this.watchTypes.push(text);
    }
    addWatchBrand(text: string): void {
        if (text == null || text.trim() == "")
            return;
        this.watchBrands.push(text);
    }

    addWatch(type: string, brand: string): void {
        if (type == null || type.trim() == "" || brand == null || brand.trim() == "")
            return;
        this.watches.push(new WatchItem(type, brand));
    }



}
