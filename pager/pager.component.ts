import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface IPagerConfig {
  pageSize: number;
}

export interface IPagerPaginationParams {
  fromRow: number;
  pageSize: number;
}

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  @Input() config = {pageSize: 20};
  @Output() queryParamsChanged = new EventEmitter<IPagerPaginationParams>();

  private totalPages: number = 1;
  private fromRow = 0;
  private pageSize;
  private currentPage = 0;

  constructor() {
  }

  ngOnInit() {
    this.pageSize = this.config.pageSize;
  }

  onNextPage() {
    this.queryParamsChanged.emit(this.getPaginationParams());
  }

  onPreviousPage() {
    this.queryParamsChanged.emit(this.getPaginationParams());
  }

  private getPaginationParams(): IPagerPaginationParams {
    return {
      fromRow: this.fromRow,
      pageSize: this.pageSize
    };
  }

  private recalculatePaginationParams() {
  }
}
