import nodemailer from 'nodemailer';

// ZohoMail SMTP Configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.ZOHO_EMAIL, // Your ZohoMail email
      pass: process.env.ZOHO_PASSWORD, // Your ZohoMail app password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

export const sendReplyEmail = async (recipientEmail, recipientName, subject, message, senderName) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: {
        name: senderName || 'Your App Name',
        address: process.env.ZOHO_EMAIL,
      },
      to: recipientEmail,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reply to Your Message</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8fafc;
            }
            .container {
              background: white;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              border-bottom: 3px solid #4f46e5;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              margin: 0;
              color: #4f46e5;
              font-size: 24px;
            }
            .content {
              margin-bottom: 30px;
              padding: 20px;
              background-color: #f8fafc;
              border-radius: 6px;
              border-left: 4px solid #4f46e5;
            }
            .footer {
              border-top: 1px solid #e5e7eb;
              padding-top: 20px;
              font-size: 14px;
              color: #6b7280;
              text-align: center;
            }
            .reply-button {
              display: inline-block;
              background-color: #4f46e5;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 500;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Reply to Your Message</h1>
            </div>
            
            <p>Hello ${recipientName},</p>
            
            <p>You have received a reply to your message:</p>
            
            <div class="content">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <p>Best regards,<br>
            ${senderName || 'Your App Team'}</p>
            
            <div class="footer">
              <p>This is an automated message. Please do not reply directly to this email.</p>
              <p>If you need further assistance, please visit our website or contact us through the appropriate channels.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Hello ${recipientName},

        You have received a reply to your message:

        ${message}

        Best regards,
        ${senderName || 'Your App Team'}

        ---
        This is an automated message. Please do not reply directly to this email.
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export default sendReplyEmail;