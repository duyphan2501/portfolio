export type Project = {
  id: string;
  title: string;
  period: string;
  context: string;
  summary: string;
  outcome: string;
  tags: string[];
  highlights: Array<{
    title: string;
    body: string;
  }>;
  github: string;
  liveDemo?: string;
  caseStudy?: {
    role: string;
    goalHeading: string;
    processHeading: string;
    resultsHeading: string;
    repositorySummary: string;
    background: string;
    purpose: string;
    process: Array<{
      title: string;
      body: string;
    }>;
    results: Array<{
      title: string;
      body: string;
    }>;
  };
};

export const projects: Project[] = [
  {
    id: "ecommerce",
    title: "Electronic Devices Ecommerce",
    period: "Jul - Sep 2025",
    context: "Personal project",
    summary:
      "A production-minded commerce platform with atomic inventory reservation for high-concurrency checkout.",
    outcome:
      "Redis Lua scripts turn stock checks and mutations into one uninterruptible operation, preventing oversells without database-level contention.",
    tags: ["React", "Node.js", "MongoDB", "Redis", "Lua"],
    highlights: [
      {
        title: "Atomic inventory lifecycle",
        body:
          "RESERVE_LUA checks available stock, decrements availability, increments reserved stock, and updates the cart hash in one Redis operation. Related scripts confirm, reclaim, and merge reservations.",
      },
      {
        title: "Dual-layer cart",
        body:
          "Redis acts as the fast TTL-based source of truth while MongoDB provides persistence. Expired carts rebuild by re-reserving each item against current stock.",
      },
      {
        title: "Payment integrity",
        body:
          "PayOS webhook payloads are verified through the provider SDK before an order can move from draft payment state into checkout completion.",
      },
    ],
    github:
      "https://github.com/duyphan2501/mern-ecommerce-electronic-devices",
    liveDemo:
      "https://mern-ecommerce-electronic-devices.vercel.app/",
    caseStudy: {
      role: "Solo Full-stack Developer",
      goalHeading: "Make stock trustworthy.",
      processHeading: "Designed as a state machine, not a cart feature.",
      resultsHeading: "A complete inventory lifecycle.",
      repositorySummary:
        "The repository shows the storefront, admin application, API, and Redis scripts.",
      background:
        "Electronics commerce becomes difficult when multiple shoppers compete for the same product variant. A normal read-check-write flow can let two requests observe the final available unit before either one updates inventory.",
      purpose:
        "Build a complete shopping experience with a customer storefront, an administration console, and an API while treating inventory correctness as a core system requirement instead of a late checkout check.",
      process: [
        {
          title: "Mapped stock as a lifecycle",
          body:
            "I separated stock into available and reserved quantities, then defined the transitions for adding an item, changing quantity, removing it, completing payment, expiring a reservation, and merging a guest cart after login.",
        },
        {
          title: "Moved critical mutations into Redis Lua",
          body:
            "RESERVE_LUA reads the existing reservation, calculates the quantity difference, checks availability, updates stock, writes the cart, and schedules expiry in one atomic Redis execution. Companion scripts confirm, reclaim, remove, and merge reservations.",
        },
        {
          title: "Combined fast state with durable state",
          body:
            "Redis stores the active TTL-based cart and reservations, while MongoDB persists authenticated carts. When Redis state expires, the service rebuilds the cart item by item and re-reserves against current availability instead of trusting stale quantities.",
        },
        {
          title: "Connected payment to inventory finalization",
          body:
            "Orders begin in a draft state. The PayOS webhook is verified through the provider SDK, then successful payment confirms each reservation, decrements durable MongoDB stock in bulk, clears the persisted cart, and starts order email handling.",
        },
        {
          title: "Delivered separate customer and admin surfaces",
          body:
            "I built the React storefront for browsing, cart, checkout, account, and order tracking, plus an admin application for products, categories, stock, orders, dashboards, and rich product content.",
        },
      ],
      results: [
        {
          title: "Race-resistant reservation path",
          body:
            "The stock check and mutation now execute as one Redis operation, removing the read-check-write window that causes overselling under concurrent cart updates.",
        },
        {
          title: "Recoverable abandoned carts",
          body:
            "A sorted-set expiry index and reclaim script return timed-out reservations to available stock, while authenticated carts can be reconstructed from MongoDB with quantities adjusted to current inventory.",
        },
        {
          title: "Consistent guest-to-user transition",
          body:
            "Guest reservations move into the authenticated cart through an atomic merge operation, preserving held quantities without briefly releasing contested inventory.",
        },
        {
          title: "End-to-end commerce workflow",
          body:
            "The finished project covers catalog management, product variants, authentication, cart and reservation state, PayOS checkout, order tracking, stock administration, and sales reporting across three applications.",
        },
      ],
    },
  },
  {
    id: "social",
    title: "Mini Social Network",
    period: "Nov 2025",
    context: "Team of 3",
    summary:
      "A service-oriented social platform using RabbitMQ to decouple work, RPC requests, and real-time events.",
    outcome:
      "A single gateway coordinates HTTP and Socket.IO traffic while RabbitMQ messaging and database ownership keep five business domains independent.",
    tags: ["React", "Node.js", "MySQL", "RabbitMQ", "Socket.IO", "Docker"],
    highlights: [
      {
        title: "Three messaging patterns",
        body:
          "Work queues persist last-active updates, RabbitMQ RPC retrieves user data across services, and direct exchanges publish live post-like updates to the gateway.",
      },
      {
        title: "Cursor pagination",
        body:
          "Message history uses a beforeId cursor with descending indexed identifiers, avoiding page drift and repeated OFFSET scans as conversations grow.",
      },
      {
        title: "Domain-based realtime rooms",
        body:
          "The API gateway routes private notifications, conversations, and public post events through purpose-specific Socket.IO rooms.",
      },
    ],
    github: "https://github.com/duyphan2501/microservice_social_network",
    liveDemo: "http://ec2-18-141-142-75.ap-southeast-1.compute.amazonaws.com/",
    caseStudy: {
      role: "Full-stack Developer, Team of 3",
      goalHeading: "Keep domains independent and updates immediate.",
      processHeading: "Separated ownership, then connected it with messages.",
      resultsHeading: "One product, five isolated business domains.",
      repositorySummary:
        "The repository includes the React client, API gateway, five domain services, RabbitMQ contracts, database schemas, Nginx routing, and Docker Compose setup.",
      background:
        "A social product combines authentication, posts, friendships, chat, and notifications. Keeping all of that in one server makes domain boundaries unclear and lets failures or changes in one feature spread into the rest of the application.",
      purpose:
        "Build a working social network as independently deployable services while preserving one client entry point and real-time behavior for messages, friend activity, likes, comments, and notifications.",
      process: [
        {
          title: "Split the platform by business ownership",
          body:
            "The team separated users, chat, friends, posts, and notifications into five Express services. Each service owns its MySQL schema and exposes only its domain behavior instead of reading another service's tables.",
        },
        {
          title: "Centralized client traffic at the gateway",
          body:
            "An Express gateway uses http-proxy-middleware to route each API prefix to the correct service and hosts the Socket.IO server. Nginx sends browser, API, and WebSocket traffic through stable public paths.",
        },
        {
          title: "Applied three RabbitMQ communication patterns",
          body:
            "Durable work queues handle one-way jobs such as last-active updates, request-reply queues use exclusive reply queues and correlation IDs for cross-service user lookups, and direct or fanout exchanges distribute domain events.",
        },
        {
          title: "Mapped events to purpose-specific Socket.IO rooms",
          body:
            "The gateway consumes broker events and emits them to user, conversation, or post rooms. Private notifications target user rooms, messages target conversation rooms, and public like or comment changes target post rooms.",
        },
        {
          title: "Containerized the complete topology",
          body:
            "Docker Compose defines the client, Nginx, gateway, five domain services, MySQL, and RabbitMQ on one bridge network. Health checks delay dependent services until the database and broker are ready.",
        },
      ],
      results: [
        {
          title: "Clear domain boundaries",
          body:
            "Users, conversations, social relationships, posts, and notifications maintain separate schemas and communicate through explicit HTTP or RabbitMQ contracts.",
        },
        {
          title: "Decoupled cross-service queries",
          body:
            "RabbitMQ RPC pairs each request with a correlation ID and exclusive reply queue, allowing services to enrich data without directly calling or querying the user database.",
        },
        {
          title: "Real-time product behavior",
          body:
            "The gateway turns persisted chat, friendship, notification, like, and comment events into targeted Socket.IO updates for connected clients.",
        },
        {
          title: "Reproducible local environment",
          body:
            "A single Compose configuration starts routing, messaging, persistence, frontend, and backend services with shared networking and persistent MySQL storage.",
        },
      ],
    },
  },
  {
    id: "chat",
    title: "Realtime Chat and Video Call",
    period: "Mar - May 2026",
    context: "Team of 2",
    summary:
      "A horizontally scalable chat and WebRTC calling platform backed by distributed Redis state.",
    outcome:
      "Dedicated Redis adapter clients synchronize Socket.IO instances, while queued ICE candidates, multi-tab presence, and atomic call locks handle difficult timing failures.",
    tags: ["Next.js 16", "MongoDB", "Redis", "WebRTC", "Socket.IO"],
    highlights: [
      {
        title: "Horizontal Socket.IO scaling",
        body:
          "Dedicated pub and sub clients synchronize room emissions across instances without locking the Redis connection used by business commands.",
      },
      {
        title: "Reliable WebRTC negotiation",
        body:
          "ICE candidates arriving before the remote description is ready are deduplicated, buffered, validated against the expected peer, and flushed after negotiation catches up.",
      },
      {
        title: "Distributed call teardown",
        body:
          "A Redis SET NX EX lock ensures only one process writes the final call event when both peers disconnect at nearly the same time.",
      },
    ],
    github:
      "https://github.com/duyphan2501/realtime-chat-video-call-platform",
    liveDemo:
      "https://realtime-chat-video-call-platform.vercel.app/",
    caseStudy: {
      role: "Full-stack Developer, Team of 2",
      goalHeading: "Keep calls reliable when timing becomes unpredictable.",
      processHeading: "Distributed state around a peer-to-peer media path.",
      resultsHeading: "Realtime behavior that survives awkward edge cases.",
      repositorySummary:
        "The repository includes the Next.js client, Express and Socket.IO server, WebRTC lifecycle hook, Redis-backed presence and call state, MongoDB models, Nginx routing, and Docker Compose environment.",
      background:
        "Realtime chat and WebRTC calls are sensitive to ordering, reconnects, multiple browser tabs, device permission changes, and users disconnecting at nearly the same moment. A happy-path signaling flow is not enough for a dependable calling experience.",
      purpose:
        "Build a complete direct and group messaging platform with audio and video calling, then design the realtime layer so presence, signaling, call history, and room events continue to behave correctly across server instances and unstable client timing.",
      process: [
        {
          title: "Separated Redis responsibilities",
          body:
            "The server creates one general Redis client plus dedicated publisher and subscriber duplicates for the Socket.IO Redis Adapter. Room emissions can cross server instances without blocking business commands on a subscribed connection.",
        },
        {
          title: "Tracked presence per socket",
          body:
            "Each user owns a Redis Set of active socket IDs. Disconnecting one tab removes only that socket, and the user is marked offline only when the set becomes empty, preventing false offline events on multi-tab or multi-device sessions.",
        },
        {
          title: "Made WebRTC negotiation tolerant of event order",
          body:
            "The client owns a single RTCPeerConnection lifecycle, queues and deduplicates early ICE candidates, filters candidates from unexpected peers, and flushes the queue only after setRemoteDescription succeeds.",
        },
        {
          title: "Handled media loss and network traversal",
          body:
            "The call hook requests audio and video separately, allows video calls to continue with audio when the camera fails, watches permission and device changes, replaces sender tracks during recovery, and supports configured STUN and TURN servers.",
        },
        {
          title: "Protected distributed call cleanup",
          body:
            "Call metadata is stored for both peers in a Redis hash. When hang-up or disconnect paths race, a SET NX EX lock allows only one process to persist the terminal call message and notify the other participant.",
        },
        {
          title: "Kept conversation reads stable",
          body:
            "MongoDB conversation pagination uses a composite cursor on lastMessageAt and _id with matching sort order, while compound and partial indexes support participant and direct-conversation queries.",
        },
      ],
      results: [
        {
          title: "Cross-instance Socket.IO delivery",
          body:
            "User and conversation room events flow through the Redis Adapter, allowing realtime notifications and messages to reach clients connected to different server processes.",
        },
        {
          title: "Accurate multi-tab presence",
          body:
            "Redis Sets distinguish one closed tab from a fully disconnected user, so last-active updates and offline broadcasts happen only after the final socket leaves.",
        },
        {
          title: "More resilient call setup",
          body:
            "Queued ICE handling removes a common negotiation race, while optional TURN relay configuration and media recovery cover restrictive networks and changing device permissions.",
        },
        {
          title: "Single terminal call record",
          body:
            "The distributed teardown lock prevents simultaneous disconnect handlers from writing duplicate call-ended messages into the conversation.",
        },
        {
          title: "Complete messaging workflow",
          body:
            "The product supports direct and group conversations, attachments, reactions, replies, delivery and read state, friend management, presence, audio calls, video calls, and persisted call history.",
        },
      ],
    },
  },
];
