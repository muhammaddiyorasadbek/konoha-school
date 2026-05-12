import { PRESENTATION_URL } from "../config";

/**
 * "Batafsil ma'lumot" tugmasini bosganda Canva taqdimotini
 * darhol yangi tabda ochadi.
 */
export function openPresentation() {
  window.open(PRESENTATION_URL, "_blank", "noopener,noreferrer");
}
