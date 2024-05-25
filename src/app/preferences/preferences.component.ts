import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PreferenceService } from "../preference.service";
import { fetchUserAttributes } from 'aws-amplify/auth';



@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent {

  pop: boolean = false;
  rock: boolean = false;
  hiphop: boolean = false;
  electronic: boolean = false;
  preferenceService = inject(PreferenceService);
  email: any = '';

  async save(type: string = '') {
    let user = await fetchUserAttributes();
    console.log(user);
    this.email = user.email;
    let genres = [];
    if (type !== 'skip') {
      if (this.pop) {
        genres.push(this.pop);
      }
      if (this.rock) {
        genres.push(this.rock);
      }
      if (this.hiphop) {
        genres.push(this.hiphop);
      }
      if (this.electronic) {
        genres.push(this.electronic);
      }
    }
    let { errors, data } = await this.preferenceService.setPreferences({ email: this.email, genres: genres });
    if (errors) {
      console.log(errors);
    }
    if (data) {
      console.log(data);
    }
  }
}
