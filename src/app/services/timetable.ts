import { Injectable, signal } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class TimetableService {
  courses = signal<Course[]>([]);

  addCourse(course: Course): void {
    this.courses.update(courses => [...courses, course]);
  }

  removeCourse(courseCode: string): void {
    this.courses.update(courses =>
      courses.filter(course => course.courseCode !== courseCode)
    );
  }
}
