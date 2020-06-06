class API {
    ApiEndpoint = ''

    constructor() {
        this.ApiEndpoint = 'https://api.campus.kpi.ua/';
    }

    async getProfile(userIdentifier) {
        const axios = require('axios');
        const url = this.ApiEndpoint + 'Account/Public/' + userIdentifier;

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error(error);
            debugger
            return null;
        }
    }
}


export default new API();