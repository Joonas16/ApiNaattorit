import axios from 'axios';
import Constants from 'expo-constants';

const baseUrl = `${Constants.manifest.extra.apiUrl}/teletext`;

const config = {
  params:{
      app_id: Constants.manifest.extra.appId,
      app_key: Constants.manifest.extra.appKey,
  }
};

const getPage = async (pageNumber) => {
    const response = await axios.get(`${baseUrl}/pages/${pageNumber}.json`, config);
    return response.data.teletext.page;
};

export default {
    getPage
};