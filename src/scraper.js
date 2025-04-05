const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Simple web scraper function that fetches and extracts data from a URL
 * @param {string} url - The URL to scrape
 * @returns {Promise<Object>} - The scraped data
 */
async function scrapeWebsite(url) {
    try {
        // Fetch the HTML content
        const response = await axios.get(url);
        const html = response.data;

        // Load the HTML into cheerio
        const $ = cheerio.load(html);

        // Example: Extract all heading elements
        const headings = [];
        $('h1, h2, h3').each((i, el) => {
            headings.push($(el).text().trim());
        });

        // Example: Extract all paragraph text
        const paragraphs = [];
        $('p').each((i, el) => {
            paragraphs.push($(el).text().trim());
        });

        // Example: Extract links
        const links = [];
        $('a').each((i, el) => {
            links.push({
                text: $(el).text().trim(),
                href: $(el).attr('href')
            });
        });

        return {
            title: $('title').text(),
            headings,
            paragraphs,
            links
        };
    } catch (error) {
        console.error('Error scraping website:', error);
        throw error;
    }
}

module.exports = { scrapeWebsite }; 