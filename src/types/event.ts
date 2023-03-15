export type CustomInputEvent = Event & {
  currentTarget: HTMLInputElement | HTMLTextAreaElement;
  target: Element;
};
