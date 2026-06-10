# Bistro Delivery — Project Context

This document captures the features and implementation details of the **Bistro Delivery**
demo application. It is the source of truth for authoring test plans (`docs/MANUAL.md` and
`docs/AUTOMATED.md`) in the QA Sphere Test Management System (TMS).

---

## 1. What this app is

Bistro Delivery is a small single-restaurant **food-ordering demo** (pizzas, drinks,
desserts). It is intentionally simple and frontend-only: there is **no backend, no real
payment, and no real order fulfilment**. Its actual purpose is to serve as a sample
application for demonstrating QA Sphere (a Test Management System) — the About page states
this explicitly.

- **Live demo (test against this):** https://hypersequent.github.io/bistro/
- **This repository:** `https://github.com/Hypersequent/bistro` — the source the deployed site
  is built from.
- **Predecessor repo:** `food-delivery-demo` (archived) — an older source copy, functionally
  identical except the **footer** and the **animation layer**. Its footer shows a "Food Delivery
  HTML Template by WowThemes.net" attribution, whereas the **live site** footer shows
  `Bistro Delivery - QA Sphere demo app` linking to `github.com/Hypersequent/bistro`. Its source
  also carries AOS (`data-aos`) attributes (e.g. in `Hero1.svelte`) that are **absent from this
  repo and the live build** — the live site has no AOS at all (verified: no `[data-aos]` elements,
  no AOS CSS/JS). This document describes the **live site**; when writing tests, assert on the
  live footer and do not expect any scroll animations.

---

## 2. Tech stack

| Concern      | Choice                                                                                                                                                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework    | SvelteKit (Svelte 4)                                                                                                                                                                                                            |
| Language     | TypeScript                                                                                                                                                                                                                      |
| Build / dev  | Vite                                                                                                                                                                                                                            |
| Adapter      | `@sveltejs/adapter-static` — fully **prerendered static site** (`prerender = true`)                                                                                                                                             |
| Styling      | Bootstrap 4.4.1 + custom SCSS (`src/lib/styles`)                                                                                                                                                                                |
| Animations   | None observable on the live site — no AOS (only the predecessor repo's source references it); the View Transitions API is invoked on navigation but yields only the browser-default brief cross-fade (no custom transition CSS) |
| State        | Svelte store (`writable`) persisted to `localStorage`                                                                                                                                                                           |
| Hosting      | GitHub Pages, served under base path `/bistro`                                                                                                                                                                                  |
| Tests (repo) | Vitest — currently a single trivial placeholder test (`src/index.test.ts`)                                                                                                                                                      |

Because the site is prerendered and static, **all logic runs client-side in the browser**.
There are no API calls, no server, and no authentication.

---

## 3. Site map, routes & navigation

| Route (live)       | Source                             | Purpose                             |
| ------------------ | ---------------------------------- | ----------------------------------- |
| `/bistro/`         | `src/routes/+page.svelte`          | Home — hero banner + menu + cart    |
| `/bistro/about`    | `src/routes/about/+page.svelte`    | "About us" marketing/QA Sphere page |
| `/bistro/checkout` | `src/routes/checkout/+page.svelte` | Checkout (order summary + form)     |

A shared layout (`src/routes/+layout.svelte`) renders the **Navbar** (top) and **Footer**
(bottom) on every page.

**Navbar links** (`Navbar.svelte`):

- Logo → home (`/bistro/`)
- **Welcome** → home (`/bistro/`)
- **Today's Menu** → `/bistro/#menu` (anchor scroll to the menu section)
- **About us** → `/bistro/about`
- A hamburger toggler appears on narrow viewports (Bootstrap `navbar-toggler`) and
  expands/collapses the nav links.

Navigation calls the **View Transitions API** (`document.startViewTransition`) when the browser
supports it, but the app defines **no custom transition CSS**, so only the browser-default ~250 ms
root cross-fade runs — visually indistinguishable from instant navigation. **Do not write test
cases that assert a visible page transition.** Non-supporting browsers fall back to normal
navigation; no errors either way.

---

## 4. Pages & features (detailed behavior)

### 4.1 Home — Hero (`Hero1.svelte`)

- Full-width banner image (`.hero1`, background `img/featured.jpg`) with heading
  **"Bistro Delivery"**, tagline
  _"Elegance of French&Italian Cuisine Delivered Directly to Your Doorstep!"_, and a
  **"View Today's Menu"** button that anchors to `#menu`.
- **No animations on the live site:** the predecessor repo's source marks the heading/tagline/button
  with AOS `data-aos` attributes, but this repo and the live build omit AOS entirely — hero content
  renders immediately, fully visible.

### 4.2 Home — Menu (`Menu.svelte`)

The core feature. A tabbed menu with three categories:

- **Tabs:** `Pizzas` (active by default), `Drinks`, `Desserts`.
- Tabs are `<a role="button">` elements. Clicking a tab calls `preventDefault()` (no
  navigation) and toggles which category is visible:
  - Active tab gets class `button--is-active`.
  - The matching menu container (`#pizzaMenu` / `#drinksMenu` / `#dessertsMenu`) gets class
    `menu--is-visible`; the others lose it.
- Each menu **item card** shows: title, price (`$<price>`), description, and an
  **"Add to cart"** button. Pizzas additionally show a product image; **drinks and desserts
  have no images** (no `imageUrl` in data).
- Clicking **"Add to cart"** calls `cart.add(id)` — increments quantity if already in cart,
  otherwise adds with quantity 1. The cart badge updates immediately.
- **The active tab is view-local state and is never persisted:** reloading the page, or navigating
  away (e.g. to About) and back, always resets the menu to the **Pizzas** tab. Tab switching never
  affects the (persisted) cart.

### 4.3 Cart (`Cart.svelte`)

A floating cart icon + Bootstrap-style modal.

- **Cart icon** — the floating cart icon (bottom-left of the viewport, `position: fixed`) shows
  a badge with the **total item count** (sum of all
  quantities; `0` when empty). The badge updates instantly when the count changes — there is **no
  animation** on the icon or badge on the live site (verified: no class/transform/animation
  activity on `.my-cart-icon` when adding an item).
- Clicking the icon opens the **"My cart"** modal. The modal can be closed via the **×**
  button, the **Close** button, or by clicking the backdrop.
- **Empty cart:** modal shows _"No items in your cart"_ and **no Checkout button**.
- **Non-empty cart:** each line shows image (if any), title, an editable **quantity**
  `<input type="number" min="1">`, line total (`price × quantity`), and a red **X** remove
  button. A **Total** row sums all line totals. A **Checkout** button (link to
  `/bistro/checkout`) appears only when the cart has items.
- **Quantity editing rules** (`cart.update(id, qty)`):
  - Set to a value **> 0** → updates the quantity.
  - Set to **0** → **removes** the item from the cart.
  - Empty/non-numeric input is parsed as `0` → also removes the item.
  - Negative values are **ignored** (no change) — though the `min="1"` attribute discourages
    them via the UI.
- The red **X** button calls `cart.update(id, 0)` → removes the line.

### 4.4 Checkout (`checkout/+page.svelte` + `+page.ts`)

- **Guard / redirect:** the page `load` reads the cart from the store; if the cart is
  **empty**, it **redirects to the home page** (a client-side SvelteKit redirect — the site is
  static, so there is no HTTP redirect). Because the guard runs **before the cart hydrates from
  `localStorage`**, any direct/address-bar navigation to `/bistro/checkout` redirects home **even
  if the cart has items** — checkout is only reachable via the in-app **Checkout** button.
- **Order summary table:** columns _Image, Title, Count, Total Price_, one row per cart item,
  plus a **Total** row. The total cell carries `data-testid="cartTotal"`.
- **Form fields:**
  - **Name** — text input, `required`.
  - **Address** — text input, `required`.
  - **Payment Method** — `<select>` with two options: **"Cash on Delivery"** and
    **"Card Payment on Delivery"**. **No option is preselected** — the bound value starts empty,
    so the select renders **blank** until the user picks one. Selecting is not enforced: an order
    can be placed with it untouched, and the confirmation then reads "Payment method:" with
    nothing after it.
  - **Place Order** submit button.
- **On submit:** `preventDefault()` then sets `submitted = true`. The form is **replaced** by
  a green success alert:
  > **Your order placed successfully!**
  > Thank you, **{name}**, for your order. We will deliver your food to the following address
  > as soon as possible: _{address}_. Payment method: **{paymentMethod}**.
  > The alert echoes back the exact name, address, and payment method entered.
- **Important post-order behavior:** the order is **not** sent anywhere and the **cart is NOT
  cleared** after placing an order. The order summary table remains visible above the success
  alert, and the cart still holds the same items (visible if you navigate back).
- HTML5 `required` validation blocks submission if Name or Address is empty.

### 4.5 About (`about/+page.svelte`)

Static marketing page: "Welcome to Bistro Delivery", a featured image, and several paragraphs
explaining that the app is a showcase for **QA Sphere** (links to https://qasphere.com).
States plainly that you cannot actually order food.

### 4.6 Footer (`Footer.svelte`)

- **Live site & this repo:** `Bistro Delivery - QA Sphere demo app` → `github.com/Hypersequent/bistro`.
- **Predecessor repo (`food-delivery-demo`):** "Food Delivery HTML Template by WowThemes.net" (older attribution).

---

## 5. Menu data reference

Source of truth: `src/lib/items.ts`. **18 items total** (6 per category). Prices are whole
dollars; no tax, no delivery fee, no discounts.

### Pizzas (have images)

| ID  | Title          | Price |
| --- | -------------- | ----- |
| p1  | Cheese Pizza   | $15   |
| p2  | Hot Pastrami   | $25   |
| p3  | Classic Pizza  | $20   |
| p4  | Country Pizza  | $17   |
| p5  | Veggie Delight | $18   |
| p6  | BBQ Chicken    | $22   |

### Drinks (no images)

| ID  | Title       | Price |
| --- | ----------- | ----- |
| d1  | Cappuccino  | $4    |
| d2  | Iced Coffee | $5    |
| d3  | Café Latte  | $3    |
| d4  | Espresso    | $4    |
| d5  | Green Tea   | $3    |
| d6  | Lemonade    | $4    |

### Desserts (no images)

| ID  | Title             | Price |
| --- | ----------------- | ----- |
| s1  | Crème Brûlée      | $16   |
| s2  | Tarte Tatin       | $12   |
| s3  | Macarons          | $10   |
| s4  | Chocolate Soufflé | $20   |
| s5  | Cheesecake        | $14   |
| s6  | Apple Pie         | $15   |

---

## 6. Cart & order business rules (consolidated)

- **Add:** first add sets quantity 1; subsequent adds of the same item increment quantity.
- **Line total:** `price × quantity`. **Cart total:** sum of all line totals.
- **Badge count:** sum of all quantities (not number of distinct items).
- **Quantity = 0 / empty / non-numeric:** removes the item.
- **Negative quantity:** ignored.
- **Checkout reachable only via the in-app Checkout button** (non-empty cart); any direct URL
  navigation redirects home — the guard runs before the cart hydrates.
- **Placing an order does not clear the cart** and does not transmit data anywhere.
- Currency is USD shown as `$<integer>`. No rounding/decimals occur because all prices and
  quantities are integers.

---

## 7. State & persistence

- The cart lives in a Svelte `writable` store (`src/lib/cart.ts`) and is persisted to
  **`localStorage` under the key `cart`** as a JSON array of `{ id, quantity }`.
- On load, the store hydrates from `localStorage`; malformed/non-array data resets to `[]`.
- **Persistence implications for testing:**
  - The cart **survives page reloads and navigation**, and persists across browser sessions
    on the same origin until cleared.
  - Tests must **not assume a clean cart** — the live demo may already contain items from a
    previous session. Clear `localStorage` (or remove the `cart` key) at test setup for a
    deterministic starting state.

---

## 8. Test-relevant selectors & hooks

Useful anchors for automated tests (stable IDs/classes/test-ids present in the markup):

| Element                                                                    | Selector                                                         |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Cart total (modal **and** checkout; rendered only when the cart has items) | `[data-testid="cartTotal"]`                                      |
| Cart icon                                                                  | `.my-cart-icon`                                                  |
| Cart count badge                                                           | `.my-cart-badge`                                                 |
| "Add to cart" buttons                                                      | `.my-cart-btn`                                                   |
| Cart modal                                                                 | `#cart`                                                          |
| Active menu tab                                                            | `.button--is-active`                                             |
| Visible menu panel                                                         | `.menu--is-visible`                                              |
| Menu category panels                                                       | `#pizzaMenu`, `#drinksMenu`, `#dessertsMenu`                     |
| Menu tab triggers                                                          | `.button[data-target="pizzaMenu \| drinksMenu \| dessertsMenu"]` |
| Checkout name field                                                        | `#customerName`                                                  |
| Checkout address field                                                     | `#customerAddress`                                               |
| Checkout payment select                                                    | `#paymentMethod`                                                 |
| Mobile nav container                                                       | `#navbarsExampleDefault`                                         |

Role/text-based locators that work well (confirmed via the live snapshot):

- Tabs: buttons named `Pizzas`, `Drinks`, `Desserts`.
- Item actions: buttons named `Add to cart`.
- Checkout: textboxes `Name` / `Address`, combobox `Payment Method`, button `Place Order`.
- Success: alert/heading `Your order placed successfully!`.

---

## 9. Known quirks & edge cases (worth covering in tests)

1. **Cart persists across sessions** — primary source of test flakiness if not reset.
2. **Quantity input edge cases** — `0`, empty, and non-numeric all remove the item; negatives
   are ignored despite `min="1"`.
3. **Any direct navigation to `/bistro/checkout` redirects to home** — even with items in the
   cart, because the guard runs before the cart hydrates from `localStorage`. Checkout is only
   reachable via the in-app Checkout button.
4. **Cart is not cleared after placing an order** — the user can re-open the cart and still
   see the items; re-submitting is possible.
5. **No images for drinks/desserts** — cards render without a thumbnail (by design).
6. **Footer text and animations differ** between the live demo and the predecessor repo (see §1) —
   the live site has **no AOS** and no observable navigation transition or cart-icon animation.
7. **Success message grammar** — the heading reads "Your order placed successfully!"
   (verbatim — assert on exact text).
8. **No real validation** beyond HTML5 `required` on Name/Address. Address/name accept any
   string; payment method only ever has the two listed options.
9. **Payment method has no default** — the select renders blank (no option preselected) and is
   not required; placing an order without choosing yields "Payment method:" with an empty value.
10. **Menu tab selection is not persisted** — a reload or navigating away and back always resets
    the menu to the Pizzas tab (the cart, by contrast, persists).

---

## 10. Suggested coverage split (for `docs/MANUAL.md` vs `docs/AUTOMATED.md`)

This is guidance, not a final plan — the dedicated plan files will detail cases.

- **Good for automated tests:** add-to-cart and badge count, line/total calculation,
  quantity-update and removal rules, empty-cart checkout redirect, full happy-path checkout
  with success-message assertions, menu tab switching, localStorage persistence across reload.
- **Better as manual tests:** visual rendering (hero banner, image rendering and layout polish),
  menu tab-selection reset behavior, payment-select blank initial state, responsive/mobile navbar
  toggling, cross-browser look, copy/wording review on About and success messages. (Do **not**
  plan animation cases — the live site has no observable animations; see §2 and §9.)
