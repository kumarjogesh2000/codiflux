/**
 * Service offering — represents a single service CodiFlux provides.
 */
export interface Service {
  /** Unique machine-readable identifier */
  id: string;
  /** Display title */
  title: string;
  /** Short description for cards and meta */
  description: string;
  /** Icon name or SVG identifier */
  icon: string;
  /** The platforms or tech this service covers */
  platforms?: string[];
  /** Whether to feature this service prominently */
  featured?: boolean;
}
