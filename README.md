Librerie utilizzate:
-Bootstrap
-Angular Material

Test in locale:
- npm i
- ng build
- ng serve

SIGN IN/ SIGN UP
NB: E' un meccanismo che simula login/sign up, i dati non sono protetti ed è tutto gestito tramite un semplice scambio di dati con il realtime databse di firebase.
La maggior parte delle funzionalità del sito sono collegate a un token generato in fase di creazione dell'account, una volta fatto l'accesso quest'ultimo verrà restituito dal database e salvato tramite localStorage. Tutte le funzionalità (Dashboard, account, carrello ecc.) funzionano in base all'esistenza e al valore di quest'ultimo.

# ECommerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
