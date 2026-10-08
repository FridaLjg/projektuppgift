import { Injectable, signal, computed } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class TimetableService {
  courses = signal<Course[]>([]);

  totalPoints = computed(() =>
    this.courses().reduce((sum, course) => sum + course.points, 0)
  );

  constructor() {
    const savedCourses = localStorage.getItem('timetable');

    if (savedCourses) {
      this.courses.set(JSON.parse(savedCourses));
    }
  }

  addCourse(course: Course): void {

    //Kurser kan inte läggas till dubbelt
    const exists = this.courses().some(
      c => c.courseCode === course.courseCode
    );

    if (!exists) {
      this.courses.update(courses => [...courses, course]);

      //Spara till localStorage
      localStorage.setItem(
        'timetable',
        JSON.stringify(this.courses())
      );
    }
  }

  removeCourse(courseCode: string): void {
    this.courses.update(courses =>
      courses.filter(course => course.courseCode !== courseCode)
    );

    localStorage.setItem(
      'timetable',
      JSON.stringify(this.courses())
    );
  }
}
