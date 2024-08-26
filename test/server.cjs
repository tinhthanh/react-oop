const express = require("express");
const compression = require('compression');
const cors = require('cors');
const { chromium } = require('playwright');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4173;
const appFolder = 'dist';

const windowWidth = 320;
const windowHeight = 400;
const screenWidth = 1920; // Giả sử độ rộng màn hình là 1920 pixel
const maxBrowsersPerBatch = 5; // Số lượng tối đa mỗi lần xử lý

// Cấu hình server cho ứng dụng tĩnh
app.use(cors());
app.use(compression());
app.use(express.static(appFolder));

app.get('*', function (request, response, next) {
    if (request.path === '/noti') {
        next(); // Chuyển tiếp đến middleware API Playwright
    } else {
        response.sendFile(__dirname + '/' + appFolder + '/index.html');
    }
});

// API cho Playwright xử lý nhiều trình duyệt
app.get('/noti', async (req, res) => {
  const totalBrowsers = parseInt(req.query.count) || 1;
  const results = [];

  const numBatches = Math.ceil(totalBrowsers / maxBrowsersPerBatch);

  for (let batch = 0; batch < numBatches; batch++) {
    const batchStart = batch * maxBrowsersPerBatch;
    const batchEnd = Math.min(batchStart + maxBrowsersPerBatch, totalBrowsers);

    const browserPromises = Array.from({ length: batchEnd - batchStart }, async (value, index) => {
      const browserIndex = batchStart + index;
      const userDataDir = path.join(__dirname, 'profiles', uuidv4());
      fs.mkdirSync(userDataDir, { recursive: true });

      const x = screenWidth - windowWidth * ((browserIndex % Math.floor(screenWidth / windowWidth)) + 1);
      const y = Math.floor(browserIndex / Math.floor(screenWidth / windowWidth)) * windowHeight;

      const browser = await chromium.launchPersistentContext(userDataDir, {
        headless: false,
        permissions: ['notifications'],
        viewport: { width: windowWidth, height: windowHeight },
        args: [`--window-position=${x},${y}`]
      });

      const page = await browser.newPage();
      await page.goto(`http://localhost:${port}`);

      const context = page.context();
      await context.grantPermissions(['notifications'], { origin: `http://localhost:${port}` });

      let textContent = null;

      for (let attempt = 0; attempt < 10; attempt++) {
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (attempt > 0) {
            await page.reload();
          }

          const elementText = await page.waitForSelector('[data-show="true"]', { timeout: 10000 });
          textContent = await elementText.evaluate(node => node.innerText);
          break;

        } catch (error) {
          if (attempt === 9) {
            console.error('Failed to retrieve text after 10 attempts:', error);
          } else {
            console.log(`Attempt ${attempt + 1} failed, retrying...`);
          }
        }
      }

      await browser.close();

      if (textContent) {
        results.push(textContent);
      } else {
        results.push('Timeout: Could not retrieve text');
      }
    });

    await Promise.all(browserPromises);
  }

  res.send({
    status: 'success',
    results: results,
  });
});

// Khởi chạy server
app.listen(port, () => {
  console.log(`App and API listening at http://localhost:${port}`);
});
