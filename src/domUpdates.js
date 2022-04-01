const welcomeMessage = document.getElementById('greeting')
const presentCircle = document.getElementById('presentTrip');
const upcomingCircle = document.getElementById('upcomingTrips');
const pendingCircle = document.getElementById('pendingTrips');
const pastCircle = document.getElementById('pastTrips');
const yearlyCost = document.getElementById('yearlyCost');
const startDateInput = document.getElementById('startDateInput');
const durationInput = document.getElementById('durationInput');
const travelersInput = document.getElementById('travelersInput');
const destinationInput = document.getElementById('places');
let formFeedback = document.getElementById('formFeedback');
let postFeedback = document.getElementById('postFeedback');
const estimateCost = document.getElementById('estimateCost');
const estimateButton = document.getElementById('estimate');
const loginFeedback = document.getElementById('loginFeedback')
const loginPage = document.getElementById('login')
const mainPage = document.getElementById('main')

const domUpdates = {
  displayGreeting(traveler, firstName) {
    welcomeMessage.innerText = `Welcome ${firstName}!`;
  },

  displayPresentTrip(presentTrip, traveler) {
    if(presentTrip.length === 0) {
      presentCircle.innerHTML += `<p> No Present Trip </p>`
    } else {
      presentTrip.forEach((trip) => {
        presentCircle.innerHTML += `<div class="trip-card"><p>Date: ${trip.date}</p> 
        <p>Destination: ${traveler.retrieveDestinationData(trip.destinationID).destination}</p> 
        <p>Duration: ${trip.duration}</p> 
        <img class="dest-image"src="${traveler.retrieveDestinationData(trip.destinationID).image}" alt="${traveler.retrieveDestinationData(trip.destinationID).alt}"></div>`
    });
  }
  },

  displayUpcomingTrips(upcomingTrips, traveler) {
    if (upcomingTrips.length === 0) {
      upcomingCircle.innerHTML += `<p> No Upcoming Trips </p>`
    } else {
      upcomingTrips.forEach((trip) => {
        upcomingCircle.innerHTML += `<div class="trip-card"><p>Date: ${trip.date}</p> 
        <p>Destination: ${traveler.retrieveDestinationData(trip.destinationID).destination}</p> 
        <p>Duration: ${trip.duration} </p>
        <img class="dest-image"src="${traveler.retrieveDestinationData(trip.destinationID).image}" alt="${traveler.retrieveDestinationData(trip.destinationID).alt}"></div>`  
      });
    }
  },

  displayPendingTrips(pendingTrips, traveler) {
    pendingCircle.innerHTML = '';
    if(pendingTrips.length === 0) {
      pendingCircle.innerHTML += `<p> No Pending Trips </p>`
    } else {
      pendingTrips.forEach((trip) => {
        pendingCircle.innerHTML += `<div class="trip-card"><p>Date: ${trip.date}</p> 
        <p>Destination: ${traveler.retrieveDestinationData(trip.destinationID).destination}</p>
        <p> Duration: ${trip.duration}</p> 
        <img class="dest-image"src="${traveler.retrieveDestinationData(trip.destinationID).image}" alt="${traveler.retrieveDestinationData(trip.destinationID).alt}"></div>`
      });
    }
  },

  displayPastTrips(pastTrips, traveler) {
    if(pastTrips.length === 0){
      pastCircle.innerHTML += `<p> No Past Trips </p>`
    } else {
    pastTrips.forEach((trip) => {
      pastCircle.innerHTML += `<div class="trip-card"><p>Date: ${trip.date}</p>
      <p>Destination: ${traveler.retrieveDestinationData(trip.destinationID).destination}</p>
      <p>Duration: ${trip.duration}</p>
      <img class="dest-image"src="${traveler.retrieveDestinationData(trip.destinationID).image}" alt="${traveler.retrieveDestinationData(trip.destinationID).alt}"></div>`
    });
  }
},

  displayCostPerYear(totalCost) {
      const total = totalCost.lodgingCost + totalCost.flightCost + totalCost.agentCost
      yearlyCost.innerHTML += `
        <p> Total Cost: ${total.toLocaleString()}</p>
        <p> 1. Lodging Cost: ${totalCost.lodgingCost.toLocaleString()}</p>
        <p> 2. Flight Cost: ${totalCost.flightCost.toLocaleString()}</p>
        <p> 3. Agent Cost: ${totalCost.agentCost.toLocaleString()}</p>`
      },

  showSuccessMessage(cardID) {
    formFeedback.innerText = '';
    postFeedback.innerText = `Trip with ID${cardID} successfully posted`;
  },

  clearMessage() {
    postFeedback.innerText = '';
  },

  clearForm() {
    startDateInput.value = null;
    durationInput.value = null;
    travelersInput.value = null;
    destinationInput.value = null;
  },

  checkTripRequestForm() {
    if (!startDateInput || !durationInput || !travelersInput || !destinationInput.value) {
      formFeedback.innerText = `Please fill out all fields`
      setTimeout(this.clearMessage, 2000)
    } else {
      return true;
    }
  },

  displayEstimateCosts(estimate) {
    const total = estimate.lodgingCost + estimate.flightCost + estimate.agentCost
    estimateCost.innerHTML += `
      <p>Estimate Total Cost: ${total.toLocaleString()}</p>
      <p> 1. Estimate Lodging Cost: ${estimate.lodgingCost.toLocaleString()}</p>
      <p> 2. Estimate Flight Cost: ${estimate.flightCost.toLocaleString()}</p>
      <p> 3. Estimate Agent Cost: ${estimate.agentCost.toLocaleString()}</p>`
    },

  clearEstimateCosts() {
    estimateCost.innerHTML = '';
  },

  showMainPage() {
    show(mainPage);
    hide(loginPage);
  },

  displayErrorLogin(){
    loginFeedback.innerText = 'Login Failed: Username or Password is incorrect.'
  }
}

  const show = (element) => {
    element.classList.remove('hidden')
  }

  const hide = (element) => {
    element.classList.add('hidden')
  }

export default domUpdates;
