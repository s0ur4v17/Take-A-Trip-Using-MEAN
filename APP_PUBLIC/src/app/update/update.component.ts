import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Trip } from '../trip';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public editPackage: Trip = {
    _id: '',
    name: '',
    description: '',
    image: '',
    rating: 0,
    cover: '',
    duration: '',
    facilities: '',
    services: ''
  };

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    var packageId = this.route.snapshot.paramMap.get('packageId');
    this.tripService.getSinglePackage(packageId as string)
    .then(trip => {
      this.editPackage = trip as Trip;
    })
  }
  
  public updatePackage(editPackage: Trip):void{
    this.tripService.updatePackage(editPackage)
    .then(editPackage => {
      if(editPackage){
        this.router.navigate(['/list']);
      }
    })
  }
}