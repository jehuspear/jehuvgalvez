export function Skeleton({ className = "" }: { className?: string }) {
  return <span className={`skeleton-block ${className}`} aria-hidden="true" />;
}

export function MediaSkeleton({ label, variant = "interface", loading = true }: { label: string; variant?: "portrait" | "interface"; loading?: boolean }) {
  return (
    <div className={`media-skeleton media-skeleton-${variant}`} data-loading={loading} aria-hidden="true">
      {variant === "portrait" ? (
        <div className="skeleton-portrait"><Skeleton className="skeleton-head" /><Skeleton className="skeleton-shoulders" /></div>
      ) : (
        <div className="skeleton-interface">
          <div className="skeleton-toolbar"><Skeleton /><Skeleton /><Skeleton /></div>
          <div className="skeleton-interface-body">
            <Skeleton className="skeleton-sidebar" />
            <div className="skeleton-interface-content"><Skeleton className="skeleton-line-short" /><Skeleton /><Skeleton /><Skeleton className="skeleton-panel" /></div>
          </div>
        </div>
      )}
      <span className="skeleton-label">{label}</span>
    </div>
  );
}
