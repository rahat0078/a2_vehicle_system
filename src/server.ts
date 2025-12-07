import config from './config';
import app from './app';
import { initDB } from './config/db';


const port = config.port

initDB()



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});