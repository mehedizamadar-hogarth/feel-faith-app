import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroqService {
  private apiKey = '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';
  private apiUrl = 'https://api.groq.com/openai/v1/chat/completions';

  constructor(private http: HttpClient) { }

  getIslamicQuote(feeling: string): Observable<any> {
    const prompt = `For someone feeling "${feeling}", provide relevant quotes from the Quran or Hadith. Format your response as follows:
1. The quote in English, with proper citation:
   - For Quran quotes: Use the exact translation from quran.com, citing as "Qur'an - Surah [Name] ([chapter]:[verse])" with a link to quran.com/[chapter]/[verse]
   - For Hadith quotes: Include hadith name and number
2. A brief explanation of how this quote relates to their feeling
Keep the response concise and focused on the quote and its relevance.`;

    const requestBody = {
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    };

    return this.http.post(this.apiUrl, requestBody, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }
} 