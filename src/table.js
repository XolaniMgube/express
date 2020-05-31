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

class Visitors {
    async addVisitor(name, age, date, time, assistedBy, comments) {
      
        try{
          await client.connect()
          await client.query("BEGIN")
          let data = await client.query("insert into visitors (visitor_name, visitor_age, date_of_visit, time_of_visit, assisted_by, comments) values ($1, $2, $3, $4, $5, $6) RETURNING *", [name, age, date, time, assistedBy, comments])
          console.log("Inserted a new row")
          await client.query("COMMIT")
          await client.end()
          console.log(data.rows)
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

// let newVisit = new Visitors()
// newVisit.addVisitor("xolani", 11, "10-10-10", "20:00", "xoske", "time of visitor")

module.exports = Visitors