import { Component, signal, computed } from '@angular/core';
import { CourseService } from '../services/courses';
import { Course } from '../models/course';

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

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses.set(data);
    });
  }
}
