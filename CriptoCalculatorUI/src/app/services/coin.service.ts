import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Coin {
  id: string;
  symbol: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  private apiUrl = 'https://localhost:7081/api/Coins/GetCoinsList'; // URL-ul API-ului

  constructor(private http: HttpClient) {}

  getCoinsList(): Observable<Coin[]> {
    return this.http.get<Coin[]>(this.apiUrl); // Facem un GET la API
  }
}
