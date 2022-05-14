import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { TetrisCoreModule } from 'ngx-tetris';
import { FormsModule } from '@angular/forms';

//components
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';		
import { GamePage } from './game/game.component';		

//pipes
import { SortPipe } from './sort.pipe';	
import { FilterPipe } from './filter.pipe';

			
@NgModule({			
      declarations: [			
          AppComponent,		
          IntroComponent,	
          GamePage,
          SortPipe,
          FilterPipe
      ],			
      imports: [	
	  FormsModule,		
          BrowserModule,			
          TetrisCoreModule,
          FormsModule
      ],			
      providers: [],			
      bootstrap: [AppComponent],
  })
			
  export class AppModule {}			
  