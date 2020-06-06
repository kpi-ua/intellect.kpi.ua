class API {
  ApiEndpoint = ''
  DefaultPageSize = 22;

  constructor() {
    this.ApiEndpoint = 'https://api.campus.kpi.ua/';
  }

  /**
   * Get public profile
   * @param userIdentifier
   * @returns {Promise<null|any>}
   */
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

  /**
   * Find public profiles
   * @param query
   * @returns {Promise<*[]>}
   */
  async searchPublicProfiles(query, page) {

    if (!query || query==='startwith:' || query.trim() ==='') {
      return {
        data: [],
        paging: {}
      };
    }

    const axios = require('axios');
    const url = this.ApiEndpoint + 'Intellect/Find?value=' + query + '&pageNumber=' + page + '&pageSize=' + this.DefaultPageSize;

    console.log(url);
    try {
      const response = await axios.get(url);

      return {
        data: response.data.Data,
        paging: response.data.Paging
      };

    } catch (error) {

      console.error(error);

      return {
        data: [],
        paging: {}
      };
    }
  }
}


export default new API();