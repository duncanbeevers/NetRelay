const iopi = require('../lib/iopi');

const busAddresses = [0x20, 0x21];
const buses = busAddresses.map((busAddress) => new iopi(busAddress));

function setup() {
  return new Promise((resolve, reject) => {
    buses.forEach((bus) => {
      bus.setPortDirection(0, 0x00);
      bus.setPortDirection(1, 0x00);
    });

    resolve({ buses });
  });
}

module.exports = setup;
