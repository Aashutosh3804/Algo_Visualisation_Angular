import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VisualComponent } from './visual/visual.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeapComponent } from './heap/heap.component';
import { GraphComponent } from './graph/graph.component';
import { ToposortComponent } from './toposort/toposort.component';

@NgModule({
  declarations: [
    AppComponent,
    VisualComponent,
    HeapComponent,
    GraphComponent,
    ToposortComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
