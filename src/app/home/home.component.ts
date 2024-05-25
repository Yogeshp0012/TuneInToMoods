import { Component,OnInit,inject } from '@angular/core';
import {UserService} from "../user.service";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userService = inject(UserService);
  username: any = '';
  loading: boolean = true;

  async ngOnInit(){
    let data = await fetchUserAttributes();
    this.username = data.preferred_username;
    this.loading=false;
  }

}
