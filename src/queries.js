// requiring frameworks to use 
require('dotenv').config({path: '../.env'})
let {Client} = require('pg')

// postgres class that will start the connection
const client = new Client({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE
})

client.connect()

class Visitors {
    async createTable() {
      try{
        await client.query("BEGIN")
        await client.query(
          `create table if not exists visitors
          (visitor_id serial primary key, 
          visitor_name varchar(20),
          visitor_age int, 
          date_of_visit date, 
          time_of_visit time, 
          assisted_by varchar(20), 
          comments varchar(50))`
          );
        await client.query("COMMIT")
      }
      catch(ex){
        console.log("Failed to create table " + ex)
      }
      finally{
        console.log("script closed")
      }  
    }

    async addVisitor(name, age, date, time, assistedBy, comments) {
        try{
          await client.query("BEGIN")
          let data = await client.query(
            `insert into visitors 
            (visitor_name, visitor_age, date_of_visit, time_of_visit, assisted_by, comments) 
            values ($1, $2, $3, $4, $5, $6) 
            RETURNING *`,
            [name, age, date, time, assistedBy, comments]
            );
          console.log("Inserted a new row")
          await client.query("COMMIT")
          return data.rows
        }
        catch(ex){
          console.log("Failed to add visitor " + ex)
        }
        finally{  
          console.log("script closed")
        }
      }
}



module.exports = Visitors