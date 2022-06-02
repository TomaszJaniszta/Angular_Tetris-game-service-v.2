import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';				
import { Router } from '@angular/router'; //routing	
import { ActivatedRoute } from '@angular/router'; // selected color
import { NgControlStatus } from '@angular/forms';
import { Location } from '@angular/common';

export interface historyList { // ngFor html
  timeStamp: number;
  gameEvent: string
}

export class historyData {
  timeStamp: number;
  gameEvent: string;

  constructor(timeStamp : number, gameEvent:string){				
    this.timeStamp = timeStamp;
    this.gameEvent = gameEvent
  }
}


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GamePage implements OnInit{
    
  public color!: string;

  constructor(
       	private _location: Location,
        private _router: Router, 
        private _route: ActivatedRoute,
        private _service: StorageService,
        private _scores: StorageService,       
    ){ this._route.params.subscribe(params => {
        this.color = params['color'];
        // console.log(this.color);
      });
    }  // routing and storage servis 

  goBack() {	
    this._location.back();	
  }	

  changeColor() {
    if(this.color === 'contrast'){
       this.color = 'normal';
       this._router.navigate(['/game', this.color])
    } 
    else if (this.color === 'normal'){
      this.color = 'contrast';
      this._router.navigate(['/game', this.color])
    }
  }

  public darkBackground() {
    this.color === 'contrast' ? document.body.classList.add('black') : document.body.classList.remove('black');
  }

  openIntro() {	 //routing
    this._router.navigate(['/intro']);	
  }

  openHighScores() {	
    this._router.navigate(['/high-scores']);	
  }

  public playerName: string = ''; 
  public playerMail: string = ''; 
  // public highContrastOn: boolean = false; 

  ngOnInit(): void {			
    this.playerName = this._service.readPlayer(); // from storage service
    this.playerMail = this._service.readMail();     // token, from storage service
    if(!this.playerMail || !this.playerName){ this._router.navigate(['/intro']);}
    // this.highContrastOn = this._service.highContrastOn;
    // console.log(this.highContrastOn);
    this.darkBackground();
  }			

  public backToIntroPage(){
    this.openIntro();
    this.clearList();
  } //routing, back to the intro page

  public historyList: Array<historyData>=[]; // game history
  public points: number = 0;
  public timePlayed: number = 0;
  public timeDisplayed: number = 0; // full seconds
  public gameState: string = 'Ready'; // Ready / Playing / Paused
  public playing: boolean = false; 
  public actionCategories: Array<string>= []; 
  public timeStamp: number = 0;
  public sortByTime: boolean = true;
  public selectedOption: string = 'All'; 

  public selectCategories(){
    this.actionCategories = this.historyList.map((product) => product.gameEvent)
    this.actionCategories = [...new Set(this.actionCategories)];
    this.actionCategories.unshift('All'); // all events
  }

  public categoryEventChange($event: Event){
    this.selectedOption = ($event.target as HTMLOptionElement).value;
  }

  // reset button / log off
  public clearList(){
    this.historyList=[];
    this.actionCategories=[];
    this.timePlayed=0;
    this.timeDisplayed=0;
    this.points = 0;
  } 

  public addEventToHistoryList = (gameEvent: string) => {			
    const addedEvent = {timeStamp: Date.now(), gameEvent: gameEvent};
    this.historyList.push(addedEvent);
    this.selectCategories(); // actualization of event categories
  }

  public onLineCleared(){
    this.points = this.points + 1;
    this.addEventToHistoryList('Line cleared');
    this._scores.scores = this.points;
    //dodaj do storage
  }

  public gameStatePlaying(value: string){
    this.gameState = value;
    if(value === 'Playing' && this.timePlayed < 1){this.addEventToHistoryList('Start')};
    if(value === 'Paused'){this.addEventToHistoryList('Pause')};
    if(value === 'Playing' && this.timePlayed > 0){this.addEventToHistoryList('Resume')};
  }

  public timeStart(){
    if(this.gameState === 'Playing'){	
    const time = setInterval(() => {					
      this.timePlayed = this.timePlayed + 1/10;
      this.timeDisplayed = Math.floor(this.timePlayed)
        if (this.gameState === 'Ready' || this.gameState === 'Paused'|| this.gameState === 'Game over'){
          clearInterval(time)
          }
        }, 100);
      }
    }

  public onGameOver(){
    alert("Game over!");
    this.gameStatePlaying('Game over');
    this.addEventToHistoryList('Game over')
    this.openHighScores();
    //wyślij do wyników
    if(this.points > 0){
      this.addScores();
    };
  } 

  public addScores(){
    this._scores.addHighScores().subscribe((result) => {  // from storage service  <--
      // console.log(result);
    });
  };
  
  public sortByTimeAsc(){this.sortByTime = true} // Ascending
  public sortByTimeDsc(){this.sortByTime = false} // Descending
}