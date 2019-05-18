import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://api.github.com/users';

  constructor(private http:HttpClient) { }
 
  // Get User Data
  getUser(name: string) {
    return this.http.get(`${this.url}/${name}`);
  }
  // Get user's followers
  getFollowers(name: string) {
    return this.http.get(`${this.url}/${name}/followers`);
  }
  // Get user's following
  getFollowing(name: string) {
    return this.http.get(`${this.url}/${name}/following`);
  }
  // Get user's gists
  getGist(name: string) {
    return this.http.get(`${this.url}/${name}/gists`);
  }
  // Get user's Starred
  getStarred(name: string) {
    return this.http.get(`${this.url}/${name}/starred`);
  }
  // Get user's events
  getEvents(name: string) {
    return this.http.get(`${this.url}/${name}/events`);
  }
  // Get user's repo
  getRepo(name: string) {
    return this.http.get(`${this.url}/${name}/repos`);
  }
  // get user list
  searchUser(name: string) {
    return this.http.get(
      `https://api.github.com/search/users?q=${name}&per_page=10`
    );
  }
}