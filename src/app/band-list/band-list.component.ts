import { Component, OnInit } from '@angular/core';

import { BandDataService } from '../band-data.service';
import { Band } from '../models';
import { Observable, interval, Subject, merge } from 'rxjs';
import { map, filter, mergeMap, startWith } from 'rxjs/operators';
import { MergeMapOperator } from 'rxjs/internal/operators/mergeMap';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.sass']
})
export class BandListComponent implements OnInit {
  bandList$: Observable<{band: Band[], isTriggered: boolean}>; 
  refreshDataClickSubject = new Subject(); 

  constructor(private bandDataService: BandDataService) { 
  // this.bandList$ = this.bandDataService.getBands();  
  }

  ngOnInit() {
    const refreshedData = this.refreshDataClickSubject.asObservable();   
    const refreshTrigger$ = refreshedData.pipe(
      startWith({})
    )
   
    const bandList = refreshTrigger$.pipe( 
      mergeMap(() => this.bandDataService.getBands())
    )

    // Using Merge to merge observables 
    
   this.bandList$ = merge (
    refreshTrigger$.pipe(map(() => ({band: [], isTriggered: true}))),
    bandList.pipe(map(value => ({band: value, isTriggered: false}))),

   );
  }

}
