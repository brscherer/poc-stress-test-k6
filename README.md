# PoC Stress Test with k6

This project demonstrates how to perform stress testing on a simple Node.js/Express ToDo CRUD API using [k6](https://k6.io/). The API itself is a basic in-memory ToDo list, but the main focus here is on how to use k6 for load and stress testing.

## Project Structure

- `src/server.js`: The Express server implementing the ToDo CRUD API (in-memory storage).
- `src/stress-test.js`: The k6 script used to stress test the API.
- `package.json`: Project configuration and scripts.

## Running the Project

### 1. Install Dependencies

This project uses [pnpm](https://pnpm.io/) as the package manager. Install dependencies with:

```bash
pnpm install
```

### 2. Start the API Server

Start the Express server (with nodemon for auto-reload):

```bash
pnpm dev
```

The server will run locally (default: `http://localhost:3000`).

### 3. Run the k6 Stress Test

In a separate terminal, run:

```bash
pnpm test
```

This will execute the `src/stress-test.js` script using k6, simulating multiple users and requests against the API.

## About the k6 Stress Test

- The k6 script (`src/stress-test.js`) is designed to simulate concurrent users performing CRUD operations on the ToDo API.
- You can customize the number of virtual users, duration, and request patterns by editing the k6 script.
- k6 provides detailed metrics on response times, error rates, and throughput, helping you identify performance bottlenecks.

### Example k6 Script Features

- Simulates multiple users (virtual users, VUs)
- Sends HTTP requests to the API endpoints (create, read, update, delete ToDos)
- Measures response times and error rates
- Can be extended to include ramping up/down users, thresholds, and more

### Tests Results

```bash
brscherer@Animus:~/poc-stress-test-k6$ pnpm run test

> poc-stress-test-k6@1.0.0 test /home/brscherer/poc-stress-test-k6
> k6 run src/stress-test.js


         /\      Grafana   /‾‾/
    /\  /  \     |\  __   /  /
   /  \/    \    | |/ /  /   ‾‾\
  /          \   |   (  |  (‾)  |
 / __________ \  |_|\_\  \_____/

     execution: local
        script: src/stress-test.js
        output: -

     scenarios: (100.00%) 1 scenario, 200 max VUs, 2m30s max duration (incl. graceful stop):
              * default: Up to 200 looping VUs for 2m0s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)



  █ THRESHOLDS

    http_req_duration
    ✓ 'p(95)<400' p(95)=982.06µs

    http_req_failed
    ✓ 'rate<0.05' rate=0.00%


  █ TOTAL RESULTS

    checks_total.......................: 11322   85.449696/s
    checks_succeeded...................: 100.00% 11322 out of 11322
    checks_failed......................: 0.00%   0 out of 11322

    ✓ status 200

    HTTP
    http_req_duration.......................................................: avg=554.13µs min=147.84µs med=475.23µs max=16.6ms p(90)=833µs p(95)=982.06µs
      { expected_response:true }............................................: avg=554.13µs min=147.84µs med=475.23µs max=16.6ms p(90)=833µs p(95)=982.06µs
    http_req_failed.........................................................: 0.00%  0 out of 11322
    http_reqs...............................................................: 11322  85.449696/s

    EXECUTION
    iteration_duration......................................................: avg=1s       min=1s       med=1s       max=1.01s  p(90)=1s    p(95)=1s
    iterations..............................................................: 11322  85.449696/s
    vus.....................................................................: 5      min=2          max=199
    vus_max.................................................................: 200    min=200        max=200

    NETWORK
    data_received...........................................................: 3.8 MB 29 kB/s
    data_sent...............................................................: 894 kB 6.8 kB/s




running (2m12.5s), 000/200 VUs, 11322 complete and 0 interrupted iterations
default ✓ [===========] 000/200 VUs  2m0s
```
