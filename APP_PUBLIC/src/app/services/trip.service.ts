import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private readonly tripUrl = 'http://localhost:3000/api/packages';

  constructor(private http: HttpClient) { }

  //Get all Packages.
  getPackages() : Promise<void | Trip[]> {
    return this.http.get(this.tripUrl)
    .toPromise()
    .then(response => {
      return response as Trip[];
    })
    .catch(this.handleError);
  }

  //Get Single Package.
  getSinglePackage(packageId: string): Promise<void | Trip>{
    return this.http.get(this.tripUrl + '/' + packageId)
    .toPromise()
    .then(response => response as Trip)
    .catch(this.handleError);
  }

  //Create Package.
  createPackage(newPackage: Trip): Promise<void | Trip> {
    return this.http.post(this.tripUrl, newPackage)
      .toPromise()
      .then(response => response as Trip)
      .catch(this.handleError);
  }

  //Update Package.
  updatePackage(trip: Trip){
    return this.http.put(this.tripUrl+'/'+trip._id, trip)
    .toPromise() 
    .then(response => response as Trip) 
    .catch(this.handleError);
  }

  //Delete Package.
  deletePackage(packageId: string):Promise<void | Trip> {
    return this.http.delete(this.tripUrl + '/' + packageId)
    .toPromise()
    .then(response=>response as Trip)
    .catch(this.handleError);
  }

  handleError(error: any) {
    console.log(error);
  }
}
