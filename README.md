Angular 2 bootstrap pagination
-----------------------------

### Install
```bash
npm i -S ng2-bs-pagination
```
### SystemJS usage
```javascript
paths: {
    // paths serve as alias
    'npm:': 'node_modules/',},
map:{
    'ng2-bs-pagination' : 'npm:ng2-bs-pagination'
},
packages: {
    'ng2-bs-pagination': {
        main: './index.js',
        defaultExtension: 'js'
    }
}
```

### Usage
```javascript
// Module file 
import {PaginationModule} from 'ng2-bs-pagination';

@NgModule({
  imports:      [ PaginationModule ],
  declarations: [ AppComponent, TestPaginationComponent ],
  bootstrap:    [ AppComponent ]
})

// Component file
import {Component, OnInit} from "@angular/core";
import {PaginationPipe, PaginationInterface} from "ng2-bs-pagination";

@Component({
    moduleId: module.id,
    selector: 'test-paginaion',
    templateUrl: 'test-pagination.component.html',
    providers: [PaginationPipe]
})
export class TestPaginationComponent implements OnInit {
    collection: Array<{}>;

    currentPage: number = 1;
    totalItems: number = 200; // total numbar of page not items
    pageSize: number = 10; // max page size

    public onPageChange(event: any): void {
        this.currentPage = event.currentPage;
    };

    public paginationArgs() : PaginationInterface{
        return {
            currentPage : this.currentPage,
            totalItems : this.totalItems,
            pageSize : this.pageSize
        }
    }

    ngOnInit(): void {
        let collection = [];
        for (let i = 0; i < 1000; i++) {
            collection.push({
                name: i
            });
        }
        this.collection = collection;
    }
}
```
### test-pagination.component.html
```html
<ul>
    <li *ngFor="let data of collection | pagination: paginationArgs();">
        {{data.name}}
    </li>
</ul>

<ng-pagination [totalItems]="totalItems"
               [currentPage]="currentPage"
               [pageSize]="pageSize"
               (pageChange)="onPageChange($event)"
               previous-text="&lsaquo;"
               next-text="&rsaquo;"
               first-text="First"
               last-text="Last">
</ng-pagination>
```   
