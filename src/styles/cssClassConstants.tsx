export const CSS_CONSTANTS = {
  ANIMATING_ELEMENT: "animating-element",
  HOVERABLE: "hoverable",
  ON_STATE: "on-state",
  PRE_ON_STATE: "pre-on-state",
  SCREEN: "screen"
};

export type Theme = 
  "th-bl"
  | "th-lo";

export const THEME_CONSTANTS = {
  BLUE: "th-bl" as Theme,
  LIGHT_ORANGE: "th-lo" as Theme,
};

export const ELEMENT_TYPES = {
  BACKGROUND: "bg",
  HOVERED_ICON: "hi",
  HOVERED_TEXT: "ht",
  HIGHLIGHTED_TEXT: "hlt",
  HIGHLIGHTED_ICON: "hli",
  ICON: "ic",
  POINTER_ELEMENT: "pe",
  TEXT: "tx",
  TRANSITIONING_ELEMENT: "te",
}