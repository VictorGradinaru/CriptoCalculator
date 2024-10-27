import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { CoinListComponent } from '../components/coin-list/coin-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CoinListComponent 
  ],
  imports: [
    BrowserModule,
    CommonModule // Adaugă CommonModule aici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
