const puppeteer = require('puppeteer');

const website = 'https://sag.simedu.ru/home';

function RandomString(length) {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function VisitWebsite(url) {
    const browser = await puppeteer.launch({headless:true});
    const page = await browser.newPage();
    console.log('Начало сеанса');

    try {
        // Загрузка
        await page.goto(url, {waitUntil:'networkidle2'});
        console.log(`Посещение: ${url}`);
        
        const WaitTime1 = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
        console.log(`Ожидание ${WaitTime1 / 1000} секунд на сайте`);
        await new Promise(resolve => setTimeout(resolve, WaitTime1));

        // Войти
        console.log('Нажимаем: Войти');
        const WaitTime2 = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
        const Selector1 = 'a[href="/signin"]';
        await page.click(Selector1);
        await new Promise(resolve => setTimeout(resolve, WaitTime2));

        // Создать аккаунт
        console.log('Нажимаем: создайте аккаунт');
        const WaitTime3 = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000;
        const Selector2 = 'a[href="/signup"';
        await page.click(Selector2);
        await new Promise(resolve => setTimeout(resolve, WaitTime3));

        // Регистрация
        // Email
        const EmailSelector = 'input[name="email"]';
        await page.waitForSelector(EmailSelector);
        await page.type(EmailSelector, `${RandomString(10)}@mail.ru`, {delay:100});

        // Имя
        const NameSelector = 'input[name="firstName"]';
        await page.waitForSelector(NameSelector);
        await page.type(NameSelector, `Вася${RandomString(5)}`, {delay:100});

        // Фамилия
        const FamilySelector = 'input[name="lastName"]';
        await page.waitForSelector(FamilySelector);
        await page.type(FamilySelector, `Пупкин${RandomString(4)}`, {delay:100});
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