const cheerio = require('cheerio');

// get a catz speak translation
const translate = (z, bundle) => {
  let convertedInput = bundle.inputData.text.split(' ').join('+');
  const responsePromise = z.request({
    method: 'GET',
    url: 'http://speaklolcat.com/?from=' + convertedInput,
  });

  return responsePromise
    .then(response => {
      const $ = cheerio.load(response.content);
      const parsedTranslation = $('#to').val();
      z.console.log(response);
      return { response: parsedTranslation };
    });
};

module.exports = {
  key: 'translate',
  noun: 'Translation',

  display: {
    label: 'Translate',
    description: 'Turn lame human speak into catz speak.'
  },
  operation: {
    inputFields: [
      { 
        key: 'text',
        type: 'string',
        required: true,
      },
    ],
    perform: translate,
    sample: {
      translation: 'I CAN HAZ CHEEZEBURGER'
    },
    outputFields: [
      {key: 'translation', label: 'Translation'}
    ]
  },  
};
