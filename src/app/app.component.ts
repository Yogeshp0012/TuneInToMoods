import { Component } from '@angular/core';
import { RouterModule} from '@angular/router';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from '@angular/common';


Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterModule,AmplifyAuthenticatorModule,NavbarComponent,CommonModule],
})
export class AppComponent {
  title = 'TuneInToMoods';
  user: any;


constructor(public authenticator: AuthenticatorService) {
  Amplify.configure(outputs);
}
}
