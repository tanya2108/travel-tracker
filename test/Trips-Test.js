const expect = require ('chai').expect;
const Trips = require ('../src/Trips.js');

describe('Trips', () => {

  let trips;

  beforeEach(function() {
    const tripsData = [{
    id: 1,
    userID: 2,
    destinationID: 1,
    travelers: 1,
    date: '2022/09/16',
    duration: 8,
    status: 'approved',
    suggestedActivities: []
  },
  { id: 2,
    userID: 1,
    destinationID: 3,
    travelers: 2,
    date: '2022/08/02',
    duration: 5,
    status: ' approved',
    suggestedActivities:[]
  },
  { id: 3,
    userID: 3,
    destinationID: 1,
    travelers: 5,
    date: '2022/05/20',
    duration: 3,
    status: 'approved',
    suggestedActivities: []
  }];
    trips = new Trips(tripsData)
  });

  it('should be a function', function() {
    expect(Trips).to.be.a('function');
  });

  it('should be an instance of Trip', function() {
    expect(trips).to.be.an.instanceOf(Trips);
  });

  it('should retrieve a user trip data', function() {
    expect(trips.retrieveTripData(2)).to.deep.equal(
      [{ id: 1,
        userID: 2,
        destinationID: 1,
        travelers: 1,
        date: '2022/09/16',
        duration: 8,
        status: 'approved',
        suggestedActivities: []
      }]
    );
  });

  it('should return an error message if trip data does not exist for user', function() {
    expect(trips.retrieveTripData(5)).to.deep.equal('Sorry, traveler5 has not made any trip yet.');

  });

  });
