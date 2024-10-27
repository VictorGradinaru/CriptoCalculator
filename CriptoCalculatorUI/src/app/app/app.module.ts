import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { CoinListComponent } from '../components/coin-list/coin-list.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CoinListComponent 
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [
    provideHttpClient() // Add this line to provide HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
