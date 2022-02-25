import fetch from 'node-fetch';
import http from 'node:http';
import https from 'node:https';


const httpAgent = new http.Agent({
    keepAlive: true
});
const httpsAgent = new https.Agent({
    keepAlive: true
});

const options1 = {
    agent: function (_parsedURL) {
        if (_parsedURL.protocol == 'http:') {
            return httpAgent;
        } else {
            return httpsAgent;
        }
    }
};

const options2 = {
    agent: function (_parsedURL) {
        if (_parsedURL.protocol == 'http:') {
            return new http.Agent({
                keepAlive: true
            });
        } else {
            return new https.Agent({
                keepAlive: true
            });
        }
    }
};

const fetchBasic = (url) => fetch(url);

const fetchSameAgent = (url) => fetch(url, options1);

const fetchNewAgent = (url) => fetch(url, options2);

export {fetchBasic, fetchNewAgent, fetchSameAgent}
