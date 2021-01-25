// const playwright = require('playwright');
const { chromium, firefox, webkit } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://localhost:3002');
  await page.click('a[href="/signup"]');
  await page.fill('#userName', 'test1');
  await page.fill('#email', 'test@test.com');
  await page.fill('#password', 'test123');
  await page.fill('#password2', 'test123');
  await page.click('button#submit');
  // await page.goto('http://localhost:3002/login');
  await page.waitForNavigation();
  await page.fill('#email', 'test@test.com');
  await page.fill('#password', 'test123');
  await page.click('button#login');
  await page.waitForNavigation();
  await page.click('text="View All"');
  await page.click('button#addNewHouse');
  await page.fill('input[name="name"]', 'test1');
  await page.fill('input[name="address"]', '600 S. Quail Ct');
  await page.fill('input[name="zip"]', '67114');
  await page.check('input[name="rented"]');
  await page.check('input[name="primaryHouse"]');
  // let btn = await page.$('button[type="submit"]');
  // await btn.click();
  await page.click('button[type="submit"]');
  await page.waitForSelector('.MuiDialog-paper', { state: 'hidden' });
  await page.click('button#addNewHouse');
  await page.fill('input[name="name"]', 'test2');
  await page.fill('input[name="address"]', '600 S. Quail Ct');
  await page.fill('input[name="zip"]', '67114');
  await page.check('input[name="rented"]');
  await page.check('input[name="primaryHouse"]');
  await page.click('button[type="submit"]');
  await page.waitForSelector('.MuiDialog-paper', { state: 'hidden' });
  await page.click('button#addNewHouse');
  await page.fill('input[name="name"]', 'test3');
  await page.fill('input[name="address"]', '600 S. Quail Ct');
  await page.fill('input[name="zip"]', '67114');
  await page.check('input[name="rented"]');
  await page.check('input[name="primaryHouse"]');
  await page.click('button[type="submit"]');
  await page.waitForSelector('.MuiDialog-paper', { state: 'hidden' });
  // let buttons = await page.$$('.viewDetailButton');
  // console.log(buttons.length);
  // for (let i = 0: i < by) {
  //     // await page.evaluate((el) => el.click, btn)
  //     // console.log("=====>", btn);
  //     await btn.click();
  //     // await page.waitForNavigation();
  //     await page.waitForSelector('input[placeholder="Search"]');
  //     await page.goBack();
  //     await page.waitForSelector('input[placeholder="Search"]', {visible: false});
  //     // await page.goto("http://localhost:3002/list");
  // }
  // buttons.map(async (item, index) => {
  // console.log("button",item)
  // await item.click();
  // await page.waitForSelector('text="Detail About"');
  // await page.goto("http://localhost:3002/list");
  // await page.goBack();
  // await page.waitForSelector('text="Detail About"', {visible: false});
  // })
  // test 1 house
  await page.click('button[id="0"]');

  await page.click('text="Add"');
  await page.fill('input[name="name"]', 'test1 Mortgage');
  await page.fill('input[name="number"]', '111');
  await page.fill('input[name="principalAmount"]', '111');
  await page.fill('input[name="interestRate"]', '111');
  await page.fill('input[name="monthlyPayment"]', '2800');
  await page.fill('input[name="type"]', 'mortgage');
  await page.fill('input[name="dueDate"]', '5');
  await page.fill('input[name="bankName"]', 'mortgage Bank');
  await page.click('text="Create"');
  await page.waitForSelector('.MuiDialog-paper', { state: 'hidden' });

  await page.click('text="Insurance"');
  await page.click('text="Add"');
  await page.fill('input[name="company"]', 'test1 insurance');
  await page.fill('input[name="amount"]', '111');
  await page.fill('input[name="dueDate"]', '18');
  await page.fill('input[name="dueAmount"]', '104');
  await page.fill('input[name="policyNumber"]', '111');
  await page.fill('input[name="phone"]', '111');
  await page.fill('input[name="startDate"]', '2020-01-01');
  await page.fill('input[name="endDate"]', '2020-12-30');
  await page.click('text="Create"');
  await page.waitForSelector('.MuiDialog-paper', { state: 'hidden' });
  await browser.close();
})();
