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

async function checkModelTables() {
  try {
    console.log('Checking app_vehiclemodel columns...');
    const modelColumns = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'app_vehiclemodel'
      ORDER BY ordinal_position
    `);
    
    console.log('\napp_vehiclemodel columns:');
    modelColumns.rows.forEach(row => {
      console.log(`  ${row.column_name} (${row.data_type})`);
    });

    console.log('\n\nChecking app_vehiclemake columns...');
    const makeColumns = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'app_vehiclemake'
      ORDER BY ordinal_position
    `);
    
    console.log('\napp_vehiclemake columns:');
    makeColumns.rows.forEach(row => {
      console.log(`  ${row.column_name} (${row.data_type})`);
    });

    console.log('\n\nChecking app_vehiclecategory columns...');
    const categoryColumns = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'app_vehiclecategory'
      ORDER BY ordinal_position
    `);
    
    console.log('\napp_vehiclecategory columns:');
    categoryColumns.rows.forEach(row => {
      console.log(`  ${row.column_name} (${row.data_type})`);
    });

    // Let's look at sample data from these tables
    console.log('\n\nSample data from app_vehiclemodel:');
    const modelData = await pool.query('SELECT * FROM app_vehiclemodel LIMIT 5');
    modelData.rows.forEach((row, index) => {
      console.log(`  Model ${index + 1}:`, JSON.stringify(row));
    });

    console.log('\n\nSample data from app_vehiclemake:');
    const makeData = await pool.query('SELECT * FROM app_vehiclemake LIMIT 5');
    makeData.rows.forEach((row, index) => {
      console.log(`  Make ${index + 1}:`, JSON.stringify(row));
    });

    console.log('\n\nSample data from app_vehiclecategory:');
    const categoryData = await pool.query('SELECT * FROM app_vehiclecategory LIMIT 5');
    categoryData.rows.forEach((row, index) => {
      console.log(`  Category ${index + 1}:`, JSON.stringify(row));
    });

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    pool.end();
  }
}

checkModelTables(); 