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
  isValidDate: boolean = true; 

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

  onDateChange(event: any): void {
    const selectedDay = event.value.getDate(); // Obține ziua selectată

    // Verifică dacă ziua este 15
    this.isValidDate = selectedDay === 15;

    if (this.isValidDate) {
      const day = String(event.value.getDate()).padStart(2, '0'); // Obține ziua cu 2 cifre
      const month = String(event.value.getMonth() + 1).padStart(2, '0'); // Obține luna cu 2 cifre
      const year = event.value.getFullYear(); // Obține anul

      // Formatează data în formatul DD-MM-YYYY
      this.selectedDate = `${day}-${month}-${year}`;
    } else {
      this.selectedDate = null; // Resetează dacă data nu este validă
    }
  }
}
