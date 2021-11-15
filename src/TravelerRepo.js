class TravelerRepo {
  constructor(travelers) {
    this.data = travelers;
  }

  retrieveTraveler(id) {
    const specifcTraveler = this.data.find((traveler) => {
      return traveler.id === id;
    });
    if (!specifcTraveler) {
      return 'Sorry, this traveler is not in the data!'
    } else {
      return specifcTraveler;
    }
  }

  retrieveRandomTraveler() {
    return Math.floor(Math.random() * this.data.length);
  }
}


module.exports = TravelerRepo;
