import { Component, OnInit } from '@angular/core';
import { SyllabusService } from '../../services/syllabus.service';

@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.scss']
})
export class SyllabusComponent implements OnInit {
  constructor(private syllabusService: SyllabusService) {}

  ngOnInit(): void {
    this.syllabusService.getAll()
    .subscribe({
      next: (response) => {
        console.log(response)
      }, 
      error: (error) => {
        console.log(error)
      }
    })
  }

}
