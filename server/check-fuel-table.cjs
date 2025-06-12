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

async function checkFuelTable() {
  try {
    console.log('Checking app_vehiclefuel columns...');
    const fuelColumns = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'app_vehiclefuel'
      ORDER BY ordinal_position
    `);
    
    console.log('\napp_vehiclefuel columns:');
    fuelColumns.rows.forEach(row => {
      console.log(`  ${row.column_name} (${row.data_type})`);
    });

    console.log('\n\nSample data from app_vehiclefuel:');
    const fuelData = await pool.query('SELECT * FROM app_vehiclefuel LIMIT 5');
    fuelData.rows.forEach((row, index) => {
      console.log(`  Fuel ${index + 1}:`, JSON.stringify(row));
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    pool.end();
  }
}

checkFuelTable(); 