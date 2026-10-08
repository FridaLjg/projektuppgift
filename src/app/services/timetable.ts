import { Injectable, signal } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class Timetable {
  courses = signal<Course[]>([]);

  addCourse(course: Course): void {
    this.courses.update(courses => [...courses, course]);
  }
}
