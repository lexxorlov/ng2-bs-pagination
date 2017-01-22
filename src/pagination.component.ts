import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from "@angular/core";
import {NgModel, ControlValueAccessor} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'ng-pagination',
    templateUrl: 'pagination.component.html'
})
export class PaginationComponent implements OnChanges {
    @Input("previous-text") previousText: string;
    @Input("next-text") nextText: string;
    @Input("first-text") firstText: string;
    @Input("last-text") lastText: string;
    @Input("totalItems") totalItems: number;
    @Input("currentPage") currentPage: number;
    @Input("pageSize") pageSize: number;
    @Input("offset") offset: number = 3;

    @Output("pageChange") pageChange = new EventEmitter();

    private selectedPageNo: number;
    private pageList: Array<number> = [];
    private totalSize: number;
    private nextItemValid: boolean;
    private previousItemValid: boolean;

    /**
     * On changes
     * @param changes
     */
    ngOnChanges(changes: any): void {
        this.selectedPageNo = this.currentPage;

        this.doPaging();
    }

    /**
     * Do paging
     */
    doPaging() {
        this.pageList = [];
        this.selectedPageNo = this.selectedPageNo || 1;

        let i: number = 1, count: number = 0;
        let remaining = this.totalItems % this.pageSize;
        this.totalSize = Math.round(((this.totalItems - remaining) / this.pageSize) + (remaining === 0 ? 0 : 1));

        if (this.selectedPageNo > this.totalSize - this.offset) {
            i = this.totalSize - this.offset * 2;
            i = i <= 0 ? 1 : i;
        } else if (this.selectedPageNo > this.offset) {
            i = this.selectedPageNo - this.offset;
        }

        for (count = 0; i <= this.totalSize && count < 7; i++, count++) {
            this.pageList.push(i);
        }

        //next validation
        if (i - 1 < this.totalSize) {
            this.nextItemValid = true;
        } else {
            this.nextItemValid = false;
        }
        //previous validation
        if ((this.selectedPageNo) > 1) {
            this.previousItemValid = true;
        } else {
            this.previousItemValid = false;
        }
    }

    /**
     * Set current page
     * @param pageNo
     */
    setCurrentPage(pageNo: number) {
        this.selectedPageNo = pageNo;
        this.pageChageListner();
        this.doPaging()
    }

    /**
     * Go to first page
     */
    firstPage() {
        this.selectedPageNo = 1;
        this.pageChageListner();
        this.doPaging()
    }

    /**
     * Go to last page
     */
    lastPage() {
        let totalPages = (this.totalItems / this.pageSize);
        let lastPage = (totalPages) - (totalPages % this.pageSize === 0 ? this.pageSize : totalPages % this.pageSize) + 1;
        this.selectedPageNo = this.totalSize;
        this.pageChageListner();
        this.doPaging()
    }

    /**
     * Go to next page
     */
    nextPage() {
        this.selectedPageNo = this.selectedPageNo + 1; //pageNo;
        this.pageChageListner();
        this.doPaging()
    }

    /**
     * Go to previous page
     */
    previousPage() {
        this.selectedPageNo = this.selectedPageNo - 1; //page > 0 ? page : 1;
        this.pageChageListner();
        this.doPaging();
    }

    // writeValue(value: string): void {
    //     if (!value && value != '0') return;
    //     this.setValue(value);
    // }
    //
    // setValue(currentValue: any) {
    //     this.selectedPageNo = currentValue;
    //     this.doPaging();
    // }

    /**
     * Page listener
     */
    pageChageListner() {
        this.pageChange.emit({
            currentPage: this.selectedPageNo
        })
    }
}