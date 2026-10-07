import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course';


@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private url = 'https://matdah.github.io/DT208G---Programmering-i-TypeScript/Moment%205%20-%20Projekt/miun_courses.json';

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get<Course[]>(this.url);
  }
}
