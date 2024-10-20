const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const msDelay = 1000;

beforeEach(async () => {
    // Add a delay before each test in the wrappers test folder. This is to
    // prevent the API from being overloaded.
    await delay(msDelay);
}, msDelay + 1000);
