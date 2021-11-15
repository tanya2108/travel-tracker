const expect = require ('chai').expect;
const Destinations = require ('../src/Destinations.js');

describe('Destinations', () => {

  let destinations;

  beforeEach(function() {
    const destinationsData = [{
      id: 1,
      destination: 'Lima, Peru',
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 400,
      image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
      alt: 'overview of city buildings with a clear sky'
    },
    {
      id: 2,
      destination: 'Stockholm, Sweden',
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 780,
      image: 'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      alt: 'city with boats on the water during the day time'
    },
    {
      id: 3,
      destination: 'Sydney, Austrailia',
      estimatedLodgingCostPerDay: 130,
      estimatedFlightCostPerPerson: 950,
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      alt: 'opera house and city buildings on the water with boats'
    }];
    destinations = new Destinations(destinationsData)
  });

  it('should be a function', function() {
    expect(Destinations).to.be.a('function');
  });

  it('should be an instance of Destinations', function() {
    expect(destinations).to.be.an.instanceOf(Destinations);
  });

  it('should retrieve a particular destination based on ID', function() {
    expect(destinations.retrieveDestinationData(2)).to.deep.equal(
      {
      id: 2,
      destination: 'Stockholm, Sweden',
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 780,
      image: 'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      alt: 'city with boats on the water during the day time'
      }
    );
  });

  it('should return an error message if destination does not exist for user', function() {
    expect(destinations.retrieveDestinationData(6)).to.deep.equal('Sorry, this destination is not available yet.');

  });

  });
