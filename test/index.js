const express = require('express');
const { chromium } = require('playwright');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4172;

const windowWidth = 320;
const windowHeight = 400;
const screenWidth = 1920; // Giả sử độ rộng màn hình là 1920 pixel
const maxBrowsersPerBatch = 5; // Số lượng tối đa mỗi lần xử lý

app.get('/noti', async (req, res) => {
  const totalBrowsers = parseInt(req.query.count) || 1; // Nhận vào số lượng trình duyệt từ query string
  const results = [];

  // Tính toán số lượng batch (nhóm) cần thiết
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
        permissions: ['notifications'], // Cấp quyền nhận thông báo
        viewport: { width: windowWidth, height: windowHeight }, // Kích thước cửa sổ trình duyệt
        args: [`--window-position=${x},${y}`] // Vị trí cửa sổ trên màn hình
      });

      const page = await browser.newPage();

      await page.goto(`http://localhost:4173`);

      // Tự động cấp quyền nhận thông báo từ web
      const context = page.context();
      await context.grantPermissions(['notifications'], { origin: 'http://localhost:4173' });

      let textContent = null;

      for (let attempt = 0; attempt < 10; attempt++) { // Thử tối đa 3 lần
        try {
          // Đợi 1 giây và reload lại trang nếu cần
          await new Promise(resolve => setTimeout(resolve, 1000));
          if (attempt > 0) {
            await page.reload(); // Reload nếu không thành công
          }

          // Đợi cho phần tử có văn bản xuất hiện
          const elementText = await page.waitForSelector('[data-show="true"]', { timeout: 10000 });
          textContent = await elementText.evaluate(node => node.innerText);
          break; // Nếu thành công, thoát khỏi vòng lặp

        } catch (error) {
          if (attempt === 9) {
            console.error('Failed to retrieve text after 10 attempts:', error);
          } else {
            console.log(`Attempt ${attempt + 1} failed, retrying...`);
          }
        }
      }

      // Đóng trình duyệt nếu cần
      await browser.close();

      // Push kết quả vào danh sách nếu lấy được
      if (textContent) {
        results.push(textContent);
      } else {
        results.push('Timeout: Could not retrieve text');
      }
    });

    // Chạy tất cả các trình duyệt trong batch này
    await Promise.all(browserPromises);
  }

  res.send({
    status: 'success',
    results: results, // Trả về danh sách văn bản từ các trình duyệt
  });
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
