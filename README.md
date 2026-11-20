# StayCation · Hotel Booking

StayCation is a team-built hotel booking frontend with two workspaces. Travellers search available rooms, shortlist favourites and pay for a reservation. Hotel staff manage inventory and inspect bookings through a dashboard. The external hotel API owns the booking records; the React frontend connects those records to the guest and staff screens.

[Live demo](https://booking-iota-one.vercel.app/) · [Source code](https://github.com/DevsquadEg/booking)

## From room search to payment

1. **Search.** Open the room catalogue and choose dates and capacity. The availability request supports pagination and passes the selected filters to the hotel API.
2. **Shortlist.** Add a room to favourites. After the request succeeds, the favourites provider fetches the saved rooms and refreshes the count displayed in the navbar.
3. **Reserve.** On the room detail page, sign in and choose a date range. The form submits the room ID, dates in `YYYY-MM-DD` format and a total price. The current calculation multiplies the room price by the selected capacity.
4. **Pay.** A successful reservation returns a booking ID. The app passes it to `/checkout` through React Router state. Stripe Elements collects card details, and the frontend sends the resulting token ID to the payment endpoint for that booking.
5. **Confirm.** When the payment API returns `success: true`, the app shows a success message and opens `/success-payment`. Creating the reservation and confirming payment are two separate API operations.

## Install and run

Use Node.js 22.12 or later and pnpm 9. From a terminal:

```sh
git clone https://github.com/DevsquadEg/booking.git
cd booking
pnpm install --frozen-lockfile
pnpm dev
```

Open the URL printed by Vite. The repository includes the frontend. Room data, account verification, reservations and payment responses depend on the external hotel API.

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server with hot reload. |
| `pnpm lint` | Run ESLint. |
| `pnpm build` | Bundle production assets into `dist/` using Vite. |
| `pnpm preview` | Serve the built bundle locally. |

## Screens and navigation

| Area | Entry points | What users can do |
| --- | --- | --- |
| Account | `/login`, `/register`, `/verify-account`, `/forget-pass`, `/reset-pass` | Register, verify an account, sign in and recover a password. |
| Guest portal | `/`, `/rooms`, `/fav-list` | Search inventory, open a room, add a comment and revisit saved rooms. |
| Checkout | `/checkout`, `/success-payment` | Pay for the booking created by the room detail form and view confirmation. |
| Inventory | `/dashboard/rooms-list`, `/dashboard/facilities-list`, `/dashboard/ads-list` | Maintain rooms, facilities and promotional listings. |
| Operations | `/dashboard/bookings-list`, `/dashboard/users-list` | Inspect bookings and users, open booking details and print a receipt. |

After login, the frontend sends accounts with role `user` to the guest homepage and other roles to the dashboard. The dashboard layout renders its child routes directly. Backend authorization determines whether a request for administrative data can succeed.

## API and state

Paths below are relative to the base URL in `src/services/apiEndpoints.ts`. Capitalisation follows the client source.

| Operation | Request | Data used by the frontend |
| --- | --- | --- |
| Find available rooms | `GET /portal/rooms/available` | Page, page size and optional start date, end date and capacity. |
| Create a reservation | `POST /portal/Booking` | Sends `room`, `startDate`, `endDate` and `totalPrice`. Reads `data.booking._id` from the response body. |
| Pay for the reservation | `POST /portal/booking/{bookingId}/pay` | Sends `{"token":"<Stripe token ID>"}` and checks the response’s `success` flag. |

**Session.** Login stores the API-issued token under `token` in local storage. The shared Axios interceptor reads it before each request and attaches the bearer authorization header.

**Shared data.** Authentication, rooms and favourites have separate React contexts. The favourites provider tracks room IDs, room objects, a loading flag and the navbar count. Checkout uses navigation state for the booking ID.

## Code guide

| Location | Responsibility |
| --- | --- |
| `src/main.tsx`, `src/App.tsx` | Mount providers, configure Stripe Elements and connect routes to layouts. |
| `src/layouts/`, `src/templates/` | Separate account, guest and dashboard layouts from their feature screens. |
| `src/templates/Main/Rooms/room-details/RoomDetails.tsx` | Validate the booking form, submit a reservation and pass its ID to checkout. |
| `src/components/CheckOut/CheckOut.tsx` | Create the Stripe token, submit payment and handle the API response. |
| `src/store/` | Hold shared authentication, room and favourites state. |
| `src/services/` | Define API endpoints, the Axios client, route names, theme and validation rules. |

The app uses React 19, TypeScript and Vite. Material UI supplies the interface components, React Hook Form handles forms, React Router manages navigation and Axios handles HTTP requests. The `@/` import alias resolves to `src/`.

## Configuration and deployment

- **Hotel API:** The base URL is defined in `src/services/apiEndpoints.ts`; the shared client imports it from there.
- **Stripe:** `src/App.tsx` initialises Stripe with a publishable test key. For a checkout test, use a compatible test backend and Stripe test payment details.
- **Hosting:** Build with `pnpm build` and serve `dist/`. Configure the host to return `index.html` for application routes so direct visits to paths such as `/rooms` reach React Router.

## Manual verification and known limits

| Check | Expected behaviour |
| --- | --- |
| Try to reserve a room while signed out | The room form prompts the visitor to log in. |
| Submit a room reservation with an incomplete date range | The form asks for a valid date range before sending a booking request. |
| Add and remove a favourite | The favourites list and navbar count reflect the change. |
| Complete a test reservation and payment | The booking request returns an ID; the payment request uses that ID; success opens the confirmation screen. |
| Inspect a booking as hotel staff | The detail screen shows booking data and provides a printable receipt. |

**Checkout deep links.** Opening `/checkout` in a new tab skips the navigation step that supplies the booking ID. To reproduce the payment flow, start from a room detail page.

**Receipt QR code.** The booking detail component builds the receipt QR value using a placeholder domain. Configure a real booking URL before distributing receipts that rely on that code.

The production build succeeded during documentation review. The payment and staff-account scenarios above are manual checks; an end-to-end transaction was not performed.

## Selected contributions by Anas Alnagar

- Implemented the page shown after a successful payment. [Payment success commit](https://github.com/DevsquadEg/booking/commit/86dffed33)
- Updated how favourites refresh in the navbar. [Favourites commit](https://github.com/DevsquadEg/booking/commit/92e6af14a)
