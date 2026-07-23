/**
 * Client testimonial.
 */
export interface Testimonial {
  /** Client's full name */
  name: string;
  /** Client's role or business */
  role: string;
  /** Company or website name */
  company?: string;
  /** The testimonial quote (plain text, no markdown) */
  quote: string;
  /** Optional avatar image path */
  avatar?: string;
  /** Star rating out of 5 */
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO date string — when the review was given */
  date?: string;
}
