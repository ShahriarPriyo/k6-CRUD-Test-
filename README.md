# k6-CRUD-Test-
Load testing tool for modern developers and testers. k6 is an open-source, developer-friendly performance testing framework for testing APIs, microservices, and websites. Designed for automation, scripting in JavaScript, and easy integration into CI/CD pipelines.

# k6 Load Testing Project -

This project uses [k6](https://k6.io/) to perform load testing on the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API.  
It covers **Create**, **Read**, **Update**, and **Delete** (CRUD) operations with realistic user behavior simulations.

---

## 📋 Project Overview

- **Tool:** k6 (open-source load testing tool)
- **Target API:** JSONPlaceholder (a free fake REST API for testing)
- **Operations Tested:**
  - `POST /posts` → Create a post
  - `GET /posts/:id` → Read a post
  - `PUT /posts/:id` → Update a post
  - `DELETE /posts/:id` → Delete a post

---

## ⚙️ Installation

Make sure you have [k6](https://k6.io/docs/getting-started/installation/) installed:

## Clone this Repository:

```bash
git clone [https://github.com/your-username/k6-jsonplaceholder-crud.git](https://github.com/ShahriarPriyo/k6-CRUD-Test-)
cd k6-jsonplaceholder-crud
```

## 🚩How to Run Test

```bash
k6 run script.js
```
Or to run with custom options (example: 50 virtual users for 30 seconds):

```bash
k6 run --vus 50 --duration 30s script.js
```
## Example Script Logic:

In the test (crud-test.js), for each virtual user:

1. Create a new post using POST /posts

2. Read the created post using GET /posts/:id

3. Update the post using PUT /posts/:id

4. Delete the post using DELETE /posts/:id

5. Sleep for a short random time to simulate real user behavior.

## Example Output:
When you run the test, you will see output like:
```lua
✓ createPost status was 201
✓ getPost status was 200
✓ updatePost status was 200
✓ deletePost status was 200

checks.........................: 100.00% ✓ 4000 ✗ 0   
http_req_duration...............: avg=120ms min=100ms max=300ms p(90)=150ms
vus.............................: 50
duration........................: 30s
```

