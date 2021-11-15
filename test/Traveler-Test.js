// import chai from 'chai';
// const expect = chai.expect;
//
// describe('See if the tests are running', function() {
//   it('should return true', function() {
//     expect(true).to.equal(true);
//   });
// });

const expect = require ('chai').expect;
const Traveler = require ('../src/Traveler.js');

describe('Traveler', () => {

  let traveler;

  beforeEach(function() {
    traveler = new Traveler({
      id: 1,
      name: 'Jane Doe',
      travelerType: 'thrill-seeker',
    });
  });

  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', function() {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it('should store an id', function() {
    expect(traveler.id).to.equal(1);
  });

  it('should store a name', function() {
    expect(traveler.name).to.equal('Jane Doe');
  });

  it('should store what type of traveler he or she is', function() {
    expect(traveler.travelerType).to.equal('thrill-seeker');
  });

  it('should return traveler first name', function() {
    expect(traveler.returnFirstName(1)).to.equal('Jane');
  });


  });
