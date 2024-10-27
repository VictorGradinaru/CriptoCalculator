import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Coin {
  id: string;
  symbol: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  private baseUrl = 'https://localhost:7081/api/Coins';

  constructor(private http: HttpClient) {}

  getCoinsList(): Observable<Coin[]> {
    return this.http.get<Coin[]>(`${this.baseUrl}/GetCoinsList`);
  }

  getCoinPriceHistoryOnDate(name: string, currency: string, date: string): Observable<string> {
    const url = `${this.baseUrl}/GetCoinPriceHistoryOnDate`;

    let params = new HttpParams()
      .set('name', name)
      .set('currency', currency)
      .set('date', date);

    
    return this.http.get<{ price: number }>(url, { params }).pipe(
      map(response => response.price.toString())
    );
  }
}
