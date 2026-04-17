import type { Component, FunctionalComponent, Prop, TransitionProps } from 'vue';
export declare const makeTransitionProps: <Defaults extends {
    transition?: unknown;
} = {}>(defaults?: Defaults | undefined) => {
    transition: unknown extends Defaults["transition"] ? Prop<string | boolean | (TransitionProps & {
        component?: Component;
    }) | null> : {
        type: import("vue").PropType<unknown extends Defaults["transition"] ? string | boolean | (TransitionProps & {
            component?: Component;
        }) | null : string | boolean | Defaults["transition"] | (TransitionProps & {
            component?: Component;
        }) | null>;
        default: unknown extends Defaults["transition"] ? string | boolean | (TransitionProps & {
            component?: Component;
        }) | null : Defaults["transition"] | NonNullable<string | boolean | (TransitionProps & {
            component?: Component;
        }) | null>;
    };
};
interface MaybeTransitionProps extends TransitionProps {
    transition?: null | string | boolean | (TransitionProps & {
        component?: any;
    });
    disabled?: boolean;
    group?: boolean;
}
export declare const MaybeTransition: FunctionalComponent<MaybeTransitionProps>;

