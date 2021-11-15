const expect = require ('chai').expect;
const TravelerRepo = require ('../src/TravelerRepo.js');

describe('TravelerRepo', () => {

  let travelerRepo;

  beforeEach(function() {
    travelerRepo = new TravelerRepo([{
      id: 1,
      name: 'Jane Doe',
      travelerType: 'thrill-seeker'
    },
    {
      id: 2,
      name: 'Christy Allen',
      travelerType: 'foodie'
    },
    {
      id: 3,
      name: 'James Lee',
      travelerType: 'relaxer'
    },
  ]);
  });

  it('should be a function', function() {
    expect(TravelerRepo).to.be.a('function');
  });

  it('should be an instance of TravelerRepo', function() {
    expect(travelerRepo).to.be.an.instanceOf(TravelerRepo);
  });

  it('should be able to retrieve an user by id', function() {
    expect(travelerRepo.retrieveTraveler(2)).to.deep.equal(
      {
        id: 2,
        name: 'Christy Allen',
        travelerType: 'foodie'
      }
    );
  });

  it('should return error message if no user found', function() {
  expect(travelerRepo.retrieveTraveler(6)).to.equal('Sorry, this traveler is not in the data!')
})

});
