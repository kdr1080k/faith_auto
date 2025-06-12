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

async function showFaithAutoData() {
  try {
    console.log('='.repeat(80));
    console.log('FAITH AUTO CAR SUBSCRIPTION LIST');
    console.log('='.repeat(80));
    
    // First, let's check what columns exist in this table
    console.log('Checking table structure...\n');
    const columns = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'faithauto_carsubscription'
      ORDER BY ordinal_position
    `);
    
    console.log('Columns in faithauto_carsubscription:');
    columns.rows.forEach(row => {
      console.log(`  ${row.column_name} (${row.data_type})`);
    });
    
    console.log('\n' + '='.repeat(80));
    console.log('FAITH AUTO CAR SUBSCRIPTION DATA');
    console.log('='.repeat(80));
    
    const faithData = await pool.query(`
      SELECT * FROM faithauto_carsubscription 
      ORDER BY created_at DESC
    `);
    
    console.log(`\nFound ${faithData.rows.length} cars in Faith Auto Car Subscription:\n`);
    
    faithData.rows.forEach((row, index) => {
      console.log(`--- Faith Auto Car ${index + 1} ---`);
      // Display all available columns
      Object.keys(row).forEach(key => {
        console.log(`${key}:`, row[key] || 'NULL');
      });
      console.log();
    });

    // Now let's show the second-hand cars as well
    console.log('\n' + '='.repeat(80));
    console.log('FAITH AUTO SECOND-HAND CAR DATA');
    console.log('='.repeat(80));
    
    const secondHandData = await pool.query(`
      SELECT * FROM faithauto_secondhandcar 
      ORDER BY created_at DESC
    `);
    
    console.log(`\nFound ${secondHandData.rows.length} cars in Faith Auto Second-Hand:\n`);
    
    secondHandData.rows.forEach((row, index) => {
      console.log(`--- Faith Auto Second-Hand Car ${index + 1} ---`);
      // Display all available columns
      Object.keys(row).forEach(key => {
        console.log(`${key}:`, row[key] || 'NULL');
      });
      console.log();
    });

    // Try to get detailed info with JOINs (without problematic location join)
    console.log('\n' + '='.repeat(80));
    console.log('FAITH AUTO CARS WITH DETAILED INFO (JOINs)');
    console.log('='.repeat(80));
    
    try {
      const detailedData = await pool.query(`
        SELECT 
          fc.*,
          vm.model_name,
          vmake.name as make_name,
          vc.name as category_name,
          vf.fuel_type as fuel_type_name
        FROM faithauto_carsubscription fc
        LEFT JOIN app_vehiclemodel vm ON fc.model_id = vm.id
        LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
        LEFT JOIN app_vehiclecategory vc ON fc.vehicle_category_id = vc.id  
        LEFT JOIN app_vehiclefuel vf ON fc.fuel_type_id = vf.id
        ORDER BY fc.created_at DESC
      `);
      
      console.log(`\nDetailed Faith Auto subscription cars:\n`);
      
      detailedData.rows.forEach((row, index) => {
        console.log(`--- Faith Auto Car ${index + 1} (Detailed) ---`);
        console.log('ID:', row.id);
        console.log('Registration:', row.registration_number || 'NULL');
        console.log('Make:', row.make_name || 'NULL');
        console.log('Model:', row.model_name || 'NULL');
        console.log('Category:', row.category_name || 'NULL');
        console.log('Year:', row.year || 'NULL');
        console.log('Mileage:', row.mileage || 'NULL');
        console.log('Fuel Type:', row.fuel_type_name || 'NULL');
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
      
    } catch (joinError) {
      console.log('Could not fetch detailed info with JOINs:', joinError.message);
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    pool.end();
  }
}

showFaithAutoData(); 