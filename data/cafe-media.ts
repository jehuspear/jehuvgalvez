// Original captures and user-supplied test screenshots: resources/white-house-cafe-portfolio/README.md.
// Describes visible application behavior, not ownership of every module or business results.
export const cafeMedia = {
  menu: {
    file: "customer-menu-mobile.jpg", width: 512, height: 859, portrait: true,
    title: "Browse the menu.", caption: "Product photos, category navigation, prices, and best-seller labels guide selection.",
    alt: "White House Café mobile customer menu showing photographed drinks, categories, prices, and a checkout control.",
  },
  customization: {
    file: "drink-customization-mobile.jpg", width: 527, height: 884, portrait: true,
    title: "Make it your order.", caption: "Choose size, temperature, quantity, and dine-in or takeaway before adding an item.",
    alt: "Latte Espanyol dialog with 16-ounce iced and takeaway selected, quantity controls, and the updated price.",
  },
  cart: {
    file: "customer-order-list-mobile.png", width: 444, height: 882, portrait: true,
    title: "Review before continuing.", caption: "The order list brings selected items, variants, quantities, and the total together.",
    alt: "Mobile order list with Latte Espanyol, Matcha Latte, and Bacsilog, quantity controls, and a three-item total of 349 pesos.",
  },
  ticket: {
    file: "customer-e-ticket-mobile.png", width: 351, height: 691, portrait: true,
    title: "One ticket to follow.", caption: "A numbered e-ticket connects the customer with counter processing, order details, and the status board.",
    alt: "White House Café e-ticket 001 with links to order details and the order status board.",
  },
  preparing: {
    file: "staff-preparing-order-desktop.png", width: 1914, height: 901, portrait: false,
    title: "A clear preparation queue.", caption: "Staff see a ticket’s items, eating option, payment method, and preparation status in one card.",
    alt: "Staff preparation screen showing ticket 001, sample customer Juan, three takeaway items, and Preparing status.",
  },
  board: {
    file: "order-status-board-populated-desktop.png", width: 1314, height: 878, portrait: false,
    title: "Know when to collect.", caption: "The shared board separates tickets being prepared from orders ready to claim.",
    alt: "White House Café order status board with ticket 002 under Preparing and ticket 001 under Please Claim.",
  },
  ready: {
    file: "customer-ready-to-claim-mobile.png", width: 503, height: 882, portrait: true,
    title: "Order details, ready to claim.", caption: "Customers can check itemized amounts, ticket status, and the order-received confirmation control.",
    alt: "Mobile ticket 001 details with Ready to Claim status, itemized amounts, cash paid, change, and a confirmation control.",
  },
  receipt: {
    file: "sample-receipt.png", width: 175, height: 642, portrait: true,
    title: "An itemized receipt.", caption: "The test receipt records ordered items, total, cash paid, and change.",
    alt: "Receipt for sample customer Juan and ticket 001 listing three items, a 349-peso total, cash paid, and change.",
  },
  pending: {
    file: "staff-pending-orders-desktop.png", width: 1919, height: 888, portrait: false,
    title: "Review pending tickets.", caption: "The staff queue groups ticket numbers, item variants, payment methods, totals, and review controls.",
    alt: "Pending-order table with test tickets 001 and 002, item variants, payment methods, totals, and confirm-payment controls.",
  },
  pos: {
    file: "staff-pos-desktop.jpg", width: 1528, height: 875, portrait: false,
    title: "A workspace for staff orders.", caption: "The POS interface places product variants beside cart, discount, and payment controls.",
    alt: "White House Café staff POS with product variants alongside an empty cart, discounts, and payment controls.",
  },
} as const;
