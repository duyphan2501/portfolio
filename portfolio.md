# Phan Nhut Duy — Fullstack Engineer Intern

> Final-year Software Engineering @ Ton Duc Thang University · GPA 8.66/10 · TOEIC 755

---

## About Me

I'm a final-year Software Engineering student who builds full-stack web applications with a focus on real-world system design challenges — concurrency, real-time communication, and distributed state. I don't just follow tutorials; I solve the edge cases that make systems break.

My projects span from atomic Redis/Lua stock reservation under high concurrency, to WebRTC video calls with STUN/TURN traversal, to RabbitMQ-decoupled microservices. I care deeply about understanding *why* a solution works, not just that it works.

**Looking for:** Full-time Fullstack Engineer Intern position.

📞 +84 85 918 6979 · 📧 duyphan2501@gmail.com · 🐙 [github.com/duyphan2501](https://github.com/duyphan2501)

---

## Projects

### 🛒 Ecommerce Website for Electronic Devices
**Jul – Sep 2025 · Personal Project**

`ReactJS` `NodeJS` `ExpressJS` `MongoDB` `Redis`

A production-grade e-commerce platform for electronics with an inventory reservation system engineered to handle high-concurrency checkout.

**Key engineering challenges solved:**

**Atomic stock reservation with Redis + Lua scripts**
The core problem: two users checking out the last item simultaneously would both read `available=1`, both pass the check, and both place an order — classic oversell. I solved this by writing Lua scripts that execute atomically on Redis. A single `RESERVE_LUA` script reads available stock, checks quantity, decrements `available`, increments `reserved`, and updates the cart hash — all in one uninterruptible operation. Because Redis is single-threaded and Lua runs atomically, the second request simply sees `available=0` and gets an `OUT_OF_STOCK` response.

Beyond reservation, I built a full inventory lifecycle:
- `CONFIRM_ORDER_LUA` — on checkout success, converts `reserved → sold` and syncs to MongoDB via `bulkWrite`
- `RECLAIM_LUA` — background worker runs every 30s, uses a Redis Sorted Set (score = expiry timestamp) to find and release timed-out reservations
- `MERGE_CART_LUA` — atomically migrates guest cart to user cart on login, preserving reservation state

**Dual-layer cart (Redis + MongoDB)**
Redis is the real-time source of truth (TTL-based, fast). MongoDB is the persistence layer. A fire-and-forget background sync keeps them aligned. On load, if Redis has expired the cart, it's rebuilt from MongoDB — re-reserving each item against current stock.

**PayOS payment integration**
Integrated PayOS gateway with HMAC-SHA256 webhook signature verification. Draft orders are created before payment (no stock deducted), confirmed atomically after webhook `code='00'`. An idempotency check (`payment.status === 'paid'`) prevents double-processing duplicate webhooks.

**Secure authentication**
JWT with Refresh Token Rotation — access tokens short-lived in `httpOnly` cookies, refresh tokens persisted in DB. Google OAuth via `google-auth-library` with server-side token verification. Passwords hashed with `bcrypt` (cost factor 10).

---

### 💬 Mini Social Network (Microservice)
**Nov 2025 · Team of 3**

`ReactJS` `NodeJS` `ExpressJS` `MySQL` `Socket.IO` `RabbitMQ` `Docker`

A microservice-based social platform (8 services: gateway, users, posts, chat, friend, notifications, MySQL, RabbitMQ) orchestrated with Docker Compose.

**Key engineering challenges solved:**

**RabbitMQ messaging — 3 patterns in production**
Rather than HTTP between services (tight coupling, cascade failures), all inter-service communication goes through RabbitMQ:

- *Work Queue*: `user_last_active_updates` — fire-and-forget, persistent messages. When a user disconnects from Socket.IO, gateway sends to queue; users-service updates `last_active_at` asynchronously.
- *RPC over RabbitMQ*: friend-service needs user data from users-service. It sends a request with `replyTo` (exclusive queue) and `correlationId` (UUID). users-service processes and replies. `correlationId` ensures correct response matching under concurrent requests.
- *Direct Exchange Pub/Sub*: posts-service publishes `post_like_updated` to an exchange → gateway subscribes → emits Socket.IO event to `post_{id}` room. Real-time like counts without polling.

**Cursor-based pagination on MySQL**
Deep `OFFSET` pagination degrades to O(n) — scanning thousands of rows to skip. I replaced it with cursor pagination using `(lastMessageAt, _id)` composite cursor: `WHERE (lastMessageAt < cursor) OR (lastMessageAt = cursor AND _id < lastId)`. Combined with a compound index, this is O(log n) regardless of page depth, and doesn't shift when new messages arrive.

**Scalable real-time architecture**
API Gateway (Express + `http-proxy-middleware`) is the single entry point — handles JWT authentication, WebSocket connections, and REST proxying. Socket.IO rooms are domain-segmented: `user_{id}` for private notifications, `conversation_{id}` for chat, `post_{id}` for public real-time updates. A `userSocketMap` enables targeted `io.to(room)` delivery.

---

### 📹 Realtime Chat & Video Call Platform
**Mar – May 2026 · Team of 2**

`NextJS` `NodeJS` `ExpressJS` `MongoDB` `Redis` `Socket.IO` `WebRTC`

A horizontally-scalable chat and P2P video call platform built on Next.js 15 App Router, WebRTC, and a Redis-backed distributed infrastructure.

**Key engineering challenges solved:**

**Horizontal Socket.IO scaling with Redis Adapter**
Single-instance Socket.IO breaks when you scale: user A connects to instance 1, a notification fired from instance 2 never reaches them. I integrated `socket.io-redis` adapter using dedicated `pubClient` and `subClient` (separate from the business `redisClient` — Redis pub/sub clients can't run other commands while subscribed). All `io.to(room).emit()` calls now sync across instances via Redis pub/sub.

**Multi-tab presence tracking**
Simple `userId → socketId` mapping breaks on multiple tabs. I used Redis Sets: `SADD online_user:{userId} socketId` on connect, `SREM` on disconnect. A user is truly offline only when `SCARD = 0`. This correctly handles multi-tab and multi-device scenarios.

**WebRTC video calling with ICE candidate queuing**
Full signaling flow: `getUserMedia → createOffer → setLocalDescription → emit webrtc:offer → server relay → setRemoteDescription → createAnswer → exchange ICE candidates`. The critical edge case: ICE candidates can arrive before `setRemoteDescription` completes (it's async). I built an `iceCandidateQueue` that buffers candidates until remote description is set, then flushes — preventing dropped candidates that would force TURN relay instead of direct P2P.

**Distributed call state with Redis + atomic locking**
When a call ends (especially on unexpected disconnect), both peers can trigger `processCallEnd` simultaneously — resulting in duplicate "Call ended" messages in the database. I solved this with a Redis distributed lock: `SET call_end_lock:{callerId}:{startTime} 1 NX EX 30`. The `NX` flag ensures only one process acquires the lock; `EX 30` prevents deadlock on crash. The loser simply returns early.

**MongoDB cursor pagination for conversations**
Same cursor-pagination principle as the microservice project, applied to MongoDB: `(lastMessageAt, _id)` composite cursor with a partial index (`partialFilterExpression: {type: 'direct'}`). This keeps the index small and queries fast for the common case.

---

## Technical Skills

| Category | Technologies |
|---|---|
| **Languages** | JavaScript, TypeScript, HTML, CSS |
| **Frontend** | ReactJS, NextJS 15 (App Router), Tailwind CSS, Zustand |
| **Backend** | Node.js, ExpressJS, RESTful API |
| **Databases** | MySQL, MongoDB (Mongoose, Aggregation Pipeline) |
| **Caching / Messaging** | Redis (Lua scripts, Pub/Sub, Sorted Sets, Distributed Lock), RabbitMQ (Direct/Fanout/Topic Exchange, RPC, Work Queue) |
| **Real-time** | Socket.IO (Redis Adapter, Room management), WebRTC (STUN/TURN, ICE), WebSocket |
| **Infrastructure** | Docker, Docker Compose, Nginx (reverse proxy, load balancing) |
| **Auth & Security** | JWT (Refresh Token Rotation), Google OAuth 2.0, bcrypt, HMAC webhook verification |
| **CS Fundamentals** | OOP, Data Structures & Algorithms, Concurrent systems, System design |
| **Tools** | Git, GitHub, Postman, Redis CLI, RabbitMQ Management UI |

---

## Education

**Ton Duc Thang University** · Software Engineering
Aug 2023 – Present · GPA: **8.66/10** · TOEIC L&R 755, S&W 290

---

## What I Bring

- I build systems that handle the edge cases — race conditions, network failures, reconnection flows — not just the happy path.
- I understand *why* tools work the way they do: why Redis Lua scripts are atomic, why Replica Sets are needed for MongoDB transactions, why you need separate Redis clients for Pub/Sub.
- I can discuss trade-offs: cursor vs offset pagination, Pub/Sub vs Streams, RDB vs AOF, denormalization vs normalization — and pick the right tool for the context.
- I learn by building real systems, not toy examples. Every bullet point in my CV has code I can walk through line by line.
