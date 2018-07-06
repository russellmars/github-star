const puppeteer = require('puppeteer');
const uuidv1 = require('uuid/v1');

const mailServer = 'https://outlook.live.com/owa/';
const password = 'mars123456';

const CREATE_ACCOUNT_BUTTON_SELECTOR =
  'body > section > div > div > div.landing-section.headerHero > a.linkButtonSigninHeader.linkButtonSigninHeader--premium';
const ACCOUNT_INPUT_SELECTOR = '#MemberName';
const ACCOUNT_INPUT_NEXT_SELECTOR = '#iSignupAction';
const PASSWORD_INPUT_SELECTOR = '#PasswordInput';
const PASSWORD_INPUT_NEXT_SELECTOR = '#iSignupAction';

/**
 * 创建邮箱账户
 */
exports.create = async function create(ctx, next) {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1036,
    height: 700
  });
  await page.goto(mailServer);

  const navigationPromise0 = page.waitForNavigation();
  await page.click(CREATE_ACCOUNT_BUTTON_SELECTOR);
  await navigationPromise0;

  const account_id = `mars${uuidv1()
    .replace(/-/g, '')
    .slice(10, 20)}`;
  await page.type(ACCOUNT_INPUT_SELECTOR, account_id);
  await page.click(ACCOUNT_INPUT_NEXT_SELECTOR);
  await page.waitFor(2000);

  await page.type(PASSWORD_INPUT_SELECTOR, password);
  await page.click(PASSWORD_INPUT_NEXT_SELECTOR);
  await page.waitForNavigation();
};
