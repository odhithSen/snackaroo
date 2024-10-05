import { sequelize } from './models'
import config from './config'

import app from './app'

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(config.PORT, () => {
      console.log(`App listening at http://localhost:${config.PORT}`)
    })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
