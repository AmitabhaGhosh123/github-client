import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile;
  user;
  repos;
  events;
  userId: string;
  followers;
  following;
  gists;
  repoDemo;
  gistTemp;
  contributionChart;

  constructor(public auth: AuthService, private http: ApiService) { }

  ngOnInit() {

    if(this.auth.userProfile){

      this.profile = this.auth.userProfile;
      this.userId = this.profile.nickname;
      this.http.getUser(this.userId).subscribe(

        data => {

          this.user = data;
          this.getDetails();
        },

        error => {

          console.log(error);
        }
      );
    }

    else {

      this.auth.getProfile((err, profile) => {

        this.profile = profile;
        this.userId = this.profile.nickname;
        this.http.getUser(this.userId).subscribe(

          data => {

            this.user = data;
            this.getDetails();
          },

          error => {

            console.log(error);
          }
        );
      });
    }
  }
  getDetails() {

    this.contributionChart = `https://ghchart.rshah.org/409ba5/${
      this.user.login
    }`;

    this.getFollowers();
    this.getFollowing();
    this.getRepo();
    this.getGist();
  }

  //get gists

  getGist() {

    this.http.getGist(this.userId).subscribe(

      data => {

        this.gistTemp = data;
        this.gists = this.gistTemp.slice(0,10);
      },

      error => {

        console.log(error);
      }
    );
  }

  // get events
  
  getEvents() {

    this.http.getEvents(this.userId).subscribe(

      data => {

        this.events = data;
      },

      error => {

        console.log(error);
      }
    );
  }

  // get repos

  getRepo() {

    this.http.getRepo(this.userId).subscribe(
      data => {

        this.repoDemo = data;
        this.repos = this.repoDemo.slice(0,10);
      },

      error => {

        console.log(error);
      }
    );
  }

  // get following
  
  getFollowing() {

    this.http.getFollowing(this.userId).subscribe(

      data => {

        this.following = data;
      },

      error => {

        console.log(error);
      }
    );
  }

  // get followers

  getFollowers() {

    this.http.getFollowers(this.userId).subscribe(

      data => {

        this.followers = data;
      },

      error => {

        console.log(error);
      }
    );
  }
  
}