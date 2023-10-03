import { Injectable } from '@angular/core';
import Clerk from '@clerk/clerk-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClerkService {
  clerk!: Clerk;
  constructor() { }

  load(): Promise<any> {
    const clerk = new Clerk(environment.clearAPIKey);
    return new Promise(async (resolve, reject) => {
      await clerk.load()
      .then(r => {
        console.log('clerk initialized');
        this.clerk = clerk;
        resolve(true);
      })
      .catch(error => {
        console.log('error while initializing clerk');
        reject(error);
        console.log(error);
      })
    });
  }
}
