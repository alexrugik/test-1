import { Injectable } from '@angular/core';
import * as randomWords from 'random-words';
import { HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface IEntry {
  id: number;
  name: string;
  description: string;
  status: string;
}

@Injectable()
export class EntryService {
  private static id = 0;
  private readonly totalCount = 10000 / 20;
  private entries: IEntry[] = [];

  getEntries(params: HttpParams): Observable<IEntry[]> {
    this.entries = [...this.entries, ...this.getGeneratedEntriesPage()];
    return of(this.entries);
  }


  private getGeneratedEntriesPage(): IEntry[] {
    return new Array(20)
      .fill(null)
      .map(item => this.getGeneratedEntry());
  }

  private getGeneratedEntry(): IEntry {
    return {
      id: EntryService.id++,
      name: randomWords({exactly: 3, join: ' '}),
      description: randomWords({exactly: 100, join: ' '}),
      status: ['new', 'submitted', 'failed'][Math.floor(Math.random() * 3)]
    };
  }
}
