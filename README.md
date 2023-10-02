<h3 align="center">DashBored (🚧 WIP)</h3>

<p align="center">
    The open-source dashboard management for everyone.
</p>

## Todo

### Phase 1

- [x] Authentication
- [x] Onboard Process
- [x] Workspaces - To allow team management
- [x] Spaces - Each workspaces can have multiple spaces, essentially means a page of website
- [ ] Plugin API
- [ ] Cards - Details within spaces (e.g. links, graphs, ...)

### Plugin API Idea

It could be something similar to how Cal.com built their app store.

- Plugins with metadata are seeded into database on every built or manually running the seeding.
- Components and logics are hosted in the file system.
- Dynamic importing components and logics when using the plugin (during cards creation and cards utilization).

## Goal

In my view, DashBored should be a platform for everyone (personal / team) to manage their dashboards, be it internally or publicly, with an internal API for anyone to build plugins within the platform.

### Use cases

- Links management
- Graphs with external data (Analytics, Sales Data, etc)
- Server status
- Real-time dashboard with external sources

## About the Project

Write it later...

### Built With

- [Next.js](https://nextjs.org)
- [Turborepo](https://turbo.build/repo)
- [tRPC](https://trpc.io)
- [React.js](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [Drizzle ORM](https://orm.drizzle.team)
