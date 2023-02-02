// **importing the 'nodemailer'
var nodeMailer = require('nodemailer');
var fs = require('fs');

var auth = require('./config.json');

// **Add Gmail SMTP driver with Nodemailer
// var mailSender = nodeMailer.createTransport({
//     service : 'gmail',
//     auth: {
//         user: auth.user,
//         pass: auth.pass
//     }
// }
// );


// ** Sending your mail via SMTP */
var mailSender = nodeMailer.createTransport({
    host: auth.host,
    port: auth.port,
    secure: auth.secure,
    auth: {
        user: auth.user,
        pass: auth.pass
    }
})



//** sending email to single receipt with attachment */
var mailObject = {
    from: auth.user,
    to: "admin@mail.com",
    subject: "Send Email via node js",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia.\n\nTech Team",
    attachments: [{   // utf-8 string as an attachment
         filename: 'text1.txt',
         content: 'hello world!'
     },
     {   // binary buffer as an attachment
         filename: 'text2.txt',
         content: new Buffer('hello world!','utf-8')
     },
     {   // file on disk as an attachment
         filename: 'text3.txt',
         path: './attachment/text9.txt' // stream this file
     },
     {   // filename and content type is derived from path
         path: './attachment/text9.txt'
     },
     {   // stream as an attachment
         filename: 'text4.txt',
         content: fs.createReadStream('./attachment/text9.txt')
     },
     {   // define custom content type for the attachment
         filename: 'text.bin',
         content: 'hello world!',
         contentType: 'text/plain'
     },
     {   // use URL as an attachment
         filename: 'license.txt',
         path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
     },
     {   // encoded string as an attachment
         filename: 'text1.txt',
         content: 'aGVsbG8gd29ybGQh',
         encoding: 'base64'
     },
     {   // data uri as an attachment
         path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
     }
]
};

mailSender.sendMail(mailObject, function(error, info) {
    if (error) {
        console.log(error)
    } else {
        console.log("Email sent: " + info.response)
    }
});
