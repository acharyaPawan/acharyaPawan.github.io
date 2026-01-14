export default function ResumePage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold uppercase tracking-[0.2em]">
        Pawan Acharya
      </h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        <a
          href="mailto:pawanacharya102@gmail.com"
          className="underline decoration-neutral-400 underline-offset-2 transition hover:text-neutral-900 dark:decoration-neutral-600 dark:hover:text-neutral-100"
        >
          pawanacharya102@gmail.com
        </a>{' '}
        |{' '}
        <a
          href="https://acharyapawan.github.com"
          className="underline decoration-neutral-400 underline-offset-2 transition hover:text-neutral-900 dark:decoration-neutral-600 dark:hover:text-neutral-100"
        >
          acharyaPawan.github.com
        </a>{' '}
        |{' '}
        <a
          href="https://github.com/acharyaPawan"
          className="underline decoration-neutral-400 underline-offset-2 transition hover:text-neutral-900 dark:decoration-neutral-600 dark:hover:text-neutral-100"
        >
          github.com/acharyaPawan
        </a>
      </p>

      <article className="prose mt-8 dark:prose-invert">
        <h2>Technical Skills</h2>
        <ul>
          <li>
            <strong>Languages:</strong> C, C++, Typescript(js), C#, Python
          </li>
          <li>
            <strong>Frontend:</strong> React, Nextjs, Rechartsjs, Motionjs, Web
            Extension, Shadcn
          </li>
          <li>
            <strong>Backend:</strong> Nodejs(Express, Hono, Fastify), ASP .NET
            CORE, Python(Django/Flask), Auth(Authjs, Better-Auth), Graphql,
            RabbitMq, Opentelementry, Grafana, Redis, SocketIO, AI SDK, LiveKit
            SDK
          </li>
          <li>
            <strong>Infrastructure and CI/CD:</strong> Docker, Kubernetes with
            K3S, Github Action, VPS
          </li>
        </ul>

        <h2>Projects</h2>

        <h3>
          <a href="https://github.com/acharyaPawan/livingbytes">LivingByte</a>
        </h3>
        <ul>
          <li>All-in-one application for task management and events.</li>
          <li>Features like journal writing available.</li>
          <li>
            Used next-auth for authentication with handling of task scheduling.
          </li>
          <li>
            Tracking feature; visualize the tracker status on a monthly / weekly
            basis.
          </li>
        </ul>

        <h3>
          <a href="https://github.com/acharyaPawan/web-sathi">Web-sathi</a>
        </h3>
        <ul>
          <li>Extension for browser; companion for web-exploring.</li>
          <li>Highlight text, talk to AI, Save excerpt from web as note.</li>
          <li>Feature like session and topics.</li>
          <li>Used Better-Auth for authentication.</li>
        </ul>

        <h3>
          <a href="https://github.com/acharyaPawan/tokoen">Tokoen</a>
        </h3>
        <ul>
          <li>Token management with RBAC mechanism.</li>
          <li>Live update with socket, sync across all users.</li>
          <li>Used socket.io for websocket.</li>
          <li>Backend frontend multirepo setup.</li>
        </ul>

        <h3>
          <a href="https://discord-clone-production-bca2.up.railway.app/">
            Discord-clone
          </a>
        </h3>
        <ul>
          <li>Realtime chat-collaboration feature.</li>
          <li>Video call feature.</li>
        </ul>

        <h3>
          <a href="https://github.com/acharyaPawan/library-management">
            Library Management System
          </a>
        </h3>
        <ul>
          <li>A fullstack django project with htmx.</li>
          <li>MVC or MVT pattern with django.</li>
        </ul>

        <h3>
          <a href="https://github.com/acharyaPawan/choice">Choice</a>
        </h3>
        <ul>
          <li>Make realtime polling or voting.</li>
          <li>Use recharts library for visualization.</li>
        </ul>

        <h3>
          <a href="https://github.com/acharyaPawan/ecommerce-platform">
            Ecommerce platform
          </a>
        </h3>
        <ul>
          <li>
            Used SOA with catalog, inventory, orders, iam, payment, cart.
          </li>
          <li>
            Two nextjs applications: for shopping for customers and admin
            following BFF(backend for frontend) architecture.
          </li>
          <li>
            Outbox pattern alongside postgres db, and rabbitmq worker publisher.
          </li>
          <li>Idempotency key to prevent unwanted duplication.</li>
          <li>
            Outbox pattern alongside postgres db, and rabbitmq worker publisher.
          </li>
          <li>Used JWKS for distributed auth handling with jose package.</li>
          <li>Shopping cart for visiting users, persistent with login.</li>
        </ul>
      </article>
    </section>
  )
}
