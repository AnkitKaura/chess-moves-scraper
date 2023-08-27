const axios = require('axios');
const cheerio = require('cheerio');
let EcoData = {};

const getDataFromUrl = async (url) => {
    try {
        const response = await axios.get(url);
        await extractCustomResponse(response.data)
        console.log('Fetching data completed')
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

const extractCustomResponse = async(data) => {
    const $ = cheerio.load(data);
    $('tr').each(function() {
        EcoData[$(this).find('td:first-child').text()] = $(this).find("td:nth-child(2)").html()
    });
    return "Done"
}

module.exports = {
    getDataFromUrl,
    EcoData
}
