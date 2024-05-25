import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import {UserService} from "./user.service";

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),UserService]
};
