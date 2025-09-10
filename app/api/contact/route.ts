import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email, message, name } = await req.json();
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASS,
    },
  });

  const mailOptions = {
    from: '"Studio daivikah" <process.env.EMAIL>',
    to: email,
    subject: "Thanks for your Inquiry",
    html: `
   <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Inquiry</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #007bff;
            padding: 10px;
            text-align: center;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
        }

        .content {
            padding: 20px;
        }

        .footer {
            font-size: 12px;
            color: #888888;
            text-align: center;
            margin-top: 20px;
        }

        .btn {
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
        }

        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Your Inquiry!</h1>
        </div>

        <div class="content">
            <p>Dear ${name},</p>

            <p>Thank you for reaching out to Studio daivikah! We have received your inquiry and our team is already reviewing it. We will get back to you as soon as possible with more information.</p>

            <p>In the meantime, if you have any further questions or need immediate assistance, feel free to contact us directly by replying to this email.</p>

            <p>Best regards,</p>
            <p>Studio daivikah Team</p>

            <a href="https://studiodaivikah.com" class="btn">Visit Our Website</a>
        </div>

        <div class="footer">
            <p>&copy; Studio daivikah, All rights reserved.</p>
        </div>
    </div>
</body>

</html>
    `,
  };

  const mailOptionsStudio = {
    from: '"Studio daivikah" <process.env.EMAIL>',
    to: process.env.EMAIL,
    subject: "Studio daivikah Inquiry",
    html: `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry from ${name}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            background-color: #007bff;
            padding: 10px;
            text-align: center;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
        }

        .content {
            padding: 20px;
        }

        .footer {
            font-size: 12px;
            color: #888888;
            text-align: center;
            margin-top: 20px;
        }

        .btn {
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
        }

        .btn:hover {
            background-color: #0056b3;
        }

        .inquiry-details {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #007bff;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>New Inquiry Received!</h1>
        </div>

        <div class="content">
            <p>Dear Studio daivikah Team,</p>

            <p>You have received a new inquiry through your website contact form.</p>

            <div class="inquiry-details">
                <h3>Contact Details:</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                
                <h3>Message:</h3>
                <p>${message}</p>
            </div>

            <p>Please respond to this inquiry promptly to maintain excellent customer service.</p>

            <a href="https://studiodaivikah.com" class="btn">Visit Website</a>
        </div>

        <div class="footer">
            <p>&copy; Studio daivikah, All rights reserved.</p>
        </div>
    </div>
</body>

</html>
    `,
  };

  try {
    const infoClient = await transporter.sendMail(mailOptions);
    const infoStudio = await transporter.sendMail(mailOptionsStudio);
    return NextResponse.json({
      status: 201,
      response1: infoClient,
      response2: infoStudio,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ status: 402, error: error.message });
  }
}
