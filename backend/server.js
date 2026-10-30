import 'dotenv/config'
import connectDB from './src/config/database.js'
import { app } from './src/app.js'

const port = process.env.PORT || 3000

// Start the HTTP server first so demo login works even if MongoDB is down.
app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}`)
})

connectDB()