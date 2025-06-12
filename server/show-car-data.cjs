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

async function showCarData() {
  try {
    console.log('='.repeat(80));
    console.log('SUBSCRIPTION CARS DATA');
    console.log('='.repeat(80));
    
    const subscriptionData = await pool.query(`
      SELECT 
        fc.id,
        fc.registration_number,
        fc.year,
        fc.mileage,
        fc.status,
        fc.description,
        fc.subscription_plan1,
        fc.subscription_plan2,
        fc.subscription_plan3,
        fc.image1,
        fc.image2,
        fc.image3,
        fc.image4,
        fc.image5,
        fc.created_at,
        vm.model_name,
        vmake.name as make_name,
        vc.name as category_name,
                 vf.fuel_type as fuel_type_name,
         l.name as location_name
       FROM faithauto_carsubscription fc
      LEFT JOIN app_vehiclemodel vm ON fc.model_id = vm.id
      LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
      LEFT JOIN app_vehiclecategory vc ON fc.vehicle_category_id = vc.id  
      LEFT JOIN app_vehiclefuel vf ON fc.fuel_type_id = vf.id
      LEFT JOIN app_location l ON fc.location_id = l.id
      ORDER BY fc.created_at DESC
    `);
    
    console.log(`Found ${subscriptionData.rows.length} subscription cars:\n`);
    
    subscriptionData.rows.forEach((row, index) => {
      console.log(`--- Subscription Car ${index + 1} ---`);
      console.log('ID:', row.id);
      console.log('Registration:', row.registration_number || 'NULL');
      console.log('Make:', row.make_name || 'NULL');
      console.log('Model:', row.model_name || 'NULL');
      console.log('Category:', row.category_name || 'NULL');
      console.log('Year:', row.year || 'NULL');
      console.log('Mileage:', row.mileage || 'NULL');
      console.log('Fuel Type:', row.fuel_type_name || 'NULL');
      console.log('Location:', row.location_name || 'NULL');
      console.log('Status:', row.status || 'NULL');
      console.log('Description:', row.description || 'NULL');
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
    console.log('SECOND-HAND CARS DATA');
    console.log('='.repeat(80));
    
    const secondHandData = await pool.query(`
      SELECT 
        fc.id,
        fc.registration_number,
        fc.year,
        fc.mileage,
        fc.price,
        fc.status,
        fc.description,
        fc.image1,
        fc.image2,
        fc.image3,
        fc.image4,
        fc.image5,
        fc.created_at,
        vm.model_name,
        vmake.name as make_name,
        vc.name as category_name,
                 vf.fuel_type as fuel_type_name,
         l.name as location_name
       FROM faithauto_secondhandcar fc
      LEFT JOIN app_vehiclemodel vm ON fc.model_id = vm.id
      LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
      LEFT JOIN app_vehiclecategory vc ON fc.vehicle_category_id = vc.id  
      LEFT JOIN app_vehiclefuel vf ON fc.fuel_type_id = vf.id
      LEFT JOIN app_location l ON fc.location_id = l.id
      ORDER BY fc.created_at DESC
    `);
    
    console.log(`Found ${secondHandData.rows.length} second-hand cars:\n`);
    
    secondHandData.rows.forEach((row, index) => {
      console.log(`--- Second-Hand Car ${index + 1} ---`);
      console.log('ID:', row.id);
      console.log('Registration:', row.registration_number || 'NULL');
      console.log('Make:', row.make_name || 'NULL');
      console.log('Model:', row.model_name || 'NULL');
      console.log('Category:', row.category_name || 'NULL');
      console.log('Year:', row.year || 'NULL');
      console.log('Mileage:', row.mileage || 'NULL');
      console.log('Fuel Type:', row.fuel_type_name || 'NULL');
      console.log('Location:', row.location_name || 'NULL');
      console.log('Status:', row.status || 'NULL');
      console.log('Description:', row.description || 'NULL');
      console.log('Price:', row.price || 'NULL');
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

showCarData(); 