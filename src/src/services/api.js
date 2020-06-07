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
   * Get publications
   * @param userIdentifier
   * @returns {Promise<*[]|*>}
   */
  async getProfilePublications(userIdentifier) {
    const axios = require('axios');
    const url = this.ApiEndpoint + 'Intellect/publications?userIdentifier=' + userIdentifier;

    try {
      const response = await axios.get(url);
      return response.data.Data;
    } catch (error) {
      console.error(error);
      debugger
      return [];
    }
  }

  /**
   *
   * @param userIdentifier
   * @returns {Promise<*[]|*>}
   */
  async getProfileExecutions(userIdentifier) {
    const axios = require('axios');
    const url = this.ApiEndpoint + 'Intellect/KRExecutions?userIdentifier=' + userIdentifier;

    try {
      const response = await axios.get(url);
      return response.data.Data;
    } catch (error) {
      console.error(error);
      debugger
      return [];
    }
  }

  /**
   *
   * @param userIdentifier
   * @returns {Promise<*[]|*>}
   */
  async getProfileResults(userIdentifier) {
    const axios = require('axios');
    const url = this.ApiEndpoint + 'Intellect/KRResults?userIdentifier=' + userIdentifier;

    try {
      const response = await axios.get(url);
      return response.data.Data;
    } catch (error) {
      console.error(error);
      debugger
      return [];
    }
  }

  /**
   *
   * @param userIdentifier
   * @returns {Promise<*[]|*>}
   */
  async getProfileConferences(userIdentifier) {
    const axios = require('axios');
    const url = this.ApiEndpoint + 'Intellect/conferences?userIdentifier=' + userIdentifier;

    try {
      const response = await axios.get(url);
      return response.data.Data;
    } catch (error) {
      console.error(error);
      debugger
      return [];
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