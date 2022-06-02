import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';	
import { hiScores } from './high-scores-component/high-scores.component';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  constructor(private _http: HttpClient) {}		
  public highContrastOn: boolean = false;
  public player!: string;
  public mail!: string;	//token
  public scores: number = 0;
  public displayAscendingScores: boolean = false; 
  public onlyMyScoresDisplay: boolean = true;

  public readPlayer() { return this.player };	
  public readMail() { return this.mail }; // token		
  public readScores() { return this.scores };			
  public readOnlyMyScoresDisplay(){ return this.onlyMyScoresDisplay };
  public readDisplayAscendingScores(){ return this.displayAscendingScores };	

  load() {
    const URL = 'http://localhost:8080/scores/tetris';
    // const URL = 'http://scores.chrum.it/tetris';
    return this._http.get<Array<hiScores>>(URL, {
      headers: {
        "accept": 'application/json',
      },
    });
  };

  login() {
    // const URL = 'http://localhost:8080/check-token';
    const URL = 'http://scores.chrum.it/check-token';
    const body = { 'auth-token': this.mail };
    return this._http.post(URL, body)
    .subscribe((result) => {
    console.log(result);});
  };

  // addHighScores(token: string, player: string) { //mail/token
  addHighScores() { 
      const URL = 'http://localhost:8080/scores';
      // const URL = 'http://scores.chrum.it/scores';
      const body = {
        'auth-token': this.mail, // mail=token  
        'name': this.player,
        'game': "tetris",
        'score': this.scores};
      // return this._http.delete(URL);
      return this._http.post(URL, body);
    };

}
