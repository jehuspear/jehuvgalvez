"use client";

import { Award, BriefcaseBusiness, FolderOpen, House, Mail, Network, UserRound } from "lucide-react";
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

export function SiteHeader() {
  const { headerRef, active, mobileMinimized } = usePortfolioNavigation();

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
                <li key={item.id}>
                  <a href={item.href} className="nav-link" data-item={item.id} aria-label={item.accessibleLabel} aria-current={active === item.id ? "location" : undefined}>
                    <span className="nav-label" aria-hidden="true">{item.label}</span>
                    <Icon className="nav-icon" size={20} aria-hidden="true" />
                    <span className="nav-tooltip" aria-hidden="true">{item.accessibleLabel}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="nav-progress" aria-hidden="true"><span /></div>
        </nav>
      </header>
    </>
  );
}
