import { Component, OnInit } from '@angular/core';
import { Coin, CoinService } from '../../services/coin.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {
  coins: Coin[] = []; 
  selectedCoin: string = ''; // Variabilă pentru a stoca coinul selectat

  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    this.getCoins();
  }

  getCoins(): void {
    this.coinService.getCoinsList().subscribe(
      (data) => {
        this.coins = data; // Populează lista de coinuri
      },
      (error) => {
        console.error('Eroare la obținerea coinurilor', error);
      }
    );
  }
}
