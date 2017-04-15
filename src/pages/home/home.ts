import { Component } from '@angular/core';
import { NavController,AlertController,ToastController  } from 'ionic-angular';
import { Youtube } from '../../providers/youtube';
import {AngularFireDatabase  , FirebaseListObservable} from 'angularfire2';
import { Observable }     from 'rxjs/Observable'; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Youtube]
})
export class HomePage {
  
  public rubius: any;
  public flipped: boolean = false;
  public german: any;
  public next: any = ''
  public num: any;
  constructor(public navCtrl: NavController,
  			      public youtube: Youtube,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public database: AngularFireDatabase ) {
     //this.rubius = this.database.list('/rubius/');
     //this.german = this.database.list('/german/videos/');
     
  }

    ionViewDidLoad() {

    this.database.list('/rubius/videos/').subscribe(data => {
          this.num = data
          console.log(this.num.length);
    })

    this.database.list('/german/videos/').subscribe(data => {
          this.num = data
          console.log(this.num.length);
    })

    this.uploadVideos()
  }

  uploadVideos(){
    this.getVideos("rubius").subscribe(data => {
        this.rubius = data[this.randomVideo(data.length,1)]
        console.log(this.rubius)
        /*console.log(this.randomVideo(this.rubius.length,1))
        console.log(this.rubius[this.randomVideo(this.rubius.length,1)])
        */
     })

    this.getVideos("german").subscribe(data => {
      this.german = data[this.randomVideo(data.length,1)]
    })

  }

  getVideos(youtuber: string) {

    return  this.database.list(youtuber + '/videos/')

  }

  voteYoutuber(youtuber: string,key: string, votos: number){
      this.flipped = !this.flipped;
      console.log(youtuber,key)
      this.presentToast(youtuber)
      votos++
      /*this.getVideos(youtuber).update(key, {
        votos: votos
      })*/

      this.uploadVideos()
      
  }

   presentToast(youtuber: string) {
    let toast = this.toastCtrl.create({
      message: '+1 votaste por el video de ' + youtuber ,
      duration: 4000,
      position: 'top'
    });
    toast.present();
  }

  randomVideo(max:any,min:any) {
     let num: any;
     num = Math.floor(Math.random() * (max - min + 1)) + min;
     return num
  }

  getyoutuber(){

    //this.youtube.searchChannel('elrubiusOMG').subscribe(data => {
     // this.youtube.searchChannel('JuegaGerman').subscribe(data => {
     this.youtube.searchChannel('HolaSoyGerman').subscribe(data => {  

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
                       //[data.items[i].snippet.resourceId.videoId]: 
                       //hola:
                          title: data.items[i].snippet.title,
                          id:  data.items[i].snippet.resourceId.videoId,
                          image: data.items[i].snippet.thumbnails.high.url,
                          votos: 0 
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
