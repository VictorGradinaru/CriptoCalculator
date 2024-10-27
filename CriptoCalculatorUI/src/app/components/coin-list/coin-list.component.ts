import { Component, OnInit } from '@angular/core';
import { Coin, CoinService } from '../../services/coin.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {
  coins: Coin[] = []; 
  coinsText: string = ''; 

  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    this.loadCoins();
  }

  loadCoins(): void {
    this.coinService.getCoinsList().subscribe(
      (data: Coin[]) => {
        this.coins = data;
        this.coinsText = this.coins.map(coin => `${coin.name} (${coin.symbol})`).join('\n');
      },
      (error: any) => {
        console.error('Error fetching coin list:', error);
      }
    );
  }
}
