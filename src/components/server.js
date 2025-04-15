const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru', // SMTP host для Яндекс.Почты
    port: 465, // или 587 (если TLS)
    secure: true, // true для 465, false для других портов (TLS)
    auth: {
        user: 'danilzulfikarov@yandex.ru', // Ваш email на Яндексе
        pass: '4Uj-MKJ-LXX-AJv' // Пароль приложения или пароль от почты
    }
});

app.post('/send-email', upload.single('file'), async (req, res) => {
    try {
        const { fio, organization, email, message } = req.body;
        const file = req.file;

        let attachments = [];
        if (file) {
            attachments.push({
                filename: file.originalname,
                content: file.buffer,
                contentType: file.mimetype
            });
        }

        const mailOptions = {
            from: 'obrazovatelnaiprogramm@gmail.com', // Ваш email
            to: 'obrazovatelnaiprogramm@gmail.com', // Email получателя
            subject: 'Сообщение с формы обратной связи',
            text: `
                ФИО: ${fio}
                Организация: ${organization}
                Email: ${email}
                Сообщение: ${message}
            `,
            attachments: attachments
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send('Сообщение успешно отправлено!');
    } catch (error) {
        console.error('Ошибка при отправке:', error);
        res.status(500).send('Ошибка при отправке сообщения.');
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});