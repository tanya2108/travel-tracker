class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = travelerData.trips;
    this.destinations = travelerData.destination;
  }

  returnFirstName () {
    return this.name.split(' ')[0]
  }

  retrieveDestinationData(destinationID) {
    const specificDestination = this.destinations.find((destination) => {
      return destination.id === destinationID  ;
    })
    if (!specificDestination) {
      return `Sorry, this destination is not available yet.`
    } else {
      return specificDestination;
    }
  }

  returnCurrentTripInfo(date) {
      const currentTrip = this.trips.filter((trip) => {
        return trip.date === date;
      })
        return currentTrip;
      }

  returnUpcomingTripsInfo(date) {
    const upcomingTrips = this.trips.sort((a, b) => {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date){
        return 1;
      }
        return 0;
      }).filter((trip) => {
      return trip.date > date;
      })
      return upcomingTrips;
      }

  returnPendingTripsInfo() {
    const pendingStatusTrips = this.trips.filter((trip) => {
      return trip.status === 'pending'
    })
      return pendingStatusTrips;
    }

  returnPastTripsInfo(date) {
    const pastTrips = this.trips.sort((a, b) => {
      if (a.date < b.date) { a
        return -1
      }
      if (a.date > b.date){
        return 1
      }
        return 0
      }).filter((trip) => {
      return trip.date < date;
      })
        return pastTrips;
      }

  returnUserTotalPerYear(year) {
    const allCostInYear = this.trips.filter((trip) => {
      let specificYear = trip.date.split('/').shift();
      return specificYear === year;
    }).reduce((totalPerYear, trip)=> {
      const destinationData = this.retrieveDestinationData(trip.destinationID);
      const lodgingFees = destinationData.estimatedLodgingCostPerDay * trip.duration
      const flightFees = destinationData.estimatedFlightCostPerPerson * trip.travelers
      const agentFees = (lodgingFees+flightFees)*.1
      totalPerYear['lodgingCost'] += lodgingFees;
      totalPerYear['flightCost'] += flightFees;
      totalPerYear['agentCost'] += agentFees;
      return totalPerYear;
    },{lodgingCost: 0, flightCost: 0, agentCost: 0})
      return allCostInYear;
  }
}


module.exports = Traveler;
