import { getUrls } from "./urlProvider.mjs";
import { fetchBasic, fetchNewAgent, fetchSameAgent } from "./clientNodeFetch.mjs";
import { doRequest } from "./clientUndici.mjs";
import {log} from './mem.mjs';
import yargs from 'yargs'

const { argv } = yargs(process.argv);

const size = 3;
const runs = 40;
let urls = [];

for (let i = 0; i < size; i++) {
    urls = [...urls, ...getUrls()]
}

console.log(`Fetchuje ${urls.length} URLi x ${runs} times [${urls.length * runs}]`);

const _fetch = [fetchBasic, fetchSameAgent, fetchNewAgent, doRequest];

const select = argv.o || 0;

log();
console.time('run')
for (let i = 0; i < runs; i++) {
    await Promise.all(urls.map((v) => _fetch[select](v))).then((values) => {
        console.log(`${values.filter((v) => v.status === 200 || v.statusCode === 200).length} / ${values.length}`);
    });
    log();
}
console.timeEnd('run')
log();


