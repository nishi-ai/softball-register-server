const config = require('config');
const sgMail = require('@sendgrid/mail');

const sgapiKey = config.get('api_key.SENDGRID');
sgMail.setApiKey(sgapiKey);
const recipient = config.get('recipient.to');
const sender = config.get('sender.from');
const signedUptemplate_id = config.get('email_template.SIGN_UP');

const sendEmail = async (emailParams) => {
    try {
        await sgMail.send(emailParams)
    } catch(error) {
        console.log(error);

        if (error.response) {
            console.error(error.response.body)
        }
    }
}

const getAdminEmailObject = (name, email, date) => {
    return {
        to: recipient,
        from: sender,
        subject: 'New registraion to your team!',
        html: `<p>Dear Admin</p>
                <p> You got a registraion to our team!</p>
                Name: ${name}<br>
                Email: ${email}<br>
                Registered at: ${date}
            `
    }
};

const getSignedUpEmailObject = (email, name) => {
    return {
        to: email,
        from: sender,
        templateId : signedUptemplate_id,
        dynamicTemplateData : {
            name: name
        }
    };
};

const sendAdminEmail = async (name, email, date) => {
    const message = getAdminEmailObject(name, email, date);
    await sendEmail(message);
};

const sendSignedUpEmail = async (email, name) => {
    const message = getSignedUpEmailObject(email, name);
    await sendEmail(message);
};

module.exports = {
    sendAdminEmail,
    sendSignedUpEmail
};