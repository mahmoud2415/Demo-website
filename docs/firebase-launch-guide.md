# Firebase Launch Guide

The demo runs with fictional local data before Firebase is connected. Complete these steps only when preparing a hosted, editable version.

## 1. Create ownership and accounts

Create a Firebase project and Cloudinary account under the business owner's email whenever this becomes a real client site. The project owner—not the developer—should retain recovery access and billing control.

Create a Firebase Web App, copy its public web configuration to a local `.env` based on `.env.example`, and add the administrator email in Firebase Authentication. The application reads these values only in `src/lib/firebase.ts`; do not paste them inside UI components. Web configuration values can be public; service-account keys and Cloudinary API secrets cannot.

## 2. Enable Firebase services

- Enable **Firestore Database** in production mode.
- Enable **Authentication → Email/Password** for the administrator.
- Keep Firebase on the Spark plan for this MVP.
- Do **not** enable Firebase Storage, Cloud Functions, phone authentication, or payment products without a separate cost review.

Create `admins/{UID}` for every approved administrator after the user signs in once. The document can contain `{ "role": "admin" }`. Deploy the included `firestore.rules` before importing any menu data.

## 3. Import menu content

Create the `categories`, `products`, and `promotions` collections using the shapes in [technical architecture](technical-architecture.md). Upload restaurant images to Cloudinary and store only optimized delivery URLs in Firestore. Keep images as WebP/AVIF where practical and deliver a small card-size variant.

## 4. Deploy

```sh
npm install
npm run build
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy --only firestore:rules,hosting
```

Connect the custom domain in Firebase Hosting. Firebase provisions TLS automatically after DNS records are verified. Check the site's Hosting usage dashboard monthly; the Spark plan has a free quota and may disable service for the remainder of a period when it is exceeded rather than billing automatically.

## Pre-launch checks

- Test Delivery, Pickup, and Dine-in WhatsApp messages on a phone.
- Verify public visitors cannot write to Firestore.
- Verify each admin can update data and non-admin accounts cannot.
- Check every Cloudinary image URL, loading state, and mobile layout.
- Ensure the public WhatsApp number, opening hours, and domain belong to the restaurant.
