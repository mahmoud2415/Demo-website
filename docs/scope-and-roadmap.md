# Scope and Roadmap

## MVP

- Original Mahmoud logo and a white/brick-red visual system.
- Arabic RTL responsive pages: Home, category, search, product, cart, and More.
- Promotional banner, top categories, best sellers, recommendations, and fictional menu content.
- Cart with quantities, item options, customer notes, and local persistence.
- Delivery, Pickup, and Dine-in selection, followed by a structured WhatsApp order message.
- Authenticated admin dashboard for menu, pricing, image, availability, featured item, category, and promotion management.
- Firebase Hosting deployment and a documented handoff path for a future real client.

## Explicitly Deferred

- Online payments, delivery zones or delivery fees, order tracking, customer accounts, loyalty points, push notifications, social links, multi-language support, table-number ordering, and native mobile apps.

## Delivery Phases

1. **Foundation:** repository, project tooling, Firebase project configuration, design tokens, and data model.
2. **Customer experience:** public menu, browsing, product details, cart, and WhatsApp checkout.
3. **Administration:** authentication, secured Firestore rules, and content-management screens.
4. **Quality and launch:** responsive review, accessibility checks, image optimization, production deployment, and documentation update.

## Acceptance Criteria

- The complete order flow works on mobile in RTL.
- Each ordering mode produces an accurate WhatsApp message containing cart items, quantities, notes, subtotal, and mode.
- Public visitors cannot modify Firestore data.
- An administrator can publish a product change without editing source code.
- All imagery is optimized and the public site has no dependency on a paid Firebase service.

## Documentation Practice

Update these files whenever scope, architecture, data shape, deployment, or an external-service decision changes. Add feature-specific documentation under `docs/` before or alongside the implementation it describes.

