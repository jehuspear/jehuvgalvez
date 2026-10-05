// Captured from the running iBaryo demo; source notes: resources/ibaryo-portfolio/README.md.
// Visible quantities describe historical demo records, not project impact metrics.
export const ibaryoMedia = [
  {
    id: "inventory-summary", title: "Know what is available.", label: "01 / Inventory visibility",
    caption: "A central view of barangay inventory, stock availability, low-stock alerts, and borrowed assets.",
    alt: "iBaryo inventory report with stock summary cards, category and status filters, and item quantities and locations.",
  },
  {
    id: "inventory-movement-ledger", title: "Trace every stock movement.", label: "02 / Movement ledger",
    caption: "Dated entries connect quantity changes with previous and new balances, processing staff, and remarks.",
    alt: "iBaryo movement ledger filtered to May 2026, showing stock adjustments, balances, and responsible staff.",
  },
  {
    id: "resource-tracking-completed", title: "Follow resources through completion.", label: "03 / Resource workflow",
    caption: "Track assigned resources through awaiting action, in progress, pending validation, and completion.",
    alt: "A completed iBaryo borrowing request with requester, assigned staff, approver, approval date, and a four-stage completion tracker.",
  },
] as const;
