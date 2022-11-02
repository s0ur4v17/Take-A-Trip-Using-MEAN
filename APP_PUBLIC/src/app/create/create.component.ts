import { Component, OnInit } from '@angular/core';
import { Trip } from '../trip';
import { TripService } from '../services/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    public newPackage: Trip = {
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
  
    constructor(private tripService: TripService, private router: Router) { }
    
    ngOnInit(): void {
    }
    public createNewPackage(newPackage: Trip): void {
      this.tripService.createPackage(newPackage);
      this.router.navigate(['/list']);
    }
  }