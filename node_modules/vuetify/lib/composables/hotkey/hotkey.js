// Composables
import { parseKeyCombination } from "./hotkey-parsing.js"; // Utilities
import { onScopeDispose, toValue, watch } from 'vue';
import { IN_BROWSER } from "../../util/index.js"; // Types
const MODIFIERS = ['ctrl', 'shift', 'alt', 'meta', 'cmd'];
const modifiersSet = new Set(MODIFIERS);
function isModifier(key) {
  return modifiersSet.has(key);
}
const emptyModifiers = Object.fromEntries(MODIFIERS.map(m => [m, false]));
export function useHotkey(keys, callback, options = {}) {
  if (!IN_BROWSER) return function () {};
  const {
    event = 'keydown',
    inputs = false,
    preventDefault = true,
    sequenceTimeout = 1000
  } = options;
  const isMac = navigator?.userAgent?.includes('Macintosh') ?? false;
  let timeout = 0;
  let keyGroups;
  let isSequence = false;
  let groupIndex = 0;
  function isInputFocused() {
    if (toValue(inputs)) return false;
    const activeElement = document.activeElement;
    return activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable || activeElement.contentEditable === 'true');
  }
  function resetSequence() {
    groupIndex = 0;
    clearTimeout(timeout);
  }
  function handler(e) {
    const group = keyGroups[groupIndex];
    if (!group || isInputFocused()) return;
    if (!matchesKeyGroup(e, group, isMac)) {
      if (isSequence) resetSequence();
      return;
    }
    if (toValue(preventDefault)) e.preventDefault();
    if (!isSequence) {
      callback(e);
      return;
    }
    clearTimeout(timeout);
    groupIndex++;
    if (groupIndex === keyGroups.length) {
      callback(e);
      resetSequence();
      return;
    }
    timeout = window.setTimeout(resetSequence, toValue(sequenceTimeout));
  }
  function cleanup() {
    window.removeEventListener(toValue(event), handler);
    clearTimeout(timeout);
  }
  watch(() => toValue(keys), newKeys => {
    cleanup();
    if (newKeys) {
      const parsed = parseKeyCombination(newKeys.toLowerCase());
      if (parsed) {
        const parts = typeof parsed !== 'string' && parsed.type === 'sequence' ? parsed.parts : [parsed];
        isSequence = parts.length > 1;
        keyGroups = parts;
        resetSequence();
        window.addEventListener(toValue(event), handler);
      }
    }
  }, {
    immediate: true
  });

  // Watch for changes in the event type to re-register the listener
  watch(() => toValue(event), (newEvent, oldEvent) => {
    if (oldEvent && keyGroups && keyGroups.length > 0) {
      window.removeEventListener(oldEvent, handler);
      window.addEventListener(newEvent, handler);
    }
  });
  onScopeDispose(cleanup, true);
  return cleanup;
}
function matchesKeyGroup(e, group, isMac) {
  if (typeof group !== 'string' && group.type === 'alternate') {
    return group.parts.some(part => matchesKeyGroup(e, part, isMac));
  }
  const {
    modifiers,
    actualKey
  } = parseKeyGroup(group);
  const expectCtrl = modifiers.ctrl || !isMac && (modifiers.cmd || modifiers.meta);
  const expectMeta = isMac && (modifiers.cmd || modifiers.meta);
  return e.ctrlKey === expectCtrl && e.metaKey === expectMeta && e.shiftKey === modifiers.shift && e.altKey === modifiers.alt && e.key.toLowerCase() === actualKey?.toLowerCase();
}
function parseKeyGroup(group) {
  const parts = typeof group === 'string' ? [group] : group.parts;
  const modifiers = {
    ...emptyModifiers
  };
  let actualKey;
  for (const part of parts) {
    if (isModifier(part)) {
      modifiers[part] = true;
    } else {
      // TODO: handle multiple keys
      actualKey = part;
    }
  }
  return {
    modifiers,
    actualKey
  };
}
//# sourceMappingURL=hotkey.js.map