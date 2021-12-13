import { Injectable } from '@angular/core';
import concat from 'lodash.concat';

@Injectable({ providedIn: 'root' })
export class MyLibService {
  doSomethings() {
    // Make sure tree shaking won't remove the lib during the build
    console.log(concat([1], 2, 4, 5));
    console.log('change 1 in my-libs');
  }
}
