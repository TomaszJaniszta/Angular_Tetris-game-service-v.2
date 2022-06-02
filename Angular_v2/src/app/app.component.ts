import { Component } from '@angular/core';
import { Router } from '@angular/router'; //routing

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  public playerLogged: boolean = false;
  public playerName: string = '';
  public playerMail: string = '';

  //routing
  constructor(public _router: Router) { }	 
    openIntro() {	
          this._router.navigate(['/intro']);	
    }	
    openGame() {	
          this._router.navigate(['/game']);	
    }	
    openHighScores() {	
          this._router.navigate(['/high-scores']);	
    }
    //routing
    
  // public playerNameFunction($event: string) { this.playerName = $event }
  // public playerMailFunction($event: string) { this.playerMail = $event }
  public logOnFunction() { this.playerLogged = !this.playerLogged }
}