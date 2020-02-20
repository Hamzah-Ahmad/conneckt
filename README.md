A basic MERN auth system with email and pasdword authentication, along with password reset function.
Add your email and password in the places marked by comment, (inside the mailOptions function) in the auth.js route file
Remember to change mongoDB uri and the http link in nodemailer options in the auth.js route file depending on whether your'e in production. Also, allow less secure apps to access your gmail account, and allow unknown singins by going to: https: //accounts.google.com/DisplayUnlockCaptcha
Inside auth.js, in mail options text:
Use this as the link sent with the reset email in development
http://localhost:3000/reset/${token}\n\n
Use this as the link sent with the reset email in production
`https://${req.headers.host}/reset/${token}\n\n
