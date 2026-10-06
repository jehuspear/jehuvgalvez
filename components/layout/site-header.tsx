"use client";

import { useEffect, useRef } from "react";
import { Award, BriefcaseBusiness, Ellipsis, FolderOpen, House, Mail, Network, UserRound } from "lucide-react";
import { navigation } from "@/data/navigation";
import { usePortfolioNavigation } from "@/hooks/use-portfolio-navigation";

const icons = {
  "selected-work": FolderOpen,
  experience: BriefcaseBusiness,
  capabilities: Network,
  about: UserRound,
  recognition: Award,
  contact: Mail,
};
const secondaryNavigation = navigation.filter(item => item.mobileSecondary);

export function SiteHeader() {
  const { headerRef, active, mobileMinimized } = usePortfolioNavigation();
  const moreRef = useRef<HTMLDetailsElement>(null);
  const moreTriggerRef = useRef<HTMLElement>(null);
  const moreActive = secondaryNavigation.some(item => item.id === active);

  useEffect(() => {
    const more = moreRef.current;
    if (!more) return;
    function closeOutside(event: PointerEvent) {
      if (!more!.contains(event.target as Node)) more!.open = false;
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <>
      <div className="site-header-space" aria-hidden="true" />
      <header ref={headerRef} className="portfolio-header" data-mobile-minimized={mobileMinimized}>
        <nav id="portfolio-navigation" aria-label="Main navigation" className="portfolio-nav">
          <a href="#hero" className="nav-home nav-link" aria-label="Home, Jehu Galvez" aria-current={active === "hero" ? "location" : undefined}>
            <span className="nav-identity" aria-hidden="true">JG<span>.</span><span className="nav-name">Jehu Galvez</span></span>
            <House className="nav-icon" size={20} aria-hidden="true" />
            <span className="nav-tooltip" aria-hidden="true">Home</span>
          </a>
          <ul className="nav-items">
            {navigation.map(item => {
              const Icon = icons[item.id];
              return (
                <li key={item.id} className={item.mobileSecondary ? "nav-secondary-item" : undefined}>
                  <a href={item.href} className="nav-link" data-item={item.id} aria-label={item.accessibleLabel} aria-current={active === item.id ? "location" : undefined}>
                    <span className="nav-label" aria-hidden="true">{item.label}</span>
                    <Icon className="nav-icon" size={20} aria-hidden="true" />
                    <span className="nav-tooltip" aria-hidden="true">{item.accessibleLabel}</span>
                  </a>
                </li>
              );
            })}
            <li className="nav-more-item">
              <details
                ref={moreRef}
                className="nav-more"
                onBlur={event => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) event.currentTarget.open = false;
                }}
                onKeyDown={event => {
                  if (event.key === "Escape" && event.currentTarget.open) {
                    event.preventDefault();
                    event.currentTarget.open = false;
                    moreTriggerRef.current?.focus();
                  }
                }}
              >
                <summary ref={moreTriggerRef} className="nav-link" data-current={moreActive || undefined} aria-label="More sections" aria-controls="nav-more-sections">
                  <Ellipsis className="nav-icon" size={20} aria-hidden="true" />
                  <span className="nav-tooltip" aria-hidden="true">More sections</span>
                </summary>
                <ul id="nav-more-sections" className="nav-more-sections" aria-label="Additional sections">
                  {secondaryNavigation.map(item => {
                    const Icon = icons[item.id];
                    return (
                      <li key={item.id}>
                        <a href={item.href} aria-current={active === item.id ? "location" : undefined} onClick={() => { if (moreRef.current) moreRef.current.open = false; }}>
                          <Icon size={18} aria-hidden="true" /><span>{item.accessibleLabel}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          </ul>
          <div className="nav-progress" aria-hidden="true"><span /></div>
        </nav>
      </header>
    </>
  );
}
