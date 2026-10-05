# White House Cafe portfolio screenshots

Captured from the locally running application on 6 October 2026. Originals are browser JPEG screenshots without redrawing or changing application records. Customer screens use the requested mobile layout; staff screens use the desktop layout.

## Recommended homepage selection

1. `customer-menu-mobile.jpg` — primary customer visual. Caption: "Browse the cafe menu by category, with product photos, prices, and best-seller labels." Alt: "White House Cafe mobile customer menu with photographed drinks, category navigation, and a checkout control."
2. `drink-customization-mobile.jpg` — customer interaction centerpiece. Caption: "Choose drink size, temperature, quantity, and dine-in or takeaway before ordering." Alt: "Latte Espanyol product dialog with 16-ounce iced and takeaway selected, quantity controls, and the updated price."
3. `staff-pos-desktop.jpg` — staff counterpart. Caption: "A staff POS workspace combines product selection with cart, discount, and payment controls." Alt: "White House Cafe staff POS screen with menu items and variants alongside an empty cart and checkout controls."

## Supporting references

- `completed-orders-desktop.jpg`: completed tickets filtered to 4 February 2025; shows item variants, eating option, payment method, and totals. Historical test records and elapsed times are not performance or business-impact metrics.
- `order-status-board-empty-mobile.jpg`: actual empty state with Preparing and Please Claim columns. Keep as reference; it does not demonstrate a populated live queue. No tickets were fabricated or orders created to populate it.

## Observed application features and sources

- Customer menu: `/kiosk-mariano/customer/menu.php`.
- Customization: Latte Espanyol dialog; 16oz iced / Take Out selected for preview, then dismissed. The item was not added to the cart.
- Staff POS: `/kiosk-mariano/admin-staff/point-of-sale.php`, empty cart; no payment or order was processed.
- Completed orders: `/kiosk-mariano/admin-staff/completed-orders.php`, historical date filter only.
- Board: `/kiosk-mariano/customer/order-status-board.php`.
- Customer and staff interfaces are separate; only the staff area required the supplied test-account login. The staff session was logged out after capture.
- Pending orders and the current status board were empty. Default current-date reporting was sparse; populated historical completed tickets were used for the supporting capture.
- Local source context: `F:/xampp/htdocs/kiosk-mariano`. Database date inspection was limited to identifying populated historical dates; the SQL dump and credentials are not copied here.

These are prepared portfolio assets only. The White House Cafe portfolio component and deployment have not been changed during this capture task. Observed features describe the application; they do not establish sole authorship of every module.

## User-supplied populated workflow screenshots

Added 6 October 2026 from Jehu's test run. Customer names are sample names, as confirmed by Jehu. These PNG files preserve the supplied originals. They supersede the empty-board reference for the portfolio narrative; earlier captures remain retained.

Recommended chapter story: customer menu/customization -> order list -> e-ticket -> staff preparation -> populated status board. Limit homepage media to the strongest beats; retain other screens for a possible future detailed case study.

| File | Caption / visible feature | Useful alt text |
| --- | --- | --- |
| customer-order-list-mobile.png | Review selected items, quantities, eating options, and the order total. | Mobile order list showing Latte Espanyol, Matcha Latte, and Bacsilog with a three-item total of 349 pesos. |
| customer-e-ticket-mobile.png | Receive a numbered e-ticket for processing at the counter. | White House Cafe order e-ticket 001 with links to order details and the status board. |
| staff-pending-orders-desktop.png | Staff review pending tickets and their items before preparation. | Staff pending-order table with tickets 001 and 002, item variants, payment methods, totals, and confirm-payment controls. |
| sample-receipt.png | An itemized receipt records the test transaction. | Receipt for test customer Juan and ticket 001 listing three items, a 349-peso total, cash paid, and change. |
| staff-preparing-order-desktop.png | A preparation card groups a ticket's customer, items, and eating option. | Staff preparation screen with ticket 001, sample customer Juan, takeaway items, and a Preparing status. |
| customer-ready-to-claim-mobile.png | Customers can inspect their ticket and see when it is ready to claim. | Mobile ticket 001 details with Ready to Claim status, itemized amounts, and an order-received confirmation control. |
| order-status-board-populated-desktop.png | A shared board distinguishes tickets being prepared from those ready for collection. | White House Cafe status board showing ticket 002 under Preparing and ticket 001 under Please Claim. |

These are screenshots of separate moments in the test workflow, not claims about processing speed, adoption, or business results. The narrow receipt is best kept as a supporting detail. The staff preparation screenshot contains substantial empty space; use the original full-size link or an explicitly labeled detail crop when integrated, without altering the UI or its data.


## Portfolio integration

The local Café chapter now uses menu/customization, cart/e-ticket, and preparation/populated-board pairs. Ready-to-claim, receipt, pending orders, and staff POS are available in its native expandable gallery. Public copies are under `public/projects/white-house-cafe/`; originals remain here. Images load lazily through Next.js Image and open full size in a new tab. No application data or deployment was changed by this integration.
