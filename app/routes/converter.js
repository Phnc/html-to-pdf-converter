const puppeteer = require('puppeteer');

module.exports = function(app){
    app.post("/api/Html/convert/pdf", async (req, res) => {
        const id = req.body.id;
        let htmlString = req.body.content;
        htmlString = htmlString.replace("http://sir.", "http://wssir.");
        htmlString = htmlString.replace("http://sir.", "http://wssir.");

        console.log(htmlString);

        const browser = await puppeteer.launch({
            args: ['--headless', '--disable-gpu', '--full-memory-crash-report', '--unlimited-storage',
                   '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        });

        const page = await browser.newPage();

        await page.setDefaultNavigationTimeout(0); 

        await page.setContent(htmlString);

        const buffer = await page.pdf({ format: "A4" });

        await browser.close();

        const base64 = buffer.toString('base64');

        const result = {
            id: id,
            content: base64
        }
        
        res.status(200).json(result);
    });
}