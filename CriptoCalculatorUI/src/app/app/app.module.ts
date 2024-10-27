import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { CoinListComponent } from '../components/coin-list/coin-list.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    CoinListComponent 
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    MatDatepickerModule, 
    MatNativeDateModule ,
    MatFormFieldModule, 
    MatInputModule 
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync() // Add this line to provide HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
