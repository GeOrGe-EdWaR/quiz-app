import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../interfaces/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private url = 'student';

  constructor(private http: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  getAllStudentsWithoutGroup(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url + '/without-group');

  }

  // getStudentById(id: string): Observable<Student> {
  //   return this.http.get<Student>(this.url + '/' + id);
  // }
  deleteStudent(id: string): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id);
  }
}
