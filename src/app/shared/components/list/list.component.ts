import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { ListColumn } from '../../interfaces/list-column';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @Output() handleViewEvent = new EventEmitter();
  @Output() handleEditEvent = new EventEmitter();
  @Output() handleDeleteEvent = new EventEmitter();
  @Output() handlePageEvent = new EventEmitter();

  @Input() headers: ListColumn[] = [];
  @Input() data: any[] = [];

  @Input() length: number = 0;
  @Input() pageNumber: number = 0;
  @Input() pageSize: number = 10;
  @Input() showFirstLastButtons: boolean = false;
  @Input() showPageSizeOptions: boolean = false;
  @Input() pageSizeOptions: number[] = [5, 10, 25];
  @Input() hidePageSize = true;
  @Input() disabled = false;

  imageUrl: string = 'https://upskilling-egypt.com:3003/';

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = [];

  constructor(public _MatPaginatorIntl: MatPaginatorIntl) {}

  ngOnInit(): void {
    this.displayedColumns = this.headers.map((header) => header.datafield);
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  view(row: any): void {
    this.handleViewEvent.emit(row);
  }

  edit(row: any): void {
    this.handleEditEvent.emit(row);
  }

  delete(id: number): void {
    this.handleDeleteEvent.emit(id);
  }

  handlePaginate(e: any): void {
    this.handlePageEvent.emit(e);
  }

  handlePaginationSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.pageNumber = 0;

    this.handlePageEvent.emit({
      pageSize: pageSize,
      pageNumber: this.pageNumber,
    });
  }

  // onSort(sortState: Sort) {
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }
}