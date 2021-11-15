// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import TravelerRepo from './TravelerRepo';
import Traveler from './Traveler';
import Destinations from './Destinations';
import Trips from './Trips';
import {fetchData} from './api';
import domUpdates from './domUpdates';


let travelers;
let traveler;
let trips;
let destinations;

const getData = () => {
  const allPromise = Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
    .then(data => {createTraveler(data)})
}

const createTraveler = (data) => {
  travelers = new TravelerRepo(data[0].travelers)
  traveler = new Traveler(data[0].travelers[travelers.retrieveRandomTraveler()]);
  trips = new Trips(data[1].trips);
  destinations = new Destinations(data[2].destinations);
  console.log(travelers)
  console.log(traveler)
  console.log(trips)
  console.log(destinations)
  domUpdates.displayGreeting(traveler, traveler.returnFirstName());
  displayTrips();
}

const displayTrips = () => {
  traveler.trips = trips.retrieveTripData(traveler.id);
  traveler.destinations = destinations.data;
  console.log(traveler.destinations)
  domUpdates.displayPresentTrip(traveler.returnCurrentTripInfo('2021/11/16'), /*destinations*/);
  domUpdates.displayUpcomingTrips(traveler.returnUpcomingTripsInfo('2021/11/16'), /*destinations*/);
  domUpdates.displayPendingTrips(traveler.returnPendingTripsInfo('2021/11/16'), /*destinations*/);
  domUpdates.displayPastTrips(traveler.returnPastTripsInfo('2021/11/16'), /*destinations*/);

  }
//
//
//
// const displayUpcomingTrips = () => {
//
// }
//
// const displayPendingTrips = () => {
//
// }
//
// const displayPastTrips = () => {
//
// }


const onPageLoad = () => {
  getData();
}

window.addEventListener('load', onPageLoad);
