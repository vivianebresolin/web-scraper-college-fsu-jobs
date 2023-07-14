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
let myResponse = '';

const app = express();
// Start the server
app.listen(PORT, () => console.log('Server running on port ' + PORT) );

// Function to send an email notification
function sendEmail(data) {
  const email = process.env.EMAIL;
  const emailPassword = process.env.EMAIL_PASSWORD;
  
  // Configure the email transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: email,
      pass: emailPassword,
    },
  });

  const mailOptions = {
    from: email,
    to: email,
    subject: '[FSU] Web Scraper Alert',
    text: `${data}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Function to scrape the website and compare results
async function scrapeWebsite() {
  const now = new Date();
  const currentDateTime = now.toLocaleString();

  try{
    const response = await axios.get(URL);
    const $ = cheerio.load(response.data);
    const scrapedData = $('h3:contains("Hospitality")');
    
    scrapedData?.each((i, element) => {
      title = $(element).text(); // In my example, it is an H3 text
      siblingText = $(element).next().text(); // In my example, it is a text from the H3 next sibling (it can be a <span> or a list(<ul>))
    });

    if(siblingText !== text){
      myResponse = `Title: ${title}, Text: ${siblingText}. [${currentDateTime}]`;
      sendEmail(myResponse);
    }

    myResponse = `No changes found. [${currentDateTime}]`;
    
    console.log(myResponse);
  } catch(error) {
    console.log(`Error scraping website: ${error}`)
  }
}

// Express route to trigger the scraper manually
app.get('/', (_, res) => {
  scrapeWebsite();
  res.send(myResponse);
});

// Schedule the scraping task to run every hour
// https://www.netiq.com/documentation/cloud-manager-2-5/ncm-reference/data/bexyssf.html
cron.schedule('0 * * * *', () => {
  scrapeWebsite();
});

scrapeWebsite();


