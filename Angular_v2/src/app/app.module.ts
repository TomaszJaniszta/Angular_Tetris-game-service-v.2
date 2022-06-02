import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TetrisCoreModule } from 'ngx-tetris';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//components
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { GamePage } from './game/game.component';
import { HighScores } from './high-scores-component/high-scores.component';
import { StorageService } from './storage.service';
import { LockedGuard } from './LockedGuard.guard';

//pipes
import { SortPipe } from './sort.pipe';
import { FilterPipe } from './filter.pipe';
import { myScoresPipe } from './my-scores-pipe.pipe';

//routing
import { RouterModule } from '@angular/router';

	
// import { AppRoutingModule } from './app-routing.module'; // CLI imports AppRoutingModule

@NgModule({
        declarations: [
                AppComponent,
                IntroComponent,
                GamePage,
                SortPipe,
                FilterPipe,
                HighScores,
                myScoresPipe,
        ],
        imports: [
                FormsModule,
   		ReactiveFormsModule,
                BrowserModule,
                TetrisCoreModule,
                FormsModule,
		HttpClientModule,
                
                //routing
                RouterModule.forRoot([
                        { path: 'intro', component: IntroComponent },
                        // routing color
                        { path: 'game/:color',
			  component: GamePage,
			  canActivate: [LockedGuard]
			 },                        
                        { path: 'game', component: GamePage },
                        { path: 'high-scores', component: HighScores },
                        { path: '**', redirectTo: 'intro' },
                ]),
            
        ],
        exports: [RouterModule], //routing

        providers: [StorageService],
        bootstrap: [AppComponent],
})

export class AppModule { }
