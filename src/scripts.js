import './css/base.scss';
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
const loginButton = document.getElementById('login');
const userNameInput = document.getElementById('userNameInput');
const pwInput = document.getElementById('pwInput');
const userNameValue = document.getElementById('userNameInput').value;


let travelers;
let traveler;
let trips;
let destinations;

const getData = () => {
  const allPromise = Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
    .then(data => {createDashboard(data)})
}

const createDashboard = (data) => {
  travelers = new TravelerRepo(data[0].travelers);
  const myID = Number(userNameInput.value.split('r').pop()-1);
  traveler = new Traveler(data[0].travelers[myID]);
  trips = new Trips(data[1].trips);
  destinations = new Destinations(data[2].destinations);
  domUpdates.displayGreeting(traveler, traveler.returnFirstName());
  displayTrips();
  displayYearlyCosts();
}

const displayTrips = () => {
  traveler.trips = trips.retrieveTripData(traveler.id);
  traveler.destinations = destinations.data;
  domUpdates.displayPresentTrip(traveler.returnCurrentTripInfo('2021/11/16'), traveler);
  domUpdates.displayUpcomingTrips(traveler.returnUpcomingTripsInfo('2021/11/16'), traveler);
  domUpdates.displayPendingTrips(traveler.returnPendingTripsInfo('2021/11/16'), traveler);
  domUpdates.displayPastTrips(traveler.returnPastTripsInfo('2021/11/16'), traveler);
  }

const displayYearlyCosts = () => {
  domUpdates.displayCostPerYear(traveler.returnUserTotalPerYear('2020'));
}

const updateTripsData = (tripData) => {
  traveler.trips.push(tripData)
}

const findEstimatedCosts = (event) => {
  event.preventDefault();
  const possibleTrip = [{
    id: 999,
    userID: Number(traveler.id),
    destinationID: Number(destinationInput.value),
    travelers: Number(travelersInput.value),
    date: startDateInput.value,
    duration: Number(durationInput.value),
    status: 'pending',
    suggestedActivities:[]
  }]
  domUpdates.displayEstimateCosts(traveler.returnEstimateCosts(possibleTrip))
}

const addTripRequest = (event) => {
  event.preventDefault();
  let cardID = trips.data.length + 1;
  if (domUpdates.checkTripRequestForm()){
    const newTrip = {
        id: cardID,
        userID: Number(traveler.id),
        destinationID: Number(destinationInput.value),
        travelers: Number(travelersInput.value),
        date: startDateInput.value,
        duration: Number(durationInput.value),
        status: 'pending',
        suggestedActivities:[]
      }
      addTrip(newTrip)
        .then(data => updateTripsData(data))
        .catch(error => console.log(error))
        domUpdates.showSuccessMessage(cardID);
        setTimeout(domUpdates.clearMessage, 5000);
    }
  }

  const checkLogin = (event) => {
    if (checkUserName() && checkPassword()) {
      event.preventDefault();
      domUpdates.showMainPage();
      getData();
    } else {
      domUpdates.displayErrorLogin();
      setTimeout(domUpdates.clearMessage, 5000);
    }
  }

  const checkUserName = () => {
    const inputValue = userNameInput.value;
    const inputNumber = Number(inputValue.split('r').pop());
    const travelerIDs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
    if (travelerIDs.includes(inputNumber)) {
      return true;
    } else {
      return false;
    }
  }

  const checkPassword = () => {
    if (pwInput.value === 'travel') {
      return true;
    } else {
      return false;
    }
  }


loginButton.addEventListener('click', checkLogin);
estimateButton.addEventListener('click', findEstimatedCosts);
addNewButton.addEventListener('click', addTripRequest);
