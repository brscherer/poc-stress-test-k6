import http from 'k6/http';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/latest/dist/bundle.js';

 export function handleSummary(data) {
      return {
        'leak-summary.html': htmlReport(data),
      };
    }

export let options = { vus: 10, duration: '30s' };

export default function () {
  http.get('http://localhost:4000/data');
}
