import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js';

export function handleSummary(data) {
    return {
        'race-summary.html': htmlReport(data),
    };
}

export let options = { vus: 100, duration: '5s' };

export default function () {
  http.post('http://localhost:3000/increment');
  sleep(0.01);
}