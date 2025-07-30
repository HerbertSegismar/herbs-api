import express, { response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const app = express();

const articles = [];

app.get('/herbs', (req, res) => {
    axios
      .get("https://www.theguardian.com/international")
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $('a:contains("tsunami")', html).each(function () {
          const title = $(this).text();
          const url = $(this).attr("href");
          articles.push({
            title,
            url,
          });
        });
        res.json(articles);
      })
      .catch((err) => console.log(err, err.message));
})

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`)); 