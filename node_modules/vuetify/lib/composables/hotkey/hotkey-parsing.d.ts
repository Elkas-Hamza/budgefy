export type KeyCombination = Sequence | Alternate | Combo | Key;
export interface Sequence {
    type: 'sequence';
    parts: (Alternate | Combo | Key)[];
}
export interface Alternate {
    type: 'alternate';
    parts: (Combo | Key)[];
}
export interface Combo {
    type: 'combo';
    parts: Key[];
}
export type Key = string;
/**
 * Splits a single combination string into individual key parts.
 * Grammar:
 *
 * sequence   = alternate *('-' alternate)
 * alternate  = combo *('/' combo)
 * combo      = key *(('+' | '_') key)
 * key        = /./ *(/[^-/+_ ]/)
 *
 */
export declare function parseKeyCombination(input: string): KeyCombination;
