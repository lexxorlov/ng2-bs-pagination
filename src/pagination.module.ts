import {CommonModule} from "@angular/common";
import {PaginationPipe} from "./pagination.pipe";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "./pagination.component";
import {NgModule} from "@angular/core";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PaginationComponent,
        PaginationPipe
    ],
    exports: [
        PaginationComponent,
        PaginationPipe
    ],
    providers: []
})
export class PaginationModule {
}