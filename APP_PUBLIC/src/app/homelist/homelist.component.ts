import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-homelist',
  templateUrl: './homelist.component.html',
  styleUrls: ['./homelist.component.css'],
  providers: [TripService]
})
export class HomelistComponent implements OnInit {

  public packages: Trip[] = [];

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.tripService
      .getPackages()
      .then(packages => {
        this.packages = packages as Trip[];
    });
  }
}