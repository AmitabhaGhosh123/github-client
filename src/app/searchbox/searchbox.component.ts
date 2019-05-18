import { Component, OnInit } from '@angular/core';
import { CompleterService, RemoteData } from 'ng2-completer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {

  searchstr: string;
  dataservice: RemoteData;

  constructor(public completerservice: CompleterService, private router: Router) { 

    this.dataservice = completerservice.remote(null,'login','login');
    this.dataservice.urlFormater((term: any) => {
      return `https://api.github.com/search/users?q=${name}&per_page=10`;
    });

    this.dataservice.dataField('items');
  }

  ngOnInit() {}
    search() {

      if (this.searchstr === '' || this.searchstr.length < 2) {
        alert('Enter More than 3 characters');
      } else {
        this.router.navigate(['/search', this.searchstr]);
      }
    }
    
  }