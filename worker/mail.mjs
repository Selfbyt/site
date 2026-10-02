import nodemailer from "nodemailer";
import { connect } from "node:tls";

// A supplied TLS socket avoids Nodemailer's Node-specific DNS lookup path.
export async function sendContact(env, data) {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com", port: 465, secure: true,
    name: "selfbyt.com",
    auth: { user: env.GMAIL_USER, pass: env.GMAIL_APP_PASSWORD },
    connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 20000,
    getSocket(_options, callback) {
      const socket = connect({host: "smtp.gmail.com", port: 465, servername: "smtp.gmail.com"});
      let settled = false;
      const finish = (error) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (error) { socket.destroy(); callback(error); }
        else callback(null, {connection: socket, secured: true});
      };
      const timer = setTimeout(() => finish(new Error("SMTP connection timed out")), 15000);
      socket.once("error", finish);
      socket.once("secureConnect", () => finish());
    },
  });
  try {
    await transport.sendMail({
      from: env.GMAIL_USER, to: "hello@selfbyt.com", replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      disableFileAccess: true, disableUrlAccess: true,
    });
  } finally { transport.close(); }
}
