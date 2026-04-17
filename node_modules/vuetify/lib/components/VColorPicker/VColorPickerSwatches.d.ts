
import type { DeepReadonly, PropType } from 'vue';
import type { Color, HSV } from '../../util/index.js';
export declare const makeVColorPickerSwatchesProps: <Defaults extends {
    class?: unknown;
    style?: unknown;
    swatches?: unknown;
    disabled?: unknown;
    readonly?: unknown;
    color?: unknown;
    maxHeight?: unknown;
} = {}>(defaults?: Defaults | undefined) => {
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
    swatches: unknown extends Defaults["swatches"] ? {
        type: PropType<DeepReadonly<Color[][]>>;
        default: () => string[][];
    } : Omit<{
        type: PropType<DeepReadonly<Color[][]>>;
        default: () => string[][];
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["swatches"] ? readonly (readonly (string | number | {
            readonly h: number;
            readonly s: number;
            readonly l: number;
            readonly a?: number;
        } | {
            readonly h: number;
            readonly s: number;
            readonly v: number;
            readonly a?: number;
        } | {
            readonly r: number;
            readonly g: number;
            readonly b: number;
            readonly a?: number;
        })[])[] : readonly (readonly (string | number | {
            readonly h: number;
            readonly s: number;
            readonly l: number;
            readonly a?: number;
        } | {
            readonly h: number;
            readonly s: number;
            readonly v: number;
            readonly a?: number;
        } | {
            readonly r: number;
            readonly g: number;
            readonly b: number;
            readonly a?: number;
        })[])[] | Defaults["swatches"]>;
        default: unknown extends Defaults["swatches"] ? readonly (readonly (string | number | {
            readonly h: number;
            readonly s: number;
            readonly l: number;
            readonly a?: number;
        } | {
            readonly h: number;
            readonly s: number;
            readonly v: number;
            readonly a?: number;
        } | {
            readonly r: number;
            readonly g: number;
            readonly b: number;
            readonly a?: number;
        })[])[] : readonly (readonly (string | number | {
            readonly h: number;
            readonly s: number;
            readonly l: number;
            readonly a?: number;
        } | {
            readonly h: number;
            readonly s: number;
            readonly v: number;
            readonly a?: number;
        } | {
            readonly r: number;
            readonly g: number;
            readonly b: number;
            readonly a?: number;
        })[])[] | Defaults["swatches"];
    };
    disabled: unknown extends Defaults["disabled"] ? BooleanConstructor : {
        type: PropType<unknown extends Defaults["disabled"] ? boolean : boolean | Defaults["disabled"]>;
        default: unknown extends Defaults["disabled"] ? boolean : boolean | Defaults["disabled"];
    };
    readonly: unknown extends Defaults["readonly"] ? BooleanConstructor : {
        type: PropType<unknown extends Defaults["readonly"] ? boolean : boolean | Defaults["readonly"]>;
        default: unknown extends Defaults["readonly"] ? boolean : boolean | Defaults["readonly"];
    };
    color: unknown extends Defaults["color"] ? PropType<HSV | null> : {
        type: PropType<unknown extends Defaults["color"] ? HSV | null : HSV | Defaults["color"] | null>;
        default: unknown extends Defaults["color"] ? HSV | null : HSV | Defaults["color"];
    };
    maxHeight: unknown extends Defaults["maxHeight"] ? (NumberConstructor | StringConstructor)[] : {
        type: PropType<unknown extends Defaults["maxHeight"] ? string | number : string | number | Defaults["maxHeight"]>;
        default: unknown extends Defaults["maxHeight"] ? string | number : Defaults["maxHeight"] | NonNullable<string | number>;
    };
};
export declare const VColorPickerSwatches: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
        class: PropType<import("../../composables/component.js").ClassValue>;
        style: {
            type: PropType<import("vue").StyleValue>;
            default: null;
        };
        swatches: {
            type: PropType<DeepReadonly<Color[][]>>;
            default: () => string[][];
        };
        disabled: BooleanConstructor;
        readonly: BooleanConstructor;
        color: PropType<HSV | null>;
        maxHeight: (NumberConstructor | StringConstructor)[];
    }>> & {
        "onUpdate:color"?: ((color: HSV) => any) | undefined;
    }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        'update:color': (color: HSV) => true;
    }, import("vue").PublicProps, {
        style: import("vue").StyleValue;
        swatches: readonly (readonly (string | number | {
            readonly h: number;
            readonly s: number;
            readonly l: number;
            readonly a?: number;
        } | {
            readonly h: number;
            readonly s: number;
            readonly v: number;
            readonly a?: number;
        } | {
            readonly r: number;
            readonly g: number;
            readonly b: number;
            readonly a?: number;
        })[])[];
        disabled: boolean;
        readonly: boolean;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        class: PropType<import("../../composables/component.js").ClassValue>;
        style: {
            type: PropType<import("vue").StyleValue>;
            default: null;
        };
        swatches: {
            type: PropType<DeepReadonly<Color[][]>>;
            default: () => string[][];
        };
        disabled: BooleanConstructor;
        readonly: BooleanConstructor;
        color: PropType<HSV | null>;
        maxHeight: (NumberConstructor | StringConstructor)[];
    }>> & {
        "onUpdate:color"?: ((color: HSV) => any) | undefined;
    }, {}, {}, {}, {}, {
        style: import("vue").StyleValue;
        swatches: readonly (readonly (string | number | {
            readonly h: number;
            readonly s: number;
            readonly l: number;
            readonly a?: number;
        } | {
            readonly h: number;
            readonly s: number;
            readonly v: number;
            readonly a?: number;
        } | {
            readonly r: number;
            readonly g: number;
            readonly b: number;
            readonly a?: number;
        })[])[];
        disabled: boolean;
        readonly: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    class: PropType<import("../../composables/component.js").ClassValue>;
    style: {
        type: PropType<import("vue").StyleValue>;
        default: null;
    };
    swatches: {
        type: PropType<DeepReadonly<Color[][]>>;
        default: () => string[][];
    };
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    color: PropType<HSV | null>;
    maxHeight: (NumberConstructor | StringConstructor)[];
}>> & {
    "onUpdate:color"?: ((color: HSV) => any) | undefined;
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    'update:color': (color: HSV) => true;
}, string, {
    style: import("vue").StyleValue;
    swatches: readonly (readonly (string | number | {
        readonly h: number;
        readonly s: number;
        readonly l: number;
        readonly a?: number;
    } | {
        readonly h: number;
        readonly s: number;
        readonly v: number;
        readonly a?: number;
    } | {
        readonly r: number;
        readonly g: number;
        readonly b: number;
        readonly a?: number;
    })[])[];
    disabled: boolean;
    readonly: boolean;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & import("../../util/index.js").FilterPropsOptions<{
    class: PropType<import("../../composables/component.js").ClassValue>;
    style: {
        type: PropType<import("vue").StyleValue>;
        default: null;
    };
    swatches: {
        type: PropType<DeepReadonly<Color[][]>>;
        default: () => string[][];
    };
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    color: PropType<HSV | null>;
    maxHeight: (NumberConstructor | StringConstructor)[];
}, import("vue").ExtractPropTypes<{
    class: PropType<import("../../composables/component.js").ClassValue>;
    style: {
        type: PropType<import("vue").StyleValue>;
        default: null;
    };
    swatches: {
        type: PropType<DeepReadonly<Color[][]>>;
        default: () => string[][];
    };
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    color: PropType<HSV | null>;
    maxHeight: (NumberConstructor | StringConstructor)[];
}>>;
export type VColorPickerSwatches = InstanceType<typeof VColorPickerSwatches>;
