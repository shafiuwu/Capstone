const nodemailer = require('nodemailer');

const enviarCorreo = async (email, subject, htmlContent) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "teamimpulsa02@gmail.com",
            pass: "ghlk lzzx vasp bhkt", // tu contraseña o token de aplicación
        },
    });

    const mailOptions = {
        from: "teamimpulsa02@gmail.com",
        to: email,
        subject: subject,
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado a:', email);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('No se pudo enviar el correo');
    }
};


module.exports = { enviarCorreo };
