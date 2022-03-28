import { LogoScrape } from '../lib/';

(async () => {
    const url = 'https://www.spotify.com/';
    const logo = await LogoScrape.getLogo(url);
    const logos = await LogoScrape.getLogos(url);
    console.log({logo, logos});
})();
