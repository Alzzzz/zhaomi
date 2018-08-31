const UserModule = require('../models/usermodule')

 module.exports = {
   async signup (ctx, next) {
     const user = {
       name: 'sunzhe',
       account: '18700000000',
       password: 'sz123456',
     };
     const result = await UserModule.create(user);
     ctx.body = result;
   },
 }
