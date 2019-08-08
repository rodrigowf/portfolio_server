const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');

const speechToText = new SpeechToTextV1({
    iam_apikey: 'GkNccMm80JGo9eQK71TdVUdxdiDoKpj9w-0FOB-qRtPh',
    url: 'https://stream.watsonplatform.net/speech-to-text/api'
});

methods = {
    recognize: function (file, callback) {
        const recognizeParams = {
            // audio: fs.createReadStream(file),
            audio: file,
            content_type: 'audio/webm',
            model: "pt-BR_NarrowbandModel",
            language: "pt-BR",
            url: "https://stream.watsonplatform.net/speech-to-text/api/v1/models/pt-BR_NarrowbandModel",
        };

        speechToText.recognize(recognizeParams)
            .then(speechRecognitionResults => {
                console.log(JSON.stringify(speechRecognitionResults, null, 2));
                callback(speechRecognitionResults['results'][0]['alternatives'][0]['transcript']);
            })
            .catch(err => {
                console.log('error:', err);
            });
    }
}

module.exports = methods;
