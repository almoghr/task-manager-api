const sgMail = require('@sendgrid/mail')
const APIKEY = require('../../secrets.js')

sgMail.setApiKey(APIKEY)

const SendWelcomeEmail = (email, name) => {
    sgMail.send({
    to: email,
    from: 'almoghr36@gmail.com',
    subject: 'Test',
    text: 'Testing sendgrid for my task app'
})

}