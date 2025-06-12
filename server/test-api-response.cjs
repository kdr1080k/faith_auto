const http = require('http');

function testAPI() {
  const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/api/cars?category=subscription',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const cars = JSON.parse(data);
        console.log('API Response:');
        console.log(JSON.stringify(cars, null, 2));
        
        if (cars.length > 0) {
          console.log('\nFirst car image URL:');
          console.log(cars[0].image || 'No image field found');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        console.log('Raw response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error);
  });

  req.end();
}

testAPI(); 