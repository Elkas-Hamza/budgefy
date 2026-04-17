
import type { PropType } from 'vue';
export type ValueFormat = string | ((ctx: {
    value: number;
    max: number;
    percent: number;
}) => string);
type VProgressSlotsProps = {
    max: number;
    percent: number;
    value: number;
    formattedValue: string;
};
export declare const makeVProgressProps: <Defaults extends {
    theme?: unknown;
    class?: unknown;
    style?: unknown;
    bgColor?: unknown;
    color?: unknown;
    modelValue?: unknown;
    type?: unknown;
    label?: unknown;
    detailsPosition?: unknown;
    valueFormat?: unknown;
    max?: unknown;
    absolute?: unknown;
    hideLabel?: unknown;
    hideValue?: unknown;
    indeterminate?: unknown;
    rounded?: unknown;
} = {}>(defaults?: Defaults | undefined) => {
    theme: unknown extends Defaults["theme"] ? StringConstructor : {
        type: PropType<unknown extends Defaults["theme"] ? string : string | Defaults["theme"]>;
        default: unknown extends Defaults["theme"] ? string : string | Defaults["theme"];
    };
    class: unknown extends Defaults["class"] ? PropType<any> : {
        type: PropType<unknown extends Defaults["class"] ? any : any>;
        default: unknown extends Defaults["class"] ? any : any;
    };
    style: unknown extends Defaults["style"] ? {
        type: PropType<import("vue").StyleValue>;
        default: null;
    } : Omit<{
        type: PropType<import("vue").StyleValue>;
        default: null;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["style"] ? import("vue").StyleValue : Defaults["style"] | import("vue").StyleValue>;
        default: unknown extends Defaults["style"] ? import("vue").StyleValue : Defaults["style"] | NonNullable<import("vue").StyleValue>;
    };
    bgColor: unknown extends Defaults["bgColor"] ? StringConstructor : {
        type: PropType<unknown extends Defaults["bgColor"] ? string : string | Defaults["bgColor"]>;
        default: unknown extends Defaults["bgColor"] ? string : string | Defaults["bgColor"];
    };
    color: unknown extends Defaults["color"] ? StringConstructor : {
        type: PropType<unknown extends Defaults["color"] ? string : string | Defaults["color"]>;
        default: unknown extends Defaults["color"] ? string : string | Defaults["color"];
    };
    modelValue: unknown extends Defaults["modelValue"] ? {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    } : Omit<{
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["modelValue"] ? string | number : string | number | Defaults["modelValue"]>;
        default: unknown extends Defaults["modelValue"] ? string | number : Defaults["modelValue"] | NonNullable<string | number>;
    };
    type: unknown extends Defaults["type"] ? {
        type: PropType<'linear' | 'circular'>;
        default: string;
    } : Omit<{
        type: PropType<'linear' | 'circular'>;
        default: string;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["type"] ? "circular" | "linear" : "circular" | "linear" | Defaults["type"]>;
        default: unknown extends Defaults["type"] ? "circular" | "linear" : Defaults["type"] | NonNullable<"circular" | "linear">;
    };
    label: unknown extends Defaults["label"] ? StringConstructor : {
        type: PropType<unknown extends Defaults["label"] ? string : string | Defaults["label"]>;
        default: unknown extends Defaults["label"] ? string : string | Defaults["label"];
    };
    detailsPosition: unknown extends Defaults["detailsPosition"] ? {
        type: PropType<'top' | 'bottom'>;
        default: string;
    } : Omit<{
        type: PropType<'top' | 'bottom'>;
        default: string;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["detailsPosition"] ? "bottom" | "top" : "bottom" | "top" | Defaults["detailsPosition"]>;
        default: unknown extends Defaults["detailsPosition"] ? "bottom" | "top" : Defaults["detailsPosition"] | NonNullable<"bottom" | "top">;
    };
    valueFormat: unknown extends Defaults["valueFormat"] ? {
        type: PropType<ValueFormat>;
        default: string;
    } : Omit<{
        type: PropType<ValueFormat>;
        default: string;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["valueFormat"] ? ValueFormat : Defaults["valueFormat"] | ValueFormat>;
        default: unknown extends Defaults["valueFormat"] ? ValueFormat : Defaults["valueFormat"] | NonNullable<ValueFormat>;
    };
    max: unknown extends Defaults["max"] ? {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    } : Omit<{
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["max"] ? string | number : string | number | Defaults["max"]>;
        default: unknown extends Defaults["max"] ? string | number : Defaults["max"] | NonNullable<string | number>;
    };
    absolute: unknown extends Defaults["absolute"] ? BooleanConstructor : {
        type: PropType<unknown extends Defaults["absolute"] ? boolean : boolean | Defaults["absolute"]>;
        default: unknown extends Defaults["absolute"] ? boolean : boolean | Defaults["absolute"];
    };
    hideLabel: unknown extends Defaults["hideLabel"] ? BooleanConstructor : {
        type: PropType<unknown extends Defaults["hideLabel"] ? boolean : boolean | Defaults["hideLabel"]>;
        default: unknown extends Defaults["hideLabel"] ? boolean : boolean | Defaults["hideLabel"];
    };
    hideValue: unknown extends Defaults["hideValue"] ? BooleanConstructor : {
        type: PropType<unknown extends Defaults["hideValue"] ? boolean : boolean | Defaults["hideValue"]>;
        default: unknown extends Defaults["hideValue"] ? boolean : boolean | Defaults["hideValue"];
    };
    indeterminate: unknown extends Defaults["indeterminate"] ? BooleanConstructor : {
        type: PropType<unknown extends Defaults["indeterminate"] ? boolean : boolean | Defaults["indeterminate"]>;
        default: unknown extends Defaults["indeterminate"] ? boolean : boolean | Defaults["indeterminate"];
    };
    rounded: unknown extends Defaults["rounded"] ? BooleanConstructor : {
        type: PropType<unknown extends Defaults["rounded"] ? boolean : boolean | Defaults["rounded"]>;
        default: unknown extends Defaults["rounded"] ? boolean : boolean | Defaults["rounded"];
    };
};
export declare const VProgress: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<{
        style: string | false | import("vue").StyleValue[] | import("vue").CSSProperties | null;
        modelValue: string | number;
        type: "circular" | "linear";
        detailsPosition: "bottom" | "top";
        valueFormat: ValueFormat;
        max: string | number;
        absolute: boolean;
        hideLabel: boolean;
        hideValue: boolean;
        indeterminate: boolean;
        rounded: boolean;
    } & {
        theme?: string | undefined;
        class?: any;
        bgColor?: string | undefined;
        color?: string | undefined;
        label?: string | undefined;
    } & {
        $children?: {
            default?: ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
            label?: ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
            value?: ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
        } | {
            $stable?: boolean;
        } | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | import("vue").VNodeChild;
        'v-slots'?: {
            default?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
            label?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
            value?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
        "v-slot:label"?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
        "v-slot:value"?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, {
        style: import("vue").StyleValue;
        modelValue: string | number;
        type: "circular" | "linear";
        detailsPosition: "bottom" | "top";
        valueFormat: ValueFormat;
        max: string | number;
        absolute: boolean;
        hideLabel: boolean;
        hideValue: boolean;
        indeterminate: boolean;
        rounded: boolean;
    }, true, {}, import("vue").SlotsType<Partial<{
        default: (arg: VProgressSlotsProps) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>[];
        label: (arg: VProgressSlotsProps) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>[];
        value: (arg: VProgressSlotsProps) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>[];
    }>>, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, {
        style: string | false | import("vue").StyleValue[] | import("vue").CSSProperties | null;
        modelValue: string | number;
        type: "circular" | "linear";
        detailsPosition: "bottom" | "top";
        valueFormat: ValueFormat;
        max: string | number;
        absolute: boolean;
        hideLabel: boolean;
        hideValue: boolean;
        indeterminate: boolean;
        rounded: boolean;
    } & {
        theme?: string | undefined;
        class?: any;
        bgColor?: string | undefined;
        color?: string | undefined;
        label?: string | undefined;
    } & {
        $children?: {
            default?: ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
            label?: ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
            value?: ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
        } | {
            $stable?: boolean;
        } | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | import("vue").VNodeChild;
        'v-slots'?: {
            default?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
            label?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
            value?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
        "v-slot:label"?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
        "v-slot:value"?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
    }, {}, {}, {}, {}, {
        style: import("vue").StyleValue;
        modelValue: string | number;
        type: "circular" | "linear";
        detailsPosition: "bottom" | "top";
        valueFormat: ValueFormat;
        max: string | number;
        absolute: boolean;
        hideLabel: boolean;
        hideValue: boolean;
        indeterminate: boolean;
        rounded: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<{
    style: string | false | import("vue").StyleValue[] | import("vue").CSSProperties | null;
    modelValue: string | number;
    type: "circular" | "linear";
    detailsPosition: "bottom" | "top";
    valueFormat: ValueFormat;
    max: string | number;
    absolute: boolean;
    hideLabel: boolean;
    hideValue: boolean;
    indeterminate: boolean;
    rounded: boolean;
} & {
    theme?: string | undefined;
    class?: any;
    bgColor?: string | undefined;
    color?: string | undefined;
    label?: string | undefined;
} & {
    $children?: {
        default?: ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
        label?: ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
        value?: ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
    } | {
        $stable?: boolean;
    } | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | import("vue").VNodeChild;
    'v-slots'?: {
        default?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
        label?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
        value?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
    "v-slot:label"?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
    "v-slot:value"?: false | ((arg: VProgressSlotsProps) => import("vue").VNodeChild) | undefined;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
    style: import("vue").StyleValue;
    modelValue: string | number;
    type: "circular" | "linear";
    detailsPosition: "bottom" | "top";
    valueFormat: ValueFormat;
    max: string | number;
    absolute: boolean;
    hideLabel: boolean;
    hideValue: boolean;
    indeterminate: boolean;
    rounded: boolean;
}, {}, string, import("vue").SlotsType<Partial<{
    default: (arg: VProgressSlotsProps) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
    label: (arg: VProgressSlotsProps) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
    value: (arg: VProgressSlotsProps) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
}>>, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & import("../../util/index.js").FilterPropsOptions<{
    theme: StringConstructor;
    class: PropType<import("../../composables/component.js").ClassValue>;
    style: {
        type: PropType<import("vue").StyleValue>;
        default: null;
    };
    bgColor: StringConstructor;
    color: StringConstructor;
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    type: {
        type: PropType<'linear' | 'circular'>;
        default: string;
    };
    label: StringConstructor;
    detailsPosition: {
        type: PropType<'top' | 'bottom'>;
        default: string;
    };
    valueFormat: {
        type: PropType<ValueFormat>;
        default: string;
    };
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    absolute: BooleanConstructor;
    hideLabel: BooleanConstructor;
    hideValue: BooleanConstructor;
    indeterminate: BooleanConstructor;
    rounded: BooleanConstructor;
}, import("vue").ExtractPropTypes<{
    theme: StringConstructor;
    class: PropType<import("../../composables/component.js").ClassValue>;
    style: {
        type: PropType<import("vue").StyleValue>;
        default: null;
    };
    bgColor: StringConstructor;
    color: StringConstructor;
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    type: {
        type: PropType<'linear' | 'circular'>;
        default: string;
    };
    label: StringConstructor;
    detailsPosition: {
        type: PropType<'top' | 'bottom'>;
        default: string;
    };
    valueFormat: {
        type: PropType<ValueFormat>;
        default: string;
    };
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    absolute: BooleanConstructor;
    hideLabel: BooleanConstructor;
    hideValue: BooleanConstructor;
    indeterminate: BooleanConstructor;
    rounded: BooleanConstructor;
}>>;
export type VProgress = InstanceType<typeof VProgress>;

