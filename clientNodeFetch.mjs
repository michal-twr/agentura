import fetch from 'node-fetch';
import http from 'node:http';
import https from 'node:https';
import CacheableLookup from 'cacheable-lookup';

const cacheable = new CacheableLookup({});


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

const options3 = options2;
options3.lookup=cacheable.lookup


const fetchBasic = (url) => fetch(url);

const fetchSameAgent = (url) => fetch(url, options1);

const fetchNewAgent = (url) => fetch(url, options2);

const fetchNewAgentDNSCache = (url) => fetch(url, options3);

export {fetchBasic, fetchNewAgent, fetchSameAgent, fetchNewAgentDNSCache}
