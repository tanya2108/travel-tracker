class Trips {
  constructor(trips) {
    this.data = trips;
  }

  retrieveTripData(userID) {
    const userTripsData = this.data.filter((eachTrip) => {
      return eachTrip.userID === userID;
    });
    if (userTripsData.length === 0){
      return `Sorry, traveler${userID} has not made any trip yet.`
    } else {
      return userTripsData;
    }
  }

}

module.exports = Trips;
