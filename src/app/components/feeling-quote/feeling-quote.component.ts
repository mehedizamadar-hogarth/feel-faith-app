import { Component } from '@angular/core';
import { GroqService } from '../../services/groq.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-feeling-quote',
  templateUrl: './feeling-quote.component.html',
  styleUrls: ['./feeling-quote.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FeelingQuoteComponent {
  feeling: string = '';
  quote: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private groqService: GroqService) {}

  getQuote() {
    if (!this.feeling.trim()) {
      this.error = 'Please enter how you are feeling';
      return;
    }

    this.loading = true;
    this.error = '';
    this.quote = '';

    this.groqService.getIslamicQuote(this.feeling).subscribe({
      next: (response) => {
        this.quote = response.choices[0].message.content;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to get quote. Please try again.';
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }
} 