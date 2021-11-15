const welcomeMessage = document.getElementById('greeting')
const presentCircle = document.getElementById('presentTrip');
const upcomingCircle = document.getElementById('upcomingTrips');
const pendingCircle = document.getElementById('pendingTrips');
const pastCircle = document.getElementById('pastTrips');

const domUpdates = {
  displayGreeting(traveler, firstName) {
    welcomeMessage.innerText = `Welcome ${firstName}!`;
  },

  displayPresentTrip(presentTrip) {
    if(presentTrip.length === 0){
      presentCircle.innerHTML += `<p> No Present Trip </p>`
    } else {
    presentTrip.forEach((trip) => {
      presentCircle.innerHTML += `<p>Date: ${trip.date}, Destination: ${traveler.retrieveDestinationData(trip.destinationID)}, Duration: ${trip.duration} </p> `
    });
  }
    // presentCircle.innerHTML = `${presentTrip}`;
  },

  displayUpcomingTrips(upcomingTrips) {
    if(upcomingTrips.length === 0){
      upcomingCircle.innerHTML += `<p> No Upcoming Trips </p>`
    } else {
    upcomingTrips.forEach((trip) => {
      upcomingCircle.innerHTML += `<p>Date: ${trip.date}, Destination: ${traveler.retrieveDestinationData(trip.destinationID)}, Duration: ${trip.duration} </p> `
    });
    }
  },

  displayPendingTrips(pendingTrips) {
    if(pendingTrips.length === 0){
      pendingCircle.innerHTML += `<p> No Pending Trips </p>`
    } else {
    pendingTrips.forEach((trip) => {
      pendingCircle.innerHTML += `<p>Date: ${trip.date}, Destination: ${traveler.retrieveDestinationData(trip.destinationID)}, Duration: ${trip.duration} </p> `
    });
  }
    // pendingCircle.innerText = `Date: ${pendingTrips.date}; Travelers: ${pendingTrips.travelers}; Status: ${pendingTrips.travelers};`
  },

  displayPastTrips(pastTrips) {
    // console.log(trip.retrieveDestinationData(trip.destinationID), 'destination')
    if(pastTrips.length === 0){
      pastCircle.innerHTML += `<p> No Pending Trips </p>`
    } else {
    pastTrips.forEach((trip) => {
      pastCircle.innerHTML += `<p>Date: ${trip.date}, Destination: ${traveler.retrieveDestinationData(trip.destinationID)}, Duration: ${trip.duration} </p> `
    });
  }
}


}

export default domUpdates;
