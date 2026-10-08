import { Component, signal, computed } from '@angular/core';
import { CourseService } from '../services/courses';
import { Course } from '../models/course';
import { TimetableService } from '../services/timetable';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})

export class Courses {

  courses = signal<Course[]>([]);
  searchTerm = signal('');

  filteredCourses = computed(() => {
    const search = this.searchTerm().toLowerCase();

    return this.courses().filter(course =>
      course.courseName.toLowerCase().includes(search)
    );
  });

  constructor(private courseService: CourseService,
    private timetableService: TimetableService
  ) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses.set(data);
    });
  }

  //Lägg till kurs till ramschema
  addToTimetable(course: Course): void {
    this.timetableService.addCourse(course);
  }
}
