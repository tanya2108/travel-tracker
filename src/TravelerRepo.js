class TravelerRepo {
  constructor(travelerData) {
    this.data = travelerData
  }

  retrieveUser(id) {
    const specifcTraveler = this.data.find((traveler) => {
      return traveler.id === id;
    });
    if (!specifcTraveler) {
      return 'Sorry, this traveler is not in the data!'
    } else {
      return specifcTraveler;
    }
  }
}


module.exports = TravelerRepo;
