/**
 * Navigation item used in the site header and footer.
 */
export interface NavItem {
  label: string;
  href: string;
  /** Whether the link opens in a new tab (external links) */
  external?: boolean;
}

/**
 * Navigation group used for grouped footer links.
 */
export interface NavGroup {
  heading: string;
  items: NavItem[];
}
