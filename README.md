This is a page that lets you search, filter and download files. It also has a route interceptor that checks for a specific referer, and sets referer to a cookie for a poor man's authentication system.

## How to run:

Create a .env file with a postgres connection string:

```bash
DB_CONNECTION_STRING=YOUR_CONNECTION_STRING
```

Then install dependencies and run dev server:

```bash
npm install
npm run dev
```

## Features

- Next.js 13 App Directory
- Drizzle ORM
- Radix UI Primitives composed as [shadcn components](https://ui.shadcn.com/)
- Tailwind CSS
- Icons from [Lucide](https://lucide.dev)
- Dark mode with `next-themes`
- Tailwind CSS class sorting, merging and linting.

