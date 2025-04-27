import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import PapaParse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// Load CSV
const users = new SharedArray("users", function() {
    return PapaParse.parse(open('./users.csv'), { header: true }).data.filter(u => u.name && u.job);
});

console.log(`Loaded users: `, JSON.stringify(users));

export const options = {
    vus: 2,
    iterations: 2,
    thresholds: {
        http_req_duration: ['p(90)<1000', 'p(95)<1000'],
    },
};

function getRandomPostId() {
    return Math.floor(Math.random() * 100) + 1; // Random between 1-100
}

export default function () {
    const user = users[__VU - 1];
    const BASE_URL = 'https://jsonplaceholder.typicode.com';
    const headers = { 'Content-Type': 'application/json' };

    console.log(`Processing user: ${user.name}, ${user.job}`);

    // 1. CREATE (POST /posts)
    const createPayload = JSON.stringify({
        title: `${user.name} Post`,
        body: `${user.job} writing something interesting.`,
        userId: __VU,
    });

    const createRes = http.post(`${BASE_URL}/posts`, createPayload, { headers });

    check(createRes, {
        'Create - status 201': (r) => r.status === 201,
    });

    const createdPost = JSON.parse(createRes.body);
    console.log(`Created (fake) Post ID: ${createdPost.id}`);

    sleep(1); 

    
    const existingPostId = getRandomPostId();
    console.log(`Using existing Post ID for Read/Update/Delete: ${existingPostId}`);

    // 2. READ (GET /posts/{id})
    const readRes = http.get(`${BASE_URL}/posts/${existingPostId}`, { headers });

    check(readRes, {
        'Read - status 200': (r) => r.status === 200,
    });

    // 3. UPDATE (PUT /posts/{id})
    const updatePayload = JSON.stringify({
        id: existingPostId,
        title: `${user.name} Updated Post`,
        body: `${user.job} updated the post.`,
        userId: __VU,
    });

    const updateRes = http.put(`${BASE_URL}/posts/${existingPostId}`, updatePayload, { headers });

    check(updateRes, {
        'Update - status 200': (r) => r.status === 200,
    });

    // 4. DELETE (DELETE /posts/{id})
    const deleteRes = http.del(`${BASE_URL}/posts/${existingPostId}`, null, { headers });

    check(deleteRes, {
        'Delete - status 200': (r) => r.status === 200,
    });

    sleep(1);
}

export function handleSummary(data) {
    return {
        "summary.html": htmlReport(data),
    };
}
