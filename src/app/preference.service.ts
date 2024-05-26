import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '../../amplify/data/resource';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {
  client: any = null;

  constructor() {
    this.client = generateClient<Schema>();
  }

  async setPreferences(data: any) {
    return await this.client.models.Preferences.create({
      email: data.email,
      genres: data.genres,
    });
  }

  async getPreferences(data: any) {
    return await this.client.models.Preferences.list({ email: data.email });
  }
}
