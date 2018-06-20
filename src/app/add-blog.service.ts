import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Blog } from './models/blog';

@Injectable()
export class AddBlogService {
  postMe = function() {
    this.http.post(this.postUrl, this.hero).pipe(catchError(this.handleError('addHero', this.hero))
  );
  }

  constructor( private http : HttpClient ) { }

}
