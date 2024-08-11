import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Event } from '../interfaces/events';
import { Observable, Observer } from 'rxjs';
import { Members } from '../interfaces/member';
import { RegisteredUserEvents } from '../interfaces/registeredUser';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesService {

  private apiurl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getListOfEventsObservable(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiurl}/events`);
  }

  getEventBasedOnIdObservable(id: number): Observable<Event> {

    return this.http.get<Event>(`${this.apiurl}/events/${id}`);
  }

  getListOfMembersObservable(): Observable<Members[]> {
    return this.http.get<Members[]>(`${this.apiurl}/members`);
  }

  getListOfBookingObservable(): Observable<RegisteredUserEvents[]> {
    return this.http.get<RegisteredUserEvents[]>(`${this.apiurl}/bookings`);
  }


  saveBookings(data: RegisteredUserEvents): Observable<RegisteredUserEvents> {
    console.log("in submit")
    console.log(data)

    return this.http.post<RegisteredUserEvents>(`${this.apiurl}/bookings`, data);
  }


  updateBookings(data: RegisteredUserEvents, id: string): Observable<RegisteredUserEvents> {
    return this.http.put<RegisteredUserEvents>(`${this.apiurl}/bookings/${id}`, data);
  }

  getBookingBasedOnIdObservable(id: string): Observable<RegisteredUserEvents> {
    return this.http.get<RegisteredUserEvents>(`${this.apiurl}/bookings/${id}`);
  }



}
