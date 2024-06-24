import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 12);

        if (emailType === "VERIFY") {
            const updateUser = await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpires: Date.now() + 3600000
                }
            });
        } else if (emailType === "RESET") {
            const updateUser = await User.findByIdAndUpdate
                (userId, {
                    $set: {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordExpires: Date.now() + 3600000
                    }
                });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "0cd41cf6c7e795",  //env
                pass: "634e709a2a2b12"     //env
            }
        });

        const mailOptions = {
            from: 'abhishekritu810219@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        };

        const mailresponse = await transport.sendMail(mailOptions);

        console.log('Message sent: %s', mailresponse.messageId);

        return mailresponse;
    } catch (error) {
        console.log(error, 'Error sending email');
        throw new Error('Error sending email');
    }
};
