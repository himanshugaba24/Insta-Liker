let puppeteer = require("puppeteer");
let fs = require("fs");
let detailsFile = process.argv[2];
let like=process.argv[3];
//let pageName = process.argv[3];
//let postToLike = process.argv[4];
let url, pwd, user,name;
(async function () {
    let data = await fs.promises.readFile(detailsFile, "utf-8");
    let details1 = JSON.parse(data);
    url = details1.url;
    user = details1.user;
    pwd = details1.pwd;
    name=details1.name;
    // starts browser
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized", "--disable-notifications",],
        //slowMo: 400
    });
    let numberofPages = await browser.pages();
    let tab = numberofPages[0];
    // goto page
    // 1. 
    await tab.goto(url, {
        waitUntil: "networkidle2"
    });

    await tab.waitForSelector("._2hvTZ.pexuQ.zyHYP");
    await tab.type("._2hvTZ.pexuQ.zyHYP", user, { delay: 200 });
    await tab.keyboard.press("Tab");
    //await tab.type(pwd);
   // await tab.waitForSelector("._2hvTZ.pexuQ.zyHYP");
    await tab.type("._2hvTZ.pexuQ.zyHYP[type=password]",pwd, { delay: 200 });
    await tab.click(".Igw0E.IwRSH.eGOV_._4EzTm.bkEs3.CovQj.jKUp7.DhRcB");
    console.log("User logged in");
    await tab.waitForSelector(".XTCLo.x3qfX");
    await tab.type(".XTCLo.x3qfX",name, { delay: 200 });
    await tab.keyboard.press("Enter",{delay:100});
    await tab.waitForSelector(".uyeeR");
    await tab.click(".uyeeR",{delay:100});
    await tab.waitForSelector(".eLAPa");
    await tab.click(".eLAPa",{delay:100});
    for(let i=0;i<like;i++){
    await tab.waitForSelector(".fr66n");
    await tab.click(".fr66n",{delay:300});
    await tab.waitForSelector("._65Bje.coreSpriteRightPaginationArrow");
    await tab.click("._65Bje.coreSpriteRightPaginationArrow",{delay:100});}
})()