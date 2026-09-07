# Bistro Delivery — Requirements Specification

|                            |                                                                         |
| -------------------------- | ----------------------------------------------------------------------- |
| **Document**               | Functional Requirements (source of truth for test traceability)         |
| **Version**                | 1.1                                                                     |
| **Last updated**           | 2026-06-10                                                              |
| **Owner**                  | QA / Hypersequent                                                       |
| **Application under test** | https://hypersequent.github.io/bistro/                                  |
| **Behavioural reference**  | [`docs/CONTEXT.md`](./CONTEXT.md)                                       |
| **Test plans**             | [`docs/MANUAL.md`](./MANUAL.md) · [`docs/AUTOMATED.md`](./AUTOMATED.md) |

---

## 1. Overview

**Bistro Delivery** is a single-restaurant, frontend-only food-ordering demo (pizzas, drinks,
desserts). It exists to showcase the **QA Sphere** Test Management System. There is no backend,
no real payment, and no order fulfilment — all logic runs client-side and cart state is persisted
to `localStorage`.

This document captures the **functional requirements** that the test suite verifies. Each
requirement is the single point of traceability for one or more test cases in `MANUAL.md` and
`AUTOMATED.md`. Non-functional polish (visual rendering, responsive layout, copy review) is captured
as requirements too, but is exercised mainly through manual/visual test cases.

## 2. How to read this document

- **Requirement IDs** use the form **`XXX: Short Title`**, where `XXX` is a unique mnemonic for
  the requirement (not a running number). Example: `ADD: Add Items to the Cart`.
- **Priority** is one of `Critical`, `High`, `Medium`, `Low`.
- **Acceptance criteria** are the testable conditions a requirement must satisfy.
- **Covered by** lists the test cases (`BD-###`) that verify the requirement. `BD-001…BD-045` are
  manual; `BD-057…BD-071` are automated.
- Test cases link back here by URL; the canonical hosted location used in those links is
  `https://github.com/Hypersequent/bistro/blob/main/docs/REQUIREMENTS.md`.

---

## 3. Requirements

### 3.1 Navigation & Layout

#### NAV: Navbar links route correctly

- **Priority:** High
- **Description:** The top navigation bar shall expose Welcome, Today's Menu, and About us links
  that route the user to the correct destinations, and shall render consistently on every page.
- **Acceptance criteria:**
  - "Welcome" navigates to the home page (`/bistro/`).
  - "Today's Menu" targets the `#menu` section of the home page.
  - "About us" navigates to `/bistro/about`.
  - The navbar (and footer) are present on Home, Menu, About, and Checkout.
- **Covered by:** BD-001, BD-006, BD-057

#### LOGO: Logo returns home

- **Priority:** Medium
- **Description:** Clicking the Bistro Delivery logo shall return the user to the home page from
  any page.
- **Acceptance criteria:**
  - The logo is a link to `/bistro/`.
  - Clicking it from About (or Checkout) loads the home page with the hero and menu.
- **Covered by:** BD-002

#### MENULINK: Menu link scrolls to menu

- **Priority:** Medium
- **Description:** The "Today's Menu" navigation link and the hero "View Today's Menu" button shall
  bring the menu section into view.
- **Acceptance criteria:**
  - Activating the link/button scrolls to and reveals the `#menu` section.
  - No full page reload is required when already on the home page.
- **Covered by:** BD-003

#### FOOTER: Footer shows QA Sphere link

- **Priority:** Low
- **Description:** The live site footer shall display the Bistro Delivery / QA Sphere attribution
  and link to the project repository.
- **Acceptance criteria:**
  - Footer text reads **"Bistro Delivery - QA Sphere demo app"**.
  - The footer links to `github.com/Hypersequent/bistro`.
- **Covered by:** BD-004

#### HERO: Hero presents brand and call to action

- **Priority:** Medium
- **Description:** The home page shall open with a full-width hero banner that presents the brand
  (heading and tagline over a banner photo) and a "View Today's Menu" call to action that reveals
  the menu section.
- **Acceptance criteria:**
  - The hero banner background image renders (no missing/broken image).
  - The heading reads **"Bistro Delivery"** and the tagline reads exactly
    _"Elegance of French&Italian Cuisine Delivered Directly to Your Doorstep!"_.
  - The **"View Today's Menu"** button anchors to `#menu` and brings the menu section into view
    without a full page reload.
- **Covered by:** BD-005

### 3.2 Responsive & Mobile Navigation

#### RESPONSIVE: Navbar collapses on narrow screens

- **Priority:** High
- **Description:** On narrow (mobile) viewports the navbar links shall collapse behind a hamburger
  toggler that expands and collapses the menu, and the links shall remain functional.
- **Acceptance criteria:**
  - The hamburger toggler is visible below the Bootstrap breakpoint and hidden above it.
  - Tapping the toggler expands the nav links; tapping again collapses them.
  - Each link navigates correctly from the expanded mobile menu.
- **Covered by:** BD-007, BD-008, BD-009

#### MOBILE: Pages reflow on mobile

- **Priority:** Medium
- **Description:** All pages shall remain usable and visually correct on a typical mobile viewport
  with no overlap, clipping, or loss of key controls.
- **Acceptance criteria:**
  - Content reflows to a single readable column without horizontal scroll.
  - The cart icon and badge remain visible and tappable.
- **Covered by:** BD-010, BD-011

### 3.3 Menu

#### MENU: Menu shows tabs with Pizzas active

- **Priority:** High
- **Description:** The home page menu shall present Pizzas, Drinks, and Desserts tabs, with Pizzas
  shown and active on first load, and six items per category.
- **Acceptance criteria:**
  - On load, the Pizzas tab has the active state and its panel is visible.
  - Each category lists six items (18 total).
- **Covered by:** BD-012

#### TABS: Tabs reveal and mark categories

- **Priority:** High
- **Description:** Selecting a menu tab shall reveal only that category's items and mark the tab as
  active, without navigating away from the page.
- **Acceptance criteria:**
  - The selected tab gains `button--is-active`; others lose it.
  - The matching panel gains `menu--is-visible`; others lose it.
  - Clicking a tab does not navigate (default prevented).
- **Covered by:** BD-013, BD-058

#### CARD: Menu cards show item details

- **Priority:** High
- **Description:** Each menu item shall display its title, price (as `$<integer>`), description,
  and an Add-to-cart button, matching the source menu data.
- **Acceptance criteria:**
  - Title, price, and description render for every item.
  - Prices and titles match the menu data per category.
  - Every card has a functional Add-to-cart button.
- **Covered by:** BD-014, BD-059

#### IMAGE: Pizzas show images only

- **Priority:** Medium
- **Description:** Pizza items shall display a product image; drinks and desserts shall render
  without an image, by design.
- **Acceptance criteria:**
  - Each pizza card shows a product thumbnail.
  - Drink and dessert cards render correctly with no image placeholder.
- **Covered by:** BD-015

#### TABRESET: Menu tab selection is not persisted

- **Priority:** Low
- **Description:** The active menu category is view-local state: every fresh render of the home
  page shall start on the Pizzas tab. Selecting another tab shall not survive a page reload or
  navigating away and back, and shall not affect the (persisted) cart.
- **Acceptance criteria:**
  - After selecting Drinks or Desserts, reloading the page shows Pizzas active again.
  - After selecting another tab, navigating Home → About → Home shows Pizzas active again.
  - The cart badge and contents are unchanged by tab selection or the reset.
- **Covered by:** BD-016

### 3.4 Cart

#### ADD: Add items to cart

- **Priority:** Critical
- **Description:** Users shall be able to add menu items to the cart; re-adding the same item shall
  increment its quantity rather than create a duplicate line.
- **Acceptance criteria:**
  - First add creates a line with quantity 1.
  - Subsequent adds of the same item increment that line's quantity.
  - Items from any category can be added.
- **Covered by:** BD-017, BD-061

#### BADGE: Cart badge shows total quantity

- **Priority:** High
- **Description:** The cart icon badge shall show the sum of all item quantities and update
  immediately on every change.
- **Acceptance criteria:**
  - Badge equals the sum of all line quantities (not the number of distinct items).
  - Badge updates immediately when items are added/removed or quantities change.
- **Covered by:** BD-018, BD-060

#### TOTAL: Totals calculate correctly

- **Priority:** Critical
- **Description:** Each line total shall equal `price × quantity` and the cart total shall equal
  the sum of all line totals, shown in whole-dollar USD.
- **Acceptance criteria:**
  - Line total = price × quantity for each item.
  - Cart total (`[data-testid="cartTotal"]`) = sum of all line totals.
  - No decimals/rounding occur (integer prices and quantities).
- **Covered by:** BD-019, BD-062

#### MODAL: Cart modal opens and closes

- **Priority:** Medium
- **Description:** The cart modal shall open from the cart icon and close via the ×, the Close
  button, or a backdrop click.
- **Acceptance criteria:**
  - Clicking the cart icon opens the "My cart" modal.
  - ×, Close, and backdrop click each dismiss the modal.
- **Covered by:** BD-020

#### EMPTY: Empty cart shows a message

- **Priority:** Medium
- **Description:** When the cart is empty, the modal shall show an empty-state message and shall
  not offer a Checkout action.
- **Acceptance criteria:**
  - Empty cart shows "No items in your cart".
  - No Checkout button is present while the cart is empty.
- **Covered by:** BD-021

### 3.5 Quantity & Removal

#### QTY: Quantity edits update totals

- **Priority:** High
- **Description:** Setting a line quantity to a value greater than zero shall update that line and
  recompute line and cart totals.
- **Acceptance criteria:**
  - Entering a value > 0 updates the quantity, line total, and cart total.
  - The badge reflects the new total quantity.
- **Covered by:** BD-022, BD-063

#### ZERO: Invalid quantities remove items

- **Priority:** High
- **Description:** Setting a line quantity to 0, clearing it, or entering non-numeric text shall
  remove that item from the cart.
- **Acceptance criteria:**
  - Quantity `0` removes the line.
  - Empty input removes the line (parsed as 0).
  - Non-numeric input removes the line (parsed as 0).
- **Covered by:** BD-023, BD-024, BD-064

#### NEG: Negative quantities are ignored

- **Priority:** Medium
- **Description:** Entering a negative quantity shall leave the cart unchanged.
- **Acceptance criteria:**
  - A negative value does not change the line quantity or totals.
  - The `min="1"` attribute discourages negatives via the UI.
- **Covered by:** BD-025

#### REMOVE: Remove button deletes a line

- **Priority:** High
- **Description:** The red X button on a cart line shall remove that line and recompute the total.
- **Acceptance criteria:**
  - Clicking X removes only that line.
  - The cart total and badge update accordingly.
- **Covered by:** BD-026, BD-065

### 3.6 Checkout

#### GUARD: Checkout requires a non-empty cart

- **Priority:** High
- **Description:** The checkout page shall be reachable only through the in-app Checkout action
  with items in the cart; direct navigation that resolves to an empty cart shall redirect to home.
- **Acceptance criteria:**
  - Direct navigation to `/bistro/checkout` with an empty cart redirects to the home page.
  - Checkout is reached via the cart modal's Checkout button when items are present.
- **Covered by:** BD-027, BD-066

#### SUMMARY: Checkout summary matches cart

- **Priority:** High
- **Description:** The checkout page shall present an order summary table that mirrors the cart
  contents and total.
- **Acceptance criteria:**
  - Columns: Image, Title, Count, Total Price; one row per cart item plus a Total row.
  - Each row's count and total match the cart; the Total matches the cart total.
- **Covered by:** BD-028, BD-029, BD-067

#### FORM: Checkout requires name and address

- **Priority:** High
- **Description:** The checkout form shall require a Name and an Address before an order can be
  placed.
- **Acceptance criteria:**
  - Name (`#customerName`) and Address (`#customerAddress`) are `required`.
  - Submitting with either empty is blocked by HTML5 validation.
- **Covered by:** BD-030, BD-035

#### PAYMENT: Checkout offers cash and card

- **Priority:** Medium
- **Description:** The payment method selector shall offer exactly Cash on Delivery and Card
  Payment on Delivery; no option is preselected. Selection is not enforced — an order placed
  without choosing echoes an empty payment method. (Echoing the chosen method in the order
  confirmation is covered by ORDER.)
- **Acceptance criteria:**
  - The select contains exactly those two options, and either option can be selected.
  - No option is preselected — the select renders blank until the user picks one.
- **Covered by:** BD-031

### 3.7 Order Placement

#### ORDER: Order confirmation echoes details

- **Priority:** Critical
- **Description:** Submitting a valid checkout form shall replace the form with a success
  confirmation that echoes the entered name, address, and payment method.
- **Acceptance criteria:**
  - Heading reads exactly **"Your order placed successfully!"**.
  - The message echoes the entered name, address, and selected payment method.
  - Works for both Cash and Card payment methods.
- **Covered by:** BD-032, BD-033, BD-034, BD-068, BD-069

#### NOCLEAR: Order does not clear cart

- **Priority:** Medium
- **Description:** After an order is placed, the cart shall retain its items (nothing is
  transmitted anywhere and the cart is not reset).
- **Acceptance criteria:**
  - The order summary remains visible above the confirmation.
  - Re-opening the cart shows the same items; `localStorage.cart` is unchanged.
- **Covered by:** BD-036, BD-070

### 3.8 About & Content

#### ABOUT: About explains the demo purpose

- **Priority:** Low
- **Description:** The About page shall present the Bistro Delivery introduction, a featured image,
  and copy explaining that the app is a QA Sphere showcase and that no real food can be ordered.
- **Acceptance criteria:**
  - Heading reads "Welcome to Bistro Delivery".
  - Copy states the app is a QA Sphere demo and links to qasphere.com.
  - The featured image renders; copy is free of obvious errors.
- **Covered by:** BD-037, BD-038, BD-039, BD-040, BD-041

### 3.9 Persistence & State

#### PERSIST: Cart persists across sessions

- **Priority:** High
- **Description:** Cart contents shall persist to `localStorage` under the `cart` key and survive
  page reloads, in-app navigation, and new sessions on the same origin.
- **Acceptance criteria:**
  - Cart survives a full page reload.
  - Cart survives navigation between Home, Menu, and About.
  - Cart state is stored as a JSON array of `{ id, quantity }` under `localStorage.cart`.
- **Covered by:** BD-042, BD-043, BD-044, BD-071

#### HYDRATE: Malformed cart data resets safely

- **Priority:** Low
- **Description:** If the stored cart data is malformed or not an array, the app shall reset the
  cart to empty without error on load.
- **Acceptance criteria:**
  - Malformed `localStorage.cart` results in an empty cart (badge 0).
  - No uncaught error occurs during hydration.
- **Covered by:** BD-045

---

## 4. Traceability matrix

| Requirement | Priority | Covered by                             |
| ----------- | -------- | -------------------------------------- |
| NAV         | High     | BD-001, BD-006, BD-057                 |
| LOGO        | Medium   | BD-002                                 |
| MENULINK    | Medium   | BD-003                                 |
| FOOTER      | Low      | BD-004                                 |
| HERO        | Medium   | BD-005                                 |
| RESPONSIVE  | High     | BD-007, BD-008, BD-009                 |
| MOBILE      | Medium   | BD-010, BD-011                         |
| MENU        | High     | BD-012                                 |
| TABS        | High     | BD-013, BD-058                         |
| CARD        | High     | BD-014, BD-059                         |
| IMAGE       | Medium   | BD-015                                 |
| TABRESET    | Low      | BD-016                                 |
| ADD         | Critical | BD-017, BD-061                         |
| BADGE       | High     | BD-018, BD-060                         |
| TOTAL       | Critical | BD-019, BD-062                         |
| MODAL       | Medium   | BD-020                                 |
| EMPTY       | Medium   | BD-021                                 |
| QTY         | High     | BD-022, BD-063                         |
| ZERO        | High     | BD-023, BD-024, BD-064                 |
| NEG         | Medium   | BD-025                                 |
| REMOVE      | High     | BD-026, BD-065                         |
| GUARD       | High     | BD-027, BD-066                         |
| SUMMARY     | High     | BD-028, BD-029, BD-067                 |
| FORM        | High     | BD-030, BD-035                         |
| PAYMENT     | Medium   | BD-031                                 |
| ORDER       | Critical | BD-032, BD-033, BD-034, BD-068, BD-069 |
| NOCLEAR     | Medium   | BD-036, BD-070                         |
| ABOUT       | Low      | BD-037, BD-038, BD-039, BD-040, BD-041 |
| PERSIST     | High     | BD-042, BD-043, BD-044, BD-071         |
| HYDRATE     | Low      | BD-045                                 |

## 5. Revision history

| Version | Date       | Author            | Notes                                                                                                                                                                               |
| ------- | ---------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0     | 2026-05-26 | QA / Hypersequent | Initial requirements set derived from `CONTEXT.md` and verified against the live demo.                                                                                              |
| 1.1     | 2026-06-10 | QA / Hypersequent | Live-app verification sweep (WS1 findings): replaced untestable TRANSITION → HERO and ANIM → TABRESET (same BD-005/BD-016 slots); corrected PAYMENT (no default selection on live). |
