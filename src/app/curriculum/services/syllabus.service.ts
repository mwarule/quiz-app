import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as SYLLABUS from './../../../assets/data/syllabus.json'

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {

  constructor() { }

  getAll(): Observable<any> {
    return of(SYLLABUS);
  }
}
