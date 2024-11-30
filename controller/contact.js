import { ContactModel } from "../model/contact.js";
import { submitContactValidator } from "../validators/contact.js";
import { mailTransporter } from "../utils/mail.js";

export const submitContact = async (req, res, next) => {
    try {
    
        //validate request
        const {error, value} = submitContactValidator.validate(req.body);
    // validation error
        if (error) {
            return res.status(422).json(error);
        }
        const Messages = await ContactModel.create(value);
        
        // Send a notification about the ticket creation
        await mailTransporter.sendMail({
            from: `Portfolio Notification <byourself77by@gmail.com>`,
            to: 'byourself77by@gmail.com',
            replyTo: `${value.email}`,
            subject: `New email received from client - ${value.email}`,
            text: `${value.message}`
        });
    
        res.status(201).json(`Message successfully sent to Davida`)
} catch (error) {
    next(error);
}
}