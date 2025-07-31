import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "1m", target: 200 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<400"],
  },
};

export default function () {
  let res = http.get("http://localhost:3000/api/todos");
  check(res, { "status 200": (r) => r.status === 200 });
  sleep(1);
}
