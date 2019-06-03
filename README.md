# Hacker News Reader

HN Reader is a lightweight and mobile friendly feed from [Hacker News](https://news.ycombinator.com/). New stories are fetched automatically every 5s and will render instantly. HN Reader also features an infnite scroll, which will load older articles.

## How to run the application
Clone the repo locally and use `npm install`. On the first run use `npm run build` to build an optimized build of the application. This script will also automatically spin up an `express` server of the build with `npm run server`.

Once build is complete and the server is spun, navigate to `localhost:1337` and enjoy :)

Alternatively, you can run the development version of the application with `npm run start`
