// api.js


import client from "./client"; // axios client configuration

export const sendRequest = async (method, url, data = null, headers = {}) => {
  try {
    let response;
    switch (method.toLowerCase()) {
      case 'get':
        response = await client.get(url, { headers });
        break;
      case 'post':
        response = await client.post(url, data, { headers });
        break;
      case 'put':
        response = await client.put(url, data, { headers });
        break;
      case 'delete':
        response = await client.delete(url, { headers});
        break;
      // Add more cases as needed for other HTTP methods
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
    return response.data;
  } catch (error) {
    throw error; // You can handle errors where this function is called
  }
};
