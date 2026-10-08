# Convex Setup

This project uses Convex for real-time database sync in baby prediction market.

## Setup

1. **Install Convex CLI:**

   ```bash
   brew install convex
   # Or visit https://convex.dev to sign up and install
   ```

2. **Create a Convex project:**

   ```bash
   npx convex dev
   ```

   This will prompt you to log in and create a new project.

3. **Add environment variables:**
   The `npx convex dev` command will create a `.env.local` file with your Convex URL automatically.

4. **Start development:**
   ```bash
   npm run dev:all
   ```
   Runs both Convex backend and Next.js frontend in one terminal!

## Schema

The baby prediction uses a simple `votes` table:

```typescript
{
  _id: string;
  prediction: "boy" | "girl";
  timestamp: number;
}
```

## Real-time Features

- **Live Updates**: Votes appear instantly across all connected clients
- **Optimistic UI**: UI updates immediately, then syncs with server
- **Automatic Aggregation**: Daily totals and statistics are computed in real-time
- **Type-safe**: Full TypeScript support from schema to client

## Convex Functions

Located in `convex/votes.ts`:

- `recordVote`: Mutation to record a new vote
- `getRecentVotes`: Query to get latest votes
- `getDailyAggregates`: Query to get daily prediction history
- `getCurrentTotals`: Query to get current boy/girl totals

## Development

When you make changes to `convex/schema.ts`, run:

```bash
npx convex dev
```

This will automatically regenerate TypeScript types and update your database schema.
