const axios = require('axios');
const describeImage = async context => {
  try {
    const response = await axios({
      url: `${process.env.API_ENDPOINT}/describe`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.API_KEY
      },
      data: {
        url: context.req.body.image
      },
      params: {
        maxCandidates: context.req.body.maxCandidates,
        language: context.req.body.language
      }
    });
    return response;
  } catch (error) {
    context.log(`Error code: ${error.code} message: ${error.message}`);
    throw new Error(error.message);
  }
};
module.exports = async function(context) {
  const result = await describeImage(context);
  context.res = {
    body: result.data
  };
};
