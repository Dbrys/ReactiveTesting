import { Component, OnInit } from '@angular/core';

import { BandDataService } from '../band-data.service';
import { Band } from '../models';
import { Observable, interval, Subject, merge, combineLatest } from 'rxjs';
import { map, filter, mergeMap, startWith } from 'rxjs/operators';
import { MergeMapOperator } from 'rxjs/internal/operators/mergeMap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-band-list',
  templateUrl: './band-list.component.html',
  styleUrls: ['./band-list.component.sass']
})
export class BandListComponent {
  bandList$: Observable<{band: Band[], isTriggered: boolean}>; 
  refreshDataClickSubject = new Subject(); 
  // test: Observable<{}> = 

  constructor(private bandDataService: BandDataService, private activedRoute: ActivatedRoute) { 
  // this.bandList$ = this.bandDataService.getBands();  
   
 
    const refreshedData = this.refreshDataClickSubject.asObservable();
    // Gets ovbservable of event emitted by button click   
    const refreshTrigger$ = refreshedData.pipe(
      startWith({})
      //combineLatest(activedRoute.queryParams),
      // map(([_, params])=>{
      //   if (params.active === undefined) return undefined; 
      //   return params.active ==="true"; 
      // })
  

    );
   
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
