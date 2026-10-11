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
  selectSubject = signal('');
  sortColumn = signal('');

  subjects = computed(() => {
    return [...new Set(this.courses().map(course => course.subject))];
  });

  filteredCourses = computed(() => {
    const search = this.searchTerm().toLowerCase();
    const subject = this.selectSubject();
    const column = this.sortColumn();

    const filtered = this.courses().filter(course =>
      (
        course.courseName.toLowerCase().includes(search) ||
        course.courseCode.toLowerCase().includes(search)
      ) &&
      (subject === '' || course.subject === subject)
    );

    if (column) {
      filtered.sort((a, b) => {
        const valueA = a[column as keyof Course];
        const valueB = b[column as keyof Course];

        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return valueA - valueB;
        }

        return String(valueA).localeCompare(String(valueB));
      });
    }

    return filtered;
  });

  constructor(private courseService: CourseService,
    public timetableService: TimetableService
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

  sortCourses(column: string): void {
    this.sortColumn.set(column);
  }

}
