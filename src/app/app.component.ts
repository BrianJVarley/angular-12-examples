import { Component } from '@angular/core';
import { BackendApiService } from './services/backend-api.service';
import { MyLibService } from 'my-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-tour-of-heroes';

  constructor(private myLibService: MyLibService, private beckService: BackendApiService) {
    // testing lib service    
    this.myLibService.doSomething();

    // testing proxy.conf
    const result = this.beckService.getHeroes();
  }
}
