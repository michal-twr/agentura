const dummyRequest = (v) => new Promise((res) => setTimeout(res({status: 200}),time()));
let time = () => 12;

//można podmienić funkcję time np na coś randomującego ? bo czemu nie
export { dummyRequest, time };