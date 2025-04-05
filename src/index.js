const { scrapeWebsite } = require('./scraper');

// URL to scrape - using Wikipedia as an example
const targetUrl = 'https://en.wikipedia.org/wiki/Web_scraping';

async function main() {
    try {
        console.log(`Starting to scrape: ${targetUrl}`);

        const scrapedData = await scrapeWebsite(targetUrl);

        // Print the title
        console.log(`\nTitle: ${scrapedData.title}\n`);

        // Print headings
        console.log('Headings:');
        scrapedData.headings.slice(0, 5).forEach((heading, i) => {
            console.log(`  ${i + 1}. ${heading}`);
        });
        console.log(`  ... and ${scrapedData.headings.length - 5} more headings\n`);

        // Print a sample of paragraphs
        console.log('Sample paragraphs:');
        scrapedData.paragraphs.slice(0, 3).forEach((paragraph, i) => {
            // Truncate long paragraphs for display
            const truncated = paragraph.length > 150
                ? paragraph.substring(0, 150) + '...'
                : paragraph;
            console.log(`  ${i + 1}. ${truncated}`);
        });
        console.log(`  ... and ${scrapedData.paragraphs.length - 3} more paragraphs\n`);

        // Print a sample of links
        console.log('Sample links:');
        scrapedData.links.slice(0, 5).forEach((link, i) => {
            console.log(`  ${i + 1}. ${link.text || '[No text]'} -> ${link.href || '[No URL]'}`);
        });
        console.log(`  ... and ${scrapedData.links.length - 5} more links\n`);

        console.log('Scraping completed successfully!');
    } catch (error) {
        console.error('Failed to scrape website:', error.message);
    }
}

// Run the scraper
main(); 