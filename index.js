require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const PORT = 8000;
const URL = 'https://www.fsu.ca/jobs';
const text = 'There are no current Hospitality job postings.'
let title = '';
let siblingText = '';
let myResponse = 'No changes found.';

const app = express();
app.listen(PORT, () => console.log('Server running on PORT ' + PORT) );

function sendEmail(data) {
  const email = process.env.EMAIL;
  const emailPassword = process.env.EMAIL_PASSWORD;
  
  // Configure your email transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: email, // Replace with your email address
      pass: emailPassword, // Replace with your email password or app password
    },
  });

  const mailOptions = {
    from: email, // Replace with your email address
    to: email, // Replace with the recipient's email address
    subject: '[FSU] Web Scraper Alert',
    text: `${data}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

async function scrapeWebsite() {
  const now = new Date();
  const currentDateTime = now.toLocaleString();

  try{
    const response = await axios.get(URL);
    const $ = cheerio.load(response.data);
    const scrapedData = $('h3:contains("Hospitality")');
    
    scrapedData?.each((i, element) => {
      title = $(element).text(); // H3 text
      siblingText = $(element).next().text(); // Text from the H3 next sibling (it can be a <span> or a list(<ul>))
    });

    if(siblingText !== text){
      myResponse = `Title: ${title}, Text: ${siblingText}`;
      sendEmail(myResponse);
    }

    app.get('/', (req, res) => {
      res.send(`${myResponse}  ${currentDateTime}`);
    });
    
    console.log(`${myResponse}  ${currentDateTime}`);
  } catch(error) {
    console.log(`Error scraping website: ${error}`)
  }
}

// Schedule the scraping task to run every hour
// https://www.netiq.com/documentation/cloud-manager-2-5/ncm-reference/data/bexyssf.html
cron.schedule('0 * * * *', () => {
  scrapeWebsite();
});

scrapeWebsite();


