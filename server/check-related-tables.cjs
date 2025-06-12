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

async function checkRelatedTables() {
  try {
    // Check what related tables exist
    console.log('Checking for related tables...');
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE '%vehicle%'
      OR table_name LIKE '%model%'
      OR table_name LIKE '%category%'
      OR table_name LIKE '%fuel%'
      OR table_name LIKE '%location%'
      ORDER BY table_name
    `);
    
    console.log('\nRelated tables found:');
    tables.rows.forEach(row => {
      console.log(`  ${row.table_name}`);
    });

    // Now let's check the subscription car with JOIN to get actual model names
    console.log('\n\nChecking subscription car with JOINs...');
    const subscriptionWithJoin = await pool.query(`
      SELECT 
        fc.id,
        fc.registration_number,
        fc.description,
        fc.year,
        fc.subscription_plan1,
        fc.image1,
        fc.image2,
        fc.image3,
        fc.status,
        vm.model as model_name,
        vmake.make as make_name,
        vc.name as category_name,
        vf.type_name as fuel_type_name,
        l.name as location_name
      FROM faithauto_carsubscription fc
      LEFT JOIN app_vehiclemodel vm ON fc.model_id = vm.id
      LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
      LEFT JOIN app_vehiclecategory vc ON fc.vehicle_category_id = vc.id  
      LEFT JOIN app_vehiclefuel vf ON fc.fuel_type_id = vf.id
      LEFT JOIN app_location l ON fc.location_id = l.id
      LIMIT 3
    `);
    
    console.log('\nSubscription cars with details:');
    subscriptionWithJoin.rows.forEach((row, index) => {
      console.log(`\nCar ${index + 1}:`);
      console.log('  ID:', row.id);
      console.log('  Registration:', row.registration_number);
      console.log('  Make:', row.make_name || 'NULL');
      console.log('  Model:', row.model_name || 'NULL');
      console.log('  Category:', row.category_name || 'NULL');
      console.log('  Fuel Type:', row.fuel_type_name || 'NULL');
      console.log('  Location:', row.location_name || 'NULL');
      console.log('  Description:', row.description || 'NULL');
      console.log('  Year:', row.year);
      console.log('  Price:', row.subscription_plan1);
      console.log('  Image1:', row.image1 || 'NULL');
      console.log('  Image2:', row.image2 || 'NULL'); 
      console.log('  Status:', row.status);
    });

    // Check second-hand cars too
    console.log('\n\nChecking second-hand cars with JOINs...');
    const secondHandWithJoin = await pool.query(`
      SELECT 
        fc.id,
        fc.registration_number,
        fc.description,
        fc.year,
        fc.price,
        fc.image1,
        fc.image2,
        fc.status,
        vm.model as model_name,
        vmake.make as make_name,
        vc.name as category_name,
        vf.type_name as fuel_type_name,
        l.name as location_name
      FROM faithauto_secondhandcar fc
      LEFT JOIN app_vehiclemodel vm ON fc.model_id = vm.id
      LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
      LEFT JOIN app_vehiclecategory vc ON fc.vehicle_category_id = vc.id  
      LEFT JOIN app_vehiclefuel vf ON fc.fuel_type_id = vf.id
      LEFT JOIN app_location l ON fc.location_id = l.id
      LIMIT 3
    `);
    
    console.log('\nSecond-hand cars with details:');
    secondHandWithJoin.rows.forEach((row, index) => {
      console.log(`\nCar ${index + 1}:`);
      console.log('  ID:', row.id);
      console.log('  Registration:', row.registration_number);
      console.log('  Make:', row.make_name || 'NULL');
      console.log('  Model:', row.model_name || 'NULL');
      console.log('  Category:', row.category_name || 'NULL');
      console.log('  Fuel Type:', row.fuel_type_name || 'NULL');
      console.log('  Location:', row.location_name || 'NULL');
      console.log('  Description:', row.description || 'NULL');
      console.log('  Year:', row.year);
      console.log('  Price:', row.price);
      console.log('  Image1:', row.image1 || 'NULL');
      console.log('  Status:', row.status);
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    pool.end();
  }
}

checkRelatedTables(); 