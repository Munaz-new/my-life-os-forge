import type { CoreEvent, CoreEventInput } from "./types";

const MAX_EVENTS = 120;

type Listener = (event: CoreEvent) => void;
type StoreListener = () => void;

let events: CoreEvent[] = [];
const listeners = new Set<Listener>();
const storeListeners = new Set<StoreListener>();
let counter = 0;

function nextId() {
  counter += 1;
  return `evt_${counter}_${Math.floor(Math.random() * 1e6).toString(36)}`;
}

function notify(event: CoreEvent) {
  listeners.forEach((l) => l(event));
  storeListeners.forEach((l) => l());
}

export const eventBus = {
  emit(input: CoreEventInput): CoreEvent {
    const event = { ...input, id: nextId(), at: input.at ?? Date.now() } as CoreEvent;
    events = [event, ...events].slice(0, MAX_EVENTS);
    notify(event);
    return event;
  },
  /** Seeds history without re-sorting; used once on client init. */
  hydrate(seeded: CoreEvent[]) {
    if (events.length) return;
    events = seeded.slice(0, MAX_EVENTS);
    storeListeners.forEach((l) => l());
  },
  on(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  off(listener: Listener) {
    listeners.delete(listener);
  },
  history(): CoreEvent[] {
    return events;
  },
  subscribe(listener: StoreListener) {
    storeListeners.add(listener);
    return () => {
      storeListeners.delete(listener);
    };
  },
  clear() {
    events = [];
    storeListeners.forEach((l) => l());
  },
};

export const emptyHistory: CoreEvent[] = [];
