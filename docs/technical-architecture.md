# Technical Architecture

## Stack

- **Frontend:** React with TypeScript, implemented as a mobile-first RTL web app.
- **Hosting:** Firebase Hosting.
- **Data:** Cloud Firestore for public menu data and administration data.
- **Admin access:** Firebase Authentication.
- **Media:** Cloudinary Free for product imagery and transformations.
- **Checkout:** WhatsApp click-to-chat; no payment gateway or server-side order processing in the MVP.

## Cost Strategy

The MVP is designed to stay within free tiers, aside from the custom domain. Firebase Hosting, Firestore, and Authentication run on the Spark plan. Cloudinary hosts product images because Firebase Storage requires the Blaze billing plan. The project must not introduce Cloud Functions, Firebase Storage, SMS authentication, or payment processing without an explicit cost review.

## Public Data and Access Control

Public visitors may read only published menu content. Write operations require an authenticated administrator. Firestore rules must protect every write path; hiding an admin URL is not access control.

Planned collections:

- `categories`: name, sort order, image, enabled state.
- `products`: category, name, description, price, image URL, add-ons, availability, and featured state.
- `promotions`: banner content, linked product/category, visibility window, and enabled state.
- `admins`: approved administrator identity and role metadata.

## Deployment

Source code will live in Git. Firebase Hosting deploys the production build, with a custom domain connected before launch. Firebase and Cloudinary credentials are environment configuration and must never be committed. The public contact number is configuration rather than hard-coded UI text.

The current showcase intentionally renders seeded local data so it can be demonstrated without external accounts. Its Firebase configuration, Firestore rules, environment-variable template, and migration guide are included in the repository. Connecting live Firestore is a launch step after the project owner creates the accounts.

The public menu bundle initializes only the Firebase application. Authentication and Firestore client code should be loaded only when the protected administration area is connected, so visitors do not download dashboard-only code.

## Constraints

- Build static/client-side flows only in the MVP.
- Optimize images and lazy-load noncritical media to preserve free hosting bandwidth.
- Use WhatsApp only to open a prefilled order message; the app does not claim to track or confirm an order.
