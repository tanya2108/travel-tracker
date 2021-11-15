class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = travelerData.trips;
    this.destinations = travelerData.destination;
    // this.createdDestination = [];
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
      return specificDestination.destination;
    }

  }

  returnCurrentTripInfo(date) {
      let currentTrip = this.trips.filter((trip) => {
        return trip.date === date;
      })
      // if (currentTrip.length === 0) {
      //   return currentTrip = 'No Present Trip';
      // } else {
        return currentTrip;
      }


    returnUpcomingTripsInfo(date) {
      let upcomingTrips = this.trips.sort((a, b) => {
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
        // if (upcomingTrips.length === 0) {
        //   return upcomingTrips = 'No Upcoming Trips';
        // } else {
        return upcomingTrips;
        }



  returnPendingTripsInfo() {
    let pendingStatusTrips = this.trips.filter((trip) => {
      return trip.status === 'pending'
    })
    // if (pendingStatusTrips.length === 0) {
    //   return pendingStatusTrips = 'No Pending Trips';
    // } else {
      return pendingStatusTrips;
    }


  returnPastTripsInfo(date) {
    let pastTrips = this.trips.sort((a, b) => {
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
    // currentTrips

  }


}


module.exports = Traveler;
