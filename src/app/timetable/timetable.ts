import { Component } from '@angular/core';
import { TimetableService } from '../services/timetable';

@Component({
  selector: 'app-timetable',
  imports: [],
  templateUrl: './timetable.html',
  styleUrl: './timetable.css',
})
export class Timetable {
  constructor(public timetableService: TimetableService) {}
}
