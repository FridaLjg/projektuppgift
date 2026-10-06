import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Courses } from './courses/courses';
import { Timetable } from './timetable/timetable';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'courses', component: Courses },
    { path: 'timetable', component: Timetable }
];
