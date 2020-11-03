var nodemailer = require('nodemailer');
module.exports = {
 
    dbconfig: {

    server: "Yourhost",
    user: "Userdatabase",
    password: "Passwd",
    options: {
        port: 1433,//49161,
        database: 'YourDataBase',
        connectionTimeout : 150000,
        //instancename: 'SQLEXPRESS'
      }

},

 
 var email : {
    from: 'emailsend@domain.com', // Quem enviou este e-mail
    to: 'yourmail@domain.com', // Quem receberá
    subject: 'Failed',  
    html: '<strong>Title</strong><br>Body Mail' // O conteúdo do e-mail
  },


//connect email account

    transporte : nodemailer.createTransport({
    service: 'Gmail', // use your email system
    auth: {
        user: 'youraccount@gmail.com', // add your email account
        pass: 'yourpassword'             // your password
        } 
})
 

}
