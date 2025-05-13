import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideKeycloak } from './app/keycloak.provider';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    ...provideKeycloak(),
    provideHttpClient(withInterceptors([AuthInterceptor]))
  ]
});
