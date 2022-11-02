import { Component, OnInit } from '@angular/core';
import { TripService } from '../services/trip.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { Trip } from '../trip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pageContent = {
    header: {
      title: '', body: ''
    }
  };

  public trip = new Trip();

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    const packageId = this.route.snapshot.paramMap.get('packageId');

    if (this.route.url['_value'][0].path === 'delete') {
      this.deletePackage(packageId as string);
    }
    else {
    this.tripService.getSinglePackage(packageId as string)
      .then(trip => {
        this.trip = trip as unknown as Trip;
        this.pageContent.header.title = this.trip.name;
        this.pageContent.header.body = 'Details for the Destination.';
      });
    }
  }
    public deletePackage(packageId:string){ 
      this.route.params.pipe(switchMap((params: Params) => { 
        return this.tripService.deletePackage(packageId as string); 
      })) 
      .subscribe({
      next: data => {
      this.router.navigate(['/list']);
    }});
  }
}
