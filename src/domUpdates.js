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
        presentCircle.innerHTML += `<p>Date: ${trip.date}, Destination: ${traveler.retrieveDestinationData(trip.destinationID).destination}, Duration: ${trip.duration} </p> `
    });
  }
  },

  displayUpcomingTrips(upcomingTrips, traveler) {
    if (upcomingTrips.length === 0) {
      upcomingCircle.innerHTML += `<p> No Upcoming Trips </p>`
    } else {
      upcomingTrips.forEach((trip) => {
        upcomingCircle.innerHTML += `<p>Date: ${trip.date}, Destination: ${traveler.retrieveDestinationData(trip.destinationID).destination}, Duration: ${trip.duration} </p> `
      });
    }
  },

  displayPendingTrips(pendingTrips, traveler) {
    if(pendingTrips.length === 0) {
      pendingCircle.innerHTML += `<p> No Pending Trips </p>`
    } else {
      pendingTrips.forEach((trip) => {
        pendingCircle.innerHTML += `<p>Date: ${trip.date}, Destination: ${traveler.retrieveDestinationData(trip.destinationID).destination}, Duration: ${trip.duration} </p> `
      });
    }
  },

  displayPastTrips(pastTrips, traveler) {
    if(pastTrips.length === 0){
      pastCircle.innerHTML += `<p> No Past Trips </p>`
    } else {
    pastTrips.forEach((trip) => {
      pastCircle.innerHTML += `<p>Date: ${trip.date}, Destination:            ${traveler.retrieveDestinationData(trip.destinationID).destination}, Duration: ${trip.duration} </p>`
    });
  }
},

  displayCostPerYear(totalCost) {
      const total = totalCost.lodgingCost + totalCost.flightCost + totalCost.agentCost
      yearlyCost.innerHTML += `
        <h3>Total Cost: ${total.toLocaleString()}</h3>
        <p> 1. Lodging Cost: ${totalCost.lodgingCost.toLocaleString()}</p>
        <p> 2. Flight Cost: ${totalCost.flightCost.toLocaleString()}</p>
        <p> 3. Agent Cost: ${totalCost.agentCost.toLocaleString()}</p>`
      },

  showSuccessMessage(cardID) {
    formFeedback.innerText = '';
    postFeedback.innerText = `Trip with ID${cardID} successfully posted`;
  },

  clearMessage(){
    postFeedback.innerText = '';
  },

  checkTripRequestForm() {
    if (startDateInput && durationInput && travelersInput && destinationInput.value) {
      formFeedback.innerText = `Thank you for submitting your trip request!`
      return true;
    } else {
      formFeedback.innerText = `Please fill out all fields`
      setTimeout(this.clearMessage, 2000)
    }
  },

  displayEstimateCosts(estimate) {
    const total = estimate.lodgingCost + estimate.flightCost + estimate.agentCost
    estimateCost.innerHTML += `
      <h3>Total Cost: ${total.toLocaleString()}</h3>
      <p> 1. Lodging Cost: ${estimate.lodgingCost.toLocaleString()}</p>
      <p> 2. Flight Cost: ${estimate.flightCost.toLocaleString()}</p>
      <p> 3. Agent Cost: ${estimate.agentCost.toLocaleString()}</p>`
    },

  showMainPage() {
    show(mainPage);
    hide(loginPage);
  },

  displayErrorLogin(){
    loginFeedback.innerText = 'Login Failed: Username or Password is incorrect. Please try again'
  }

}

  const show = (element) => {
    element.classList.remove('hidden')
  }

  const hide = (element) => {
    element.classList.add('hidden')
  }

export default domUpdates;
