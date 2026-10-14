import 'dotenv/config'
import connectDB from './src/config/database.js'
import { app } from './src/app.js'

const port = process.env.PORT

connectDB()
.then(() => {
    app.listen(port, () => {
    console.log(`App listening on port ${port}`)})
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
})