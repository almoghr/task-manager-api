const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.sendGridApiKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'almoghr36@gmail.com',
        subject: 'Welcome to the taskApp',
        text: `Welcome to the app ${name}. let me know how you get along with my app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({ 
      to: email,
      from: 'almoghr36@gmail.com',
      subject: 'Canceling your account in the task App',
      text: `${name} im sorry to hear you wanted to cancel youre subscription, let me know if there is anything i could have done to make this app more efficient`  
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}