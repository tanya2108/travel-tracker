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
import {fetchData, addTrip} from './api';
import domUpdates from './domUpdates';

const addNewButton = document.getElementById('addNewTrip');
const startDateInput = document.getElementById('startDateInput');
const durationInput = document.getElementById('durationInput');
const travelersInput = document.getElementById('travelersInput');
const destinationInput = document.getElementById('places');
const estimateButton = document.getElementById('estimate');


let travelers;
let traveler;
let trips;
let destinations;

const getData = () => {
  const allPromise = Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
    .then(data => {createDashboard(data)})
}

const createDashboard = (data) => {
  travelers = new TravelerRepo(data[0].travelers)
  traveler = new Traveler(data[0].travelers[travelers.retrieveRandomTraveler()]);
  trips = new Trips(data[1].trips);
  destinations = new Destinations(data[2].destinations);
  domUpdates.displayGreeting(traveler, traveler.returnFirstName());
  displayTrips();
  displayCosts();
}

const displayTrips = () => {
  traveler.trips = trips.retrieveTripData(traveler.id);
  traveler.destinations = destinations.data;
  domUpdates.displayPresentTrip(traveler.returnCurrentTripInfo('2021/11/16'), traveler);
  domUpdates.displayUpcomingTrips(traveler.returnUpcomingTripsInfo('2021/11/16'), traveler);
  domUpdates.displayPendingTrips(traveler.returnPendingTripsInfo('2021/11/16'), traveler);
  domUpdates.displayPastTrips(traveler.returnPastTripsInfo('2021/11/16'), traveler)
  }

const displayCosts = () => {
  domUpdates.displayCostPerYear(traveler.returnUserTotalPerYear('2020'));
}

const onPageLoad = () => {
  getData();
}

window.addEventListener('load', onPageLoad);
