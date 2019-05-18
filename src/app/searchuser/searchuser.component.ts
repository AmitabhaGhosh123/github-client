import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.component.html',
  styleUrls: ['./searchuser.component.scss']
})
export class SearchuserComponent implements OnInit {

  currentUser;
  userDetails;
  userRepos;
  userFollowers;
  userFollowing;
  repoDemo;
  userGists;
  gistTemp;
  contributionChart;

  constructor(private route: ActivatedRoute, private http: ApiService) { }

  ngOnInit() {

    // get the parameter from URL
    this.route.params.subscribe(routeParams => {

      this.currentUser = routeParams.user;
      this.getUser();
      this.getRepo();
      this.getGist();
      
    });
  }
//get user data
  getUser() {

    this.contributionChart = `https://ghchart.rshah.org/409ba5/${
      this.currentUser
    }`;

    this.http.getUser(this.currentUser).subscribe(

      data => {

        this.userDetails = data;
      },

      error => {

        console.log(error);
      }
    );
  }
// get repos

getRepo() {

  this.http.getRepo(this.currentUser).subscribe(

    data => {

      this.repoDemo = data;
      this.userRepos = this.repoDemo.slice(0,5);
    },

    error => {

      console.log(error);
    }

  );
}
  
//get followers

getFollower() {

  this.http.getFollowers(this.currentUser).subscribe(

    data => {

      this.userFollowers = data;
    },

    error => {

      console.log(error);
    }
  );
}

// get gists

getGist() {

  this.http.getGist(this.currentUser).subscribe(

    data => {

      this.gistTemp = data;
      this.userGists = this.gistTemp.slice(0,5);
    },

    error => {

      console.log(error);
    }
  );
}

// pagination

pageChanged(event: PageChangedEvent): void {

  const startItem = (event.page - 1) * event.itemsPerPage;
  const endItem = event.page * event.itemsPerPage;
  this.userRepos = this.repoDemo.slice(startItem,endItem);
}

gistChanged(event: PageChangedEvent): void {

  const startItem = (event.page - 1) * event.itemsPerPage;
  const endItem = event.page * event.itemsPerPage;
  this.userGists = this.gistTemp.slice(startItem,endItem); 
}

}