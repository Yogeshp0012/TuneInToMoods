import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PreferenceService } from '../preference.service';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { RouterModule, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [FormsModule, RouterModule, RouterOutlet],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css',
})
export class PreferencesComponent {
  pop: boolean = false;
  rock: boolean = false;
  hiphop: boolean = false;
  electronic: boolean = false;
  preferenceService = inject(PreferenceService);
  router = inject(Router);
  email: any = '';

  async save(type: string = '') {
    let user = await fetchUserAttributes();
    console.log(user);
    this.email = user.email;
    let genres = [];
    if (type !== 'skip') {
      if (this.pop) {
        genres.push('POP');
      }
      if (this.rock) {
        genres.push('ROCK');
      }
      if (this.hiphop) {
        genres.push('HIPHOP');
      }
      if (this.electronic) {
        genres.push('ELECTRONIC');
      }
    }
    let { errors, data } = await this.preferenceService.setPreferences({
      email: this.email,
      genres: genres,
    });
    if (errors) {
      console.log(errors);
    }
    if (data) {
      this.router.navigateByUrl('/');
    }
  }
}
