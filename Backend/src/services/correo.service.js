import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",               
  secure: true,             
  auth: {
    user: "gabriels.guzmanc@gmail.com",
    pass: "mgit sjck vfbd plwb", 
  },
  tls : {
    rejectUnauthorized: false,
  },
});
