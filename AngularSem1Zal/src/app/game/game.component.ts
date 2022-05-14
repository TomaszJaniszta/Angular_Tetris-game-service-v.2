import {Component, Output, EventEmitter, Input} from '@angular/core';

export interface historyList {
  timeStamp: number;
  gameEvent: string
}

export class historyData {
  timeStamp: number;
  gameEvent: string;

  constructor(timeStamp : number, gameEvent:string){				
    this.timeStamp = timeStamp;
    this.gameEvent = gameEvent
    }
  }

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GamePage {
  @Output() logOff = new EventEmitter(); //back to the intro page

  @Input() playerName: string = '';
  @Input() playerMail: string = '';

  public historyList: Array<historyData>=[]; // game history
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

  public backToIntroPage(){this.logOff.emit()}

  public addEventToHistoryList = (gameEvent: string) => {			
    const addedEvent = {timeStamp: Date.now(), gameEvent: gameEvent};
    this.historyList.push(addedEvent);
    this.selectCategories(); // actualization of event categories
  }

  public onLineCleared(){
    this.points = this.points + 1;
    this.addEventToHistoryList('Line cleared')
  }

  public gameStatePlaying(value: string){
    this.gameState = value;
    if(value === 'Playing' && this.timePlayed < 1){this.addEventToHistoryList('Start')};
    if(value === 'Paused'){this.addEventToHistoryList('Pause')};
    if(value === 'Playing' && this.timePlayed > 0){this.addEventToHistoryList('Resume')};
  }

  public timeStart(){
    if(this.gameState === 'Playing'){	
    const time = setInterval(() => {					
      this.timePlayed = this.timePlayed + 1/10;
      this.timeDisplayed = Math.floor(this.timePlayed)
        if (this.gameState === 'Ready' || this.gameState === 'Paused'|| this.gameState === 'Game over'){
          clearInterval(time)
          }
        }, 100);
      }
    }

  public onGameOver(){
    alert("Game over!");
    this.gameStatePlaying('Game over');
    this.addEventToHistoryList('Game over')
    } 
  
  public sortByTimeAsc(){this.sortByTime = true} // Ascending
  public sortByTimeDsc(){this.sortByTime = false} // Descending
}