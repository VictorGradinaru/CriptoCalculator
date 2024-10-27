import { Component, OnInit } from '@angular/core';
import { Coin, CoinService } from '../../services/coin.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.css']
})
export class CoinListComponent implements OnInit {
  coins: Coin[] = []; 
  selectedCoin: string = ''; 
  selectedCurrency: string = ''; 

  selectedDate: string | null = null; 
  simulatedAmount: string | null = null;
  montlyInvestmentAmount: number = 0;

  constructor(private coinService: CoinService) {}

  ngOnInit(): void {
    this.getCoins();
  }

  getCoins(): void {
    this.coinService.getCoinsList().subscribe(
      (data) => {
        this.coins = data; 
      },
      (error) => {
        console.error('Eroare la obținerea coinurilor', error);
      }
    );
  }

  onDateChange(event: any): void {
    const day = String(event.value.getDate()).padStart(2, '0'); 
    const month = String(event.value.getMonth() + 1).padStart(2, '0'); 
    const year = event.value.getFullYear(); 
    this.selectedDate = `${day}-${month}-${year}`;
}

  GetInvestmentDCA(): void {
    if (this.selectedCoin && this.selectedCurrency && this.selectedDate) {
      this.coinService.getInvestmentDcaByStartDate(this.selectedCoin, this.selectedCurrency, this.selectedDate, this.montlyInvestmentAmount)
        .subscribe(
          (retreiveValue) => {
            this.simulatedAmount = retreiveValue; 
          },
          (error) => {
            console.error('Eroare la obținerea istoricului prețului', error);
          }
        );
    } else {
      alert('Vă rugăm să selectați un coin, o monedă și o dată validă.');
    }
  }
}
