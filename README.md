## Getting Started

Before starting the project you must install mongodb locally as there is a file that will create the database, collections and some passed reservations.
[MongoDB](https://www.mongodb.com/try/download/community)

Install all dependencies using terminal in project path with command:

```bash
npm install
```

Now, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

There are only 2 new users. There is no route or form to create users.
{ vid: 123456, password: 'Pass123' },
{ vid: 987654, password: 'Pass987' },

Booked past date:
'2024-03-24',

---

Each user can create, update and delete their own reservation.
If you modify the url it checks the token and will not let you do anything in another user's reservation.
