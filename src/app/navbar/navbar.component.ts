import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PreferenceService } from '../preference.service';
import { fetchUserAttributes } from 'aws-amplify/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnChanges {
  @Input() signOut: any = null;
  @Input() user: any = null;
  showSnackBar: boolean = false;
  userService = inject(UserService);
  router = inject(Router);
  document = inject(DOCUMENT);
  preferenceService = inject(PreferenceService);

  async ngOnChanges() {
    let userData = await fetchUserAttributes();
    if (userData.email) {
      const { errors, data } = await this.preferenceService.getPreferences({
        email: userData.email,
      });
      if (!data) {
        this.router.navigateByUrl('/preferences');
      } else {
        this.router.navigateByUrl('/');
      }
    }
  }

  signOutUser(): void {
    this.showSnackBar = true;
    setTimeout(() => {
      this.signOut();
      this.showSnackBar = false;
    }, 1500);
  }

  openMobileMenu() {
    let element = document.getElementById('mobile');
    if (element && element !== undefined) {
      element.classList.remove('hidden');
    }
  }

  closeMobileMenu() {
    let element = document.getElementById('mobile');
    if (element && element !== undefined) {
      element.classList.add('hidden');
    }
  }
}
