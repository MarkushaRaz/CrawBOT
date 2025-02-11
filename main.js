const puppeteer = require('puppeteer');

const website = 'https://sag.simedu.ru/home';

async function VisitWebsite(url) {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    console.log('Начало сеанса');

    try {
        await page.goto(url, {waitUntil:'networkidle2'});
        console.log(`Посещение: ${url}`);
        
        const WaitTime1 = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
        console.log(`Ожидание ${WaitTime1 / 1000} секунд на сайте`);
        await new Promise(resolve => setTimeout(resolve, WaitTime1));

        console.log('Нажимаем: Войти');
        const WaitTime2 = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
        const Selector1 = 'a[href="/signin"]';
        await page.click(Selector1);
        await new Promise(resolve => setTimeout(resolve, WaitTime2));

        console.log('Нажимаем: создайте аккаунт');
        const WaitTime3 = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
        const Selector2 = 'a[href="/signup"';
        await page.click(Selector2);
        await new Promise(resolve => setTimeout(resolve, WaitTime3))
    }
    finally {
        await browser.close();
    }
}

async function Start() {
    await VisitWebsite(website);
    console.log('Конец сеанса');
}

Start();