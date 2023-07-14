# Web Scraper 🔍

This is a simple web scraping project that allows you to scrape a specific website for information and sends an email notification when there is a difference in the scraped data. The scraping task can be scheduled to run periodically using cron expressions.

<br>

## ✨ Features

- Web scraping using Cheerio, Axios, Express and Nodemailer
- Automated scraping task with scheduling using cron expressions
- Email notifications for changes in scraped data

<br>

## 🔑 Prerequisites

- Node.js
- npm

<br>

## 🚀 Getting Started

1. Clone the repository:
  ```
  git clone https://github.com/vivianebresolin/web-scraper-college-fsu-jobs.git
  ```

2. Install the dependencies:
```
cd web-scraper-college-fsu-jobs
npm install
```

3. Set up environment variables:
```
Create a new .env file in the project directory.
Add the following variables to the .env file:
  EMAIL=your email
  EMAIL_PASSWORD=your email password or app password
```

4. Configure the web scraper:
```
Open index.js and update the target website URL, data extraction logic, and email configuration
```

5. Start the server:
```
npm run start
```

You can also manually trigger a scraping:

- Open your web browser and visit http://localhost:8000

<br>

## ⚙️ Configuration
index.js: This is the main script file that handles web scraping, data comparison, and email notifications. Update the configuration parameters in this file.

<br>

## 📦 Dependencies
- axios: "^1.4.0"
- cheerio: "^1.0.0-rc.12"
- dotenv: "^16.3.1"
- express: "^4.18.2"
- node-cron: "^3.0.2"
- nodemailer: "^6.9.3"
- nodemon: "^3.0.1" (devDependencie)

<br>

## 🤝 Contributing
Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.

<br>
<br>
<div align="center">
  Made with 🧡 and ☕ | Find me on <a href="https://www.linkedin.com/in/vivianebresolin/"> LinkedIn</a>
</div>
<br>
