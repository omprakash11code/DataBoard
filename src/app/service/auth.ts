
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface DataItem {
  id?: number;
  FullName: string;
  Enrolment: string;
  program: string;
   date: string; // ISO date string
  remarks: string;
}




@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseServiceUrl = 'https://localhost:44389/api/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Register a new user
  registerUser(user: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.baseServiceUrl}user/Register`,
      user,
      this.httpOptions
    );
  }

  // Log in user
  loginUser(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseServiceUrl}user/LoginUser`,
      credentials,
      this.httpOptions
    );
  }

  // Data methods

  getAllData(): Observable<DataItem[]> {
    return this.http.get<DataItem[]>(`${this.baseServiceUrl}data`);
  }

  getDataById(id: number): Observable<DataItem> {
    return this.http.get<DataItem>(`${this.baseServiceUrl}data/${id}`);
  }

  createData(data: DataItem): Observable<DataItem> {
    return this.http.post<DataItem>(`${this.baseServiceUrl}data`, data, this.httpOptions);
  }

  updateData(id: number, data: DataItem): Observable<void> {
    return this.http.put<void>(
      `${this.baseServiceUrl}data/${id}`,
      data,
      this.httpOptions
    );
  }

  deleteData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseServiceUrl}data/${id}`);
  }
}