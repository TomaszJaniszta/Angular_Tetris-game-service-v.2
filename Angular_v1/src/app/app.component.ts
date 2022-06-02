import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  public playerLogged: boolean = false;
  public playerName: string = '';
  public playerMail: string = '';

  public playerNameFunction($event: string) { this.playerName = $event }
  public playerMailFunction($event: string) { this.playerMail = $event }
  public logOnFunction() {this.playerLogged = !this.playerLogged}

}