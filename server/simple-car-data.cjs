const { Pool } = require('pg');

const pool = new Pool({
  user: 'melbournerushcarrental',
  password: 'rushrcm@250401',
  host: 'all-data-for-sql.postgres.database.azure.com',
  database: 'rush-website-and-management-system',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

async function showSimpleCarData() {
  try {
    console.log('='.repeat(80));
    console.log('SUBSCRIPTION CARS DATA (Basic)');
    console.log('='.repeat(80));
    
    const subscriptionData = await pool.query(`
      SELECT * FROM faithauto_carsubscription 
      ORDER BY created_at DESC
    `);
    
    console.log(`Found ${subscriptionData.rows.length} subscription cars:\n`);
    
    subscriptionData.rows.forEach((row, index) => {
      console.log(`--- Subscription Car ${index + 1} ---`);
      console.log('ID:', row.id);
      console.log('Registration:', row.registration_number || 'NULL');
      console.log('Year:', row.year || 'NULL');
      console.log('Mileage:', row.mileage || 'NULL');
      console.log('Status:', row.status || 'NULL');
      console.log('Description:', row.description || 'NULL');
      console.log('Model ID:', row.model_id || 'NULL');
      console.log('Vehicle Category ID:', row.vehicle_category_id || 'NULL');
      console.log('Fuel Type ID:', row.fuel_type_id || 'NULL');
      console.log('Location ID:', row.location_id || 'NULL');
      console.log('Subscription Plan 1:', row.subscription_plan1 || 'NULL');
      console.log('Subscription Plan 2:', row.subscription_plan2 || 'NULL');
      console.log('Subscription Plan 3:', row.subscription_plan3 || 'NULL');
      console.log('Image 1:', row.image1 || 'NULL');
      console.log('Image 2:', row.image2 || 'NULL');
      console.log('Image 3:', row.image3 || 'NULL');
      console.log('Image 4:', row.image4 || 'NULL');
      console.log('Image 5:', row.image5 || 'NULL');
      console.log('Created At:', row.created_at);
      console.log();
    });

    console.log('\n' + '='.repeat(80));
    console.log('SECOND-HAND CARS DATA (Basic)');
    console.log('='.repeat(80));
    
    const secondHandData = await pool.query(`
      SELECT * FROM faithauto_secondhandcar 
      ORDER BY created_at DESC
    `);
    
    console.log(`Found ${secondHandData.rows.length} second-hand cars:\n`);
    
    secondHandData.rows.forEach((row, index) => {
      console.log(`--- Second-Hand Car ${index + 1} ---`);
      console.log('ID:', row.id);
      console.log('Registration:', row.registration_number || 'NULL');
      console.log('Year:', row.year || 'NULL');
      console.log('Mileage:', row.mileage || 'NULL');
      console.log('Price:', row.price || 'NULL');
      console.log('Status:', row.status || 'NULL');
      console.log('Description:', row.description || 'NULL');
      console.log('Model ID:', row.model_id || 'NULL');
      console.log('Vehicle Category ID:', row.vehicle_category_id || 'NULL');
      console.log('Fuel Type ID:', row.fuel_type_id || 'NULL');
      console.log('Location ID:', row.location_id || 'NULL');
      console.log('Image 1:', row.image1 || 'NULL');
      console.log('Image 2:', row.image2 || 'NULL');
      console.log('Image 3:', row.image3 || 'NULL');
      console.log('Image 4:', row.image4 || 'NULL');
      console.log('Image 5:', row.image5 || 'NULL');
      console.log('Created At:', row.created_at);
      console.log();
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    pool.end();
  }
}

showSimpleCarData(); 