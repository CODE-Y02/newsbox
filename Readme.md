# DEMO

- [LIVE DEMO ](https://newsbox-web.vercel.app/)

# Backend

- The code inside /backend is server code
- Stack: Node js, Docker, Bun, ElysiaJS, Redis, PostgreSQL db, TS
- The Backend is deployed on cloud and can be found in `/backend`
- We can also run it on local
- Prerequisites for running locally: Docker, Bun & git.
- Steps to run locally:
  - `git clone https://github.com/CODE-Y02/newsbox`
  - `cd newsbox/backend`
  - `bun i`
  - `bun d:dev`

# Client

- I have made basic client with next js and mostly ssr only.
- everything is typed i.e TS is used
- prerequisites for running locally:
  - first run _backend_ then do this setup
  - go to `/news-app-web `
  - create .env with SERVER_BASE=http://localhost:PORT
  - PORT will be then port on which the server is running
  - now do `bun i && bun dev`

---

Contributors:
@CODE-Y02
