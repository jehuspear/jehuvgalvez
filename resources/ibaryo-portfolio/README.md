# iBaryo portfolio screenshots

Captured from the local running application on 6 October 2026, using the supplied demo accounts. Original browser JPEG captures, without UI or record alterations. Data is historical; visible counts are demo records, not impact metrics.

## Recommended selection

1. `inventory-summary.jpg` — lead image. Caption: "A central view of barangay inventory, stock availability, low-stock alerts, and borrowed assets." Alt: "iBaryo inventory report with stock summary cards, category and status filters, and item quantities and locations."
2. `inventory-movement-ledger.jpg` — audit trail. Caption: "Trace stock movements through dated entries, quantity changes, balances, and processing remarks." Alt: "iBaryo inventory movement ledger filtered to May 2026, showing previous stock, quantity changes, new balances, and responsible staff."
3. `resource-tracking-completed.jpg` — workflow. Caption: "Follow assigned resources from awaiting action through delivery, validation, and completion." Alt: "A completed iBaryo borrowing request showing the requester, assigned staff, approver, approval date, and four-stage completion tracker."

## Capture context

- Inventory summary: `/ibaryo/inventory-reports.php`, Full Inventory tab, default filters.
- Ledger: same page, Movement Log tab, 1–31 May 2026 filter.
- Workflow: `/ibaryo/resource-tracking.php`, Completed tab, search `2026-03-41`; resident details remained collapsed.
- Both administrator and public-servant demo roles were reviewed. No inventory, request, task, or user records were deliberately changed; normal login/logout and automatic application housekeeping may update logs.
- The supplied extensionless `/ibaryo/home` URL returned 404; `/ibaryo/home.php` works.
- Database structure corroborates inventory, inventory_movements, inventory_pending_requests, requests, request_items, resource_transactions, tasks, and task_days. A schema alone does not prove each workflow works end-to-end.
- Dashboard charts default to current periods, which are sparse with historical data. Prefer these populated operational screens over a dashboard hero image.
- Original captures are retained here; copies in public/projects/ibaryo now support the iBaryo portfolio chapter. This local integration has not been deployed. Review before publication; the SQL dump and account credentials are not included.
