import {Pipe, PipeTransform} from '@angular/core';

export interface PaginationInterface {
    pageSize: number
    currentPage: number
    totalItems: number
}

@Pipe({
    name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

    transform(collection: string, args: PaginationInterface): any {
        let start = (args.currentPage - 1) * args.pageSize,
            end = start + args.pageSize;

        let data = collection.slice(start, end);

        return data;
    }
}