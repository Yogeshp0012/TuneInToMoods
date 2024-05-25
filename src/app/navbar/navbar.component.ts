import { Component,Input,OnChanges,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserService} from "../user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnChanges {

  @Input() signOut: any = null;
  @Input() user: any = null;
  showSnackBar: boolean = false;
  userService = inject(UserService);
  router = inject(Router);

  ngOnChanges(){
    if(this.user != null){
      this.router.navigateByUrl("/preferences");
    }
  }

  signOutUser(): void {
    this.showSnackBar = true;
    setTimeout(() => {
      this.signOut();
      this.showSnackBar = false;
    }, 1500);
  }
}
