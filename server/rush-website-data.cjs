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

async function showRushWebsiteData() {
  try {
    console.log('='.repeat(80));
    console.log('RUSH WEBSITE CAR SUBSCRIPTION LIST');
    console.log('='.repeat(80));
    
    // First, let's check what columns exist in this table
    console.log('Checking table structure...\n');
    const columns = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'rushwebsite_carsubscription'
      ORDER BY ordinal_position
    `);
    
    console.log('Columns in rushwebsite_carsubscription:');
    columns.rows.forEach(row => {
      console.log(`  ${row.column_name} (${row.data_type})`);
    });
    
    console.log('\n' + '='.repeat(80));
    console.log('RUSH WEBSITE CAR SUBSCRIPTION DATA');
    console.log('='.repeat(80));
    
    const rushData = await pool.query(`
      SELECT * FROM rushwebsite_carsubscription 
      ORDER BY created_at DESC
    `);
    
    console.log(`\nFound ${rushData.rows.length} cars in Rush Website Car Subscription:\n`);
    
    rushData.rows.forEach((row, index) => {
      console.log(`--- Rush Car ${index + 1} ---`);
      // Display all available columns
      Object.keys(row).forEach(key => {
        console.log(`${key}:`, row[key] || 'NULL');
      });
      console.log();
    });

    // If there are related tables, let's try to join with them
    if (rushData.rows.length > 0) {
      console.log('\n' + '='.repeat(80));
      console.log('RUSH WEBSITE CARS WITH DETAILED INFO (JOINs)');
      console.log('='.repeat(80));
      
      try {
        const detailedData = await pool.query(`
          SELECT 
            rw.*,
            vm.model_name,
            vmake.name as make_name,
            vc.name as category_name,
            vf.fuel_type as fuel_type_name,
            l.name as location_name
          FROM rushwebsite_carsubscription rw
          LEFT JOIN app_vehiclemodel vm ON rw.model_id = vm.id
          LEFT JOIN app_vehiclemake vmake ON vm.make_id = vmake.id
          LEFT JOIN app_vehiclecategory vc ON rw.vehicle_category_id = vc.id  
          LEFT JOIN app_vehiclefuel vf ON rw.fuel_type_id = vf.id
          LEFT JOIN app_location l ON rw.location_id = l.id
          ORDER BY rw.created_at DESC
        `);
        
        console.log(`\nDetailed Rush Website cars:\n`);
        
        detailedData.rows.forEach((row, index) => {
          console.log(`--- Rush Car ${index + 1} (Detailed) ---`);
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
          console.log('Created At:', row.created_at);
          console.log();
        });
        
      } catch (joinError) {
        console.log('Could not fetch detailed info with JOINs:', joinError.message);
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    pool.end();
  }
}

showRushWebsiteData(); 