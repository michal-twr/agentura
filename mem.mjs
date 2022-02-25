let data = null;

const log = () => {
    const currentMemData = process.memoryUsage();
    const curentHeapUsed = Math.floor(currentMemData.heapUsed / 1024);

    const info = `heapUsed: ${curentHeapUsed}kB`;

    if (data) {
        const diff = Math.floor(currentMemData.heapUsed / 1024  - data.heapUsed / 1024 );
        console.log(`${info} [${diff > 0 ? "+" : ""}${diff}kB]`);
    } else {
        console.log(info);
    }

    data = currentMemData;
}

export { log }