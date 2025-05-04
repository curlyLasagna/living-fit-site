# Living Fit Website

A modern re-write of the Living Fit Club's [website](https://www.livingfitclub.com/benefits)

This is a course project for a database course.
It is not at all related to the real Living Fit Club and is only theoretical.

Allows members to:
- Sign up for a membership online and be provided with a QR code as a means of entry
- Monitor a history of their payments and view upcoming payments
- Report an issue
- Add a family member to their account

## Stack

### UI

- Astro
- React
- Daisy UI

#### Spin up
1. `cd app/frontend`
2. `pnpm i`
3. `pnpm dev`

### Backend

- Postgres
- Express

#### Spin up

1. `docker compose up`

> Credentials can be found in the `docker-compose.yml` file

2. `cd app/backend`
3. `pnpm db-push` to apply db-schema