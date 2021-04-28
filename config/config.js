const env = process.env.NODE_ENV || 'development';

require('dotenv').config();

const config = {
  test: {
    server: {
      port: process.env.PORT || 3100,
      hostname: process.env.HOSTNAME || 'localhost',
      username:'root',
      password:'root@123',
      database:'CMS'
    },
    // database: {
    //   url: 'mongodb://localhost/express-test',
    // },
  },

  development: {
    server: {
      port: process.env.PORT || 3000,
      hostname: process.env.HOSTNAME || 'localhost',
    },
    username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root@123',
      database: process.env.DB_NAME|| 'CMS',
      dialect:  process.env.DB_DIALECT || 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
  },


  production: {
    server: {
      port: process.env.PORT || 3200,
      hostname: process.env.HOSTNAME || 'localhost',
    },
    database: {
      url: 'mongodb://mongo:27017/express-production',
    },
  },
};

config[env].isDev = env === 'development';
config[env].isTest = env === 'test';
config[env].isProd = env === 'production';

module.exports = config[env];
