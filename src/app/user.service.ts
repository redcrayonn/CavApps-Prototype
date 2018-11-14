import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = 'https://api.7cav.us/v1';
  API_AUTH_HEADER = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM5NTJkNTIyOGI1Zjk1YzA5ZWM3Zjk3Y2FmYTllODI4ZThkNDY5YzdmNDIwNTdhZGU2OTI4ZDhlODJjNWVmNzA5OWJjYjk3NDdjYTM0MzE4In0.eyJhdWQiOiIzIiwianRpIjoiYzk1MmQ1MjI4YjVmOTVjMDllYzdmOTdjYWZhOWU4MjhlOGQ0NjljN2Y0MjA1N2FkZTY5MjhkOGU4MmM1ZWY3MDk5YmNiOTc0N2NhMzQzMTgiLCJpYXQiOjE1Mjc2MTcxODksIm5iZiI6MTUyNzYxNzE4OSwiZXhwIjoxNTU5MTUzMTg5LCJzdWIiOiIzIiwic2NvcGVzIjpbInVzZXJzIiwibWlscGFjcyIsInJlY29yZHMiXX0.JwGAKHxRUcvFMsnp7LNGKC22GF03RfHXd9j2paqbH-evyMBk2gJ4a3omLDuaY1VjmAU6P3ZbsT4Wy7HdBafqJ0ThdyH9xW1COHBtnjwFOCv0sUHfmxTaQPyLSKYwHJkmwhKM-GgqdWTSpZ4KwSoyWMXAZUHzot6DQkUfmPk0q5I1zDIo5ADAJlZbKUNvsZxEpqw8VJseWcSsKSCjzT1TGQmJtmXOO_NheC5oyBRU4eF5zzyStmDi7Z7dal01cvAMt07wFtfaBwLfJXPahiaCilcZK5SpIsmkAPp5qd47OiIBguYPRMdJZn8Fv_zwkkPevGRo_gmMNZNHv15Q-GE4PjeWLl4pPluqGwb3f7rlUd2sRPIDbDnHzjuauA5FlGd6GuFVfqiSqpMcj4decwBFthIbj4iiWyzUNyo-m8dp7_SxJSHnZ_a4ldFgX8hAmhkAHhkS7dz283wDTrkiy-TU-gLQ3JD75EH23mrtb7cmHKFuujIu8S6mgnGOCFcgafk8wevCWdd7FYi1UdIjd5SD5icTm-22SOyuXJ7E2n4hsbM2eNNGwiIsB4EoahN6DVWetK880xycBRMrpRHMFBikXO-AAxDNs9GArj2oN5FUOhuF_KUVuVXivmH4pdLFU38_YIAMMYKIRDTIgz6iFSF5ppfIm--QfahaQPJqatt6yfQ'

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.API_AUTH_HEADER });
  options = { headers: this.headers };

  constructor(private http: HttpClient) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('username:password'));
  }

    getAll(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.API_AUTH_HEADER });
    const options = { headers: headers };
    return this.http.get<UserResult>(this.API_URL + '/users/active', options).pipe(map(r => r.data.users));
  }
}

export class User {
  join_date: string;
  promotion_date: string;
  user_id: number;
  username: string;
}

export class UserResult {
  data: UserResultDeeper;
}

export class UserResultDeeper {
 users: User[];
}
