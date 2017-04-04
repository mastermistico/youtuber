import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { Youtube } from '../../providers/youtube';
import {AngularFireDatabase  , FirebaseListObservable} from 'angularfire2';
import { Observable }     from 'rxjs/Observable'; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Youtube]
})
export class HomePage {
  
  public rubius: FirebaseListObservable<any>;
  public german: FirebaseListObservable<any>;
  public next: any = ''
  constructor(public navCtrl: NavController,
  			      public youtube: Youtube,
               public alertCtrl: AlertController,
              public database: AngularFireDatabase ) {
     this.rubius = this.database.list('/rubius');
     this.german = this.database.list('/german');
     
  }

    ionViewDidLoad() {
       //this.german = 'hola'
    //this.getyoutuber()
  }

  getyoutuber(){

    //this.youtube.searchChannel('elrubiusOMG').subscribe(data => {
      this.youtube.searchChannel('JuegaGerman').subscribe(data => {

        console.log("Data : " , data);
        
        if(this.next === '' || this.next) { 
          // code...
           this.youtube.searchVideos(this.next,data.items[0].contentDetails.relatedPlaylists.uploads).subscribe(data => {
         

         let video: any = {
                       title: data.items[0].snippet.title,
                       votos: 0
                     }
          console.log(this.database.list('/german/videos'))           

         for (var i = 0; i < data.items.length; ++i) {
             this.database.list('/german/videos').push({
                       [data.items[i].snippet.resourceId.videoId]: 
                       //hola:
                         {title: data.items[i].snippet.title,
                          id:  data.items[i].snippet.resourceId.videoId,
                          image: data.items[i].snippet.thumbnails.high.url,
                          votos: 0 }
                     })
         }
         
         /*this.rubius.push({
              videos: video,
              numberVideos: data.pageInfo.totalResults
            });*/


              
         //console.log("Data2 : " , data);
         this.next = data.nextPageToken
         console.log("Data2 : " , data, this.next);
      })

        } else {
          console.log("LISTO")
        }
       
    }); 
    

    //this.createTask()
  }

   /*createTask(){
    let newTaskModal = this.alertCtrl.create({
      title: 'New Task',
      message: "Enter a title for your new task",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.rubius2.push({
              title: data.title,
              done: false
            });
            this.german.push({
              sex: true
            })
          }
        }
      ]
    });
    newTaskModal.present( newTaskModal );
  }*/
 

}
