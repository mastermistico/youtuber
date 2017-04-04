import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable }     from 'rxjs/Observable'; 

/*
  Generated class for the Youtube provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Youtube {
   
  url: string = 'https://www.googleapis.com/youtube/v3/'
  //channels?key=AIzaSyDsGZDPI461UR5JvTysAqv7PW7HSzj50KU' 
  key: string = 'AIzaSyDsGZDPI461UR5JvTysAqv7PW7HSzj50KU' 
  videos: any[]
  constructor(public http: Http) {
    console.log('Hello Youtube Provider');
  }

  searchChannel(channels_name): Observable<any>{
  	return Observable.create(observable => {
  		this.http.get(this.url + 'channels' 
                             + '?key=' + this.key 
                             + '&part=contentDetails&forUsername=' + channels_name 
                                ).subscribe(
  			data => {
  				//let result: any;
          		observable.next(data.json());
          		//observable.next(this.videos)
          		observable.complete();
        	},
        	error => {
          		console.log("Error : " + error);
          		observable.error(error);
        	}
      	)
  	})
  }

  searchVideos(s,playlistId): Observable<any>{
  	return Observable.create(observable => {
  		this.http.get(this.url + 'playlistItems' 
                             + '?key=' + this.key 
  							             + '&part=snippet&playlistId=' + playlistId 
                             + '&pageToken=' + s
                             + '&maxResults=50').subscribe(
  			data => {
          		observable.next(data.json());     
          		observable.complete();
        	},
        	error => {
          		console.log("Error : " + error);
          		observable.error(error);
        	}
      	)
  	})
  }

  getVideos(playlistId){

  	return this.searchVideos('',playlistId).subscribe(data =>{
  		this.videos = data;
  	})


  }

}
