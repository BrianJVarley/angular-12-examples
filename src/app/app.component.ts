import { Component } from '@angular/core';
import { BackendApiService } from './services/backend-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-tour-of-heroes';

  constructor(private beckService: BackendApiService) {
    // testing proxy.conf
    const result = this.beckService.getHeroes();
  }
}
