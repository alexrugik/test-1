import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntryService, IEntry } from 'src/app/test1/entry.service';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeWhile
} from 'rxjs/operators';


@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component implements OnInit, OnDestroy {

  public searchedText$ = new Subject<string>();
  public searchedText: string;
  public entries$: Observable<IEntry[]>;
  public emptyArray = new Array(1000);
  private componentDestroyed = false;

  constructor(private readonly entryService: EntryService) {
  }

  ngOnInit() {
    this
      .setEntries()
      .setListeners();
  }

  ngOnDestroy() {
    this.componentDestroyed = true;
  }

  searchCallback(entry: IEntry, text: string) {
    const fullText: string = entry.name + entry.description + entry.status;
    const separatedTextBySpace = text.trim().split(' ');
    // if i understand requirements right, else  we can change to every, but i did not test it :)
    return separatedTextBySpace.some((str: string) => fullText.includes(str));
  }

  trackEntry(index, entry: IEntry) {
    return entry.id;
  }

  private setEntries() {
    this.entries$ = this.entryService.getEntries(null);
    return this;
  }

  private setListeners() {
    this.searchedText$
      .asObservable()
      .pipe(
        takeWhile(() => this.componentDestroyed === false),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(
        (searchedTest: string) => {
          this.searchedText = searchedTest;
        }
      );
  }
}
