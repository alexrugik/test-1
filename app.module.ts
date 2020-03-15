import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Test1Component } from './test1/test1.component';
import { TextFilterPipe } from 'src/app/test1/text-filter.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EntryService } from 'src/app/test1/entry.service';
import { PagerComponent } from './pager/pager.component';

@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    TextFilterPipe,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    EntryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
