import { Component, OnInit, OnChanges, Input, OnDestroy } from '@angular/core';
import { StorageService } from '../storage.service';				
import { Router } from '@angular/router'; //routing	
import { Location } from '@angular/common';

export interface hiScores {
  name: string;
  score: number;
}

export class hiscoresData {
  name: string;
  score: number;

  constructor(name : string, score:number){				
    this.name = name;
    this.score = score
  }
}

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.scss']
})
export class HighScores implements OnInit, OnDestroy {

  constructor(
    private _router: Router, 
    private _scores: StorageService,
    private _player: StorageService,
    private _mail: StorageService,
    private _location: Location
  ) { }  // storage servis 

  @Input() playerMail: string = ''; // test_player_mail/token
  @Input() playerName: string = ''; 

  private _data: Array<hiScores> = [];
  public data10displayed: Array<hiscoresData> = [];

  public onlyMyScoresDisplay: boolean = true;
  public displayAscendingScores: boolean = false; 

  public goBack() {	
    this._location.back();	
  }	

  public onlyMyScoresButton(){
    this.onlyMyScoresDisplay = !this.onlyMyScoresDisplay;
    this.getScores();
  };

  public funcMyScoresDisplay(){
    if(this.onlyMyScoresDisplay === true){

      let filteredArray = this.data10displayed.filter((item) => item.name == this.playerName);
      this.data10displayed = filteredArray;// items = items.sort(function(a,b) { return a.score - b.score });
    }
    if(this.onlyMyScoresDisplay === false){
      
      this.data10displayed = this._data.slice(0); // to take values
      if(this.displayAscendingScores === false){this.sortDescending()} else {this.sortAscending()};
    }
  }

  public sortDescending(){
    this.displayAscendingScores = false;
    this.data10displayed = this.data10displayed.sort(function(a,b) { return b.score - a.score }); 
  };

  public sortAscending(){
    this.displayAscendingScores = true;
    this.data10displayed = this.data10displayed.sort(function(a,b) { return a.score - b.score })
  };

  public getScores(){

    this._scores.load().subscribe((result) => {  // from storage service <--
     
      this._data = result;
      console.log(result);
      this.data10displayed = this._data.slice(0); // to take values
      this.funcMyScoresDisplay();

      if(this.displayAscendingScores === false){
        this.sortDescending()
        }else{this.sortAscending()};

    });

  }

  private _intervalScores = setInterval(() => {
    this.getScores();
    }, 10000);	// seconds =/1000
  
  ngOnDestroy() {
    clearInterval(this._intervalScores)	//turn off refreshing the high scores
  };

  ngOnInit(): void {			
    this.playerName = this._player.readPlayer(); // from storage service  -->
    this.playerMail = this._mail.readMail();  
    this._intervalScores;	// every 30 sec
    this.getScores();
    if(!this.playerMail || !this.playerName){ this._router.navigate(['/intro']);}
  };		
}