import { Pipe, PipeTransform } from '@angular/core';
import { hiScores } from './high-scores-component/high-scores.component';
import { Component, OnInit, OnChanges, Input, OnDestroy } from '@angular/core';
import {StorageService} from './storage.service';				

@Pipe({
  name: 'filterScores'
})

export class myScoresPipe implements PipeTransform {
  transform(items: Array<hiScores>,
    playerName: string,
    onlyMyScoresDisplay: boolean,
    data10displayedLength?: number, // optional to refresh data pipe on change 
            ): Array<hiScores> {
          if(onlyMyScoresDisplay === false){
            return items} else {
              let filteredArray = items.filter((item) => item.name == playerName);
              // items = items.sort(function(a,b) { return a.score - b.score });
              return filteredArray;
          }

        // ngOnInit(): void {			
        //   this.boolean = this._player.readPlayer(); // from storage service  -->
        // }		
}}