import { APP_INITIALIZER, Provider } from '@angular/core';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8081',
        realm: 'unifor',
        clientId: 'unifor',
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      }
    });
}

export function provideKeycloak(): Provider[] {
  return [
    KeycloakAngularModule,
    KeycloakService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    }
  ];
}
