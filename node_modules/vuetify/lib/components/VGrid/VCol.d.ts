
import type { PropType } from 'vue';
declare const ALIGN_SELF_VALUES: readonly ['auto', 'start', 'end', 'center', 'baseline', 'stretch'];
export declare const makeVColProps: <Defaults extends {
    class?: unknown;
    style?: unknown;
    tag?: unknown;
    cols?: unknown;
    offset?: unknown;
    order?: unknown;
    orderSm?: unknown;
    orderMd?: unknown;
    orderLg?: unknown;
    orderXl?: unknown;
    orderXxl?: unknown;
    alignSelf?: unknown;
    lg?: unknown;
    md?: unknown;
    offsetLg?: unknown;
    offsetMd?: unknown;
    offsetSm?: unknown;
    offsetXl?: unknown;
    offsetXxl?: unknown;
    sm?: unknown;
    xl?: unknown;
    xxl?: unknown;
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
    tag: unknown extends Defaults["tag"] ? {
        type: PropType<string | import("../../util/index.js").JSXComponent>;
        default: string;
    } : Omit<{
        type: PropType<string | import("../../util/index.js").JSXComponent>;
        default: string;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["tag"] ? string | import("../../util/index.js").JSXComponent : string | Defaults["tag"] | import("../../util/index.js").JSXComponent>;
        default: unknown extends Defaults["tag"] ? string | import("../../util/index.js").JSXComponent : Defaults["tag"] | NonNullable<string | import("../../util/index.js").JSXComponent>;
    };
    cols: unknown extends Defaults["cols"] ? {
        type: (BooleanConstructor | NumberConstructor | StringConstructor)[];
        default: boolean;
    } : Omit<{
        type: (BooleanConstructor | NumberConstructor | StringConstructor)[];
        default: boolean;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["cols"] ? string | number | boolean : string | number | boolean | Defaults["cols"]>;
        default: unknown extends Defaults["cols"] ? string | number | boolean : Defaults["cols"] | NonNullable<string | number | boolean>;
    };
    offset: unknown extends Defaults["offset"] ? {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    } : Omit<{
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["offset"] ? string | number : string | number | Defaults["offset"]>;
        default: unknown extends Defaults["offset"] ? string | number : Defaults["offset"] | NonNullable<string | number>;
    };
    order: unknown extends Defaults["order"] ? {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    } : Omit<{
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["order"] ? string | number : string | number | Defaults["order"]>;
        default: unknown extends Defaults["order"] ? string | number : Defaults["order"] | NonNullable<string | number>;
    };
    orderSm: unknown extends Defaults["orderSm"] ? {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    } : Omit<{
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["orderSm"] ? string | number : string | number | Defaults["orderSm"]>;
        default: unknown extends Defaults["orderSm"] ? string | number : Defaults["orderSm"] | NonNullable<string | number>;
    };
    orderMd: unknown extends Defaults["orderMd"] ? {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    } : Omit<{
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["orderMd"] ? string | number : string | number | Defaults["orderMd"]>;
        default: unknown extends Defaults["orderMd"] ? string | number : Defaults["orderMd"] | NonNullable<string | number>;
    };
    orderLg: unknown extends Defaults["orderLg"] ? {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    } : Omit<{
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["orderLg"] ? string | number : string | number | Defaults["orderLg"]>;
        default: unknown extends Defaults["orderLg"] ? string | number : Defaults["orderLg"] | NonNullable<string | number>;
    };
    orderXl: unknown extends Defaults["orderXl"] ? {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    } : Omit<{
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["orderXl"] ? string | number : string | number | Defaults["orderXl"]>;
        default: unknown extends Defaults["orderXl"] ? string | number : Defaults["orderXl"] | NonNullable<string | number>;
    };
    orderXxl: unknown extends Defaults["orderXxl"] ? {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    } : Omit<{
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["orderXxl"] ? string | number : string | number | Defaults["orderXxl"]>;
        default: unknown extends Defaults["orderXxl"] ? string | number : Defaults["orderXxl"] | NonNullable<string | number>;
    };
    alignSelf: unknown extends Defaults["alignSelf"] ? {
        type: PropType<(typeof ALIGN_SELF_VALUES)[number]>;
        default: null;
        validator: (str: any) => boolean;
    } : Omit<{
        type: PropType<(typeof ALIGN_SELF_VALUES)[number]>;
        default: null;
        validator: (str: any) => boolean;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["alignSelf"] ? "auto" | "baseline" | "center" | "end" | "start" | "stretch" : "auto" | "baseline" | "center" | "end" | "start" | "stretch" | Defaults["alignSelf"]>;
        default: unknown extends Defaults["alignSelf"] ? "auto" | "baseline" | "center" | "end" | "start" | "stretch" : Defaults["alignSelf"] | NonNullable<"auto" | "baseline" | "center" | "end" | "start" | "stretch">;
    };
    lg: unknown extends Defaults["lg"] ? {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    } : Omit<{
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["lg"] ? string | number | boolean : string | number | boolean | Defaults["lg"]>;
        default: unknown extends Defaults["lg"] ? string | number | boolean : Defaults["lg"] | NonNullable<string | number | boolean>;
    };
    md: unknown extends Defaults["md"] ? {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    } : Omit<{
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["md"] ? string | number | boolean : string | number | boolean | Defaults["md"]>;
        default: unknown extends Defaults["md"] ? string | number | boolean : Defaults["md"] | NonNullable<string | number | boolean>;
    };
    offsetLg: unknown extends Defaults["offsetLg"] ? {
        type: [StringConstructor, NumberConstructor];
        default: null;
    } : Omit<{
        type: [StringConstructor, NumberConstructor];
        default: null;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["offsetLg"] ? string | number : string | number | Defaults["offsetLg"]>;
        default: unknown extends Defaults["offsetLg"] ? string | number : Defaults["offsetLg"] | NonNullable<string | number>;
    };
    offsetMd: unknown extends Defaults["offsetMd"] ? {
        type: [StringConstructor, NumberConstructor];
        default: null;
    } : Omit<{
        type: [StringConstructor, NumberConstructor];
        default: null;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["offsetMd"] ? string | number : string | number | Defaults["offsetMd"]>;
        default: unknown extends Defaults["offsetMd"] ? string | number : Defaults["offsetMd"] | NonNullable<string | number>;
    };
    offsetSm: unknown extends Defaults["offsetSm"] ? {
        type: [StringConstructor, NumberConstructor];
        default: null;
    } : Omit<{
        type: [StringConstructor, NumberConstructor];
        default: null;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["offsetSm"] ? string | number : string | number | Defaults["offsetSm"]>;
        default: unknown extends Defaults["offsetSm"] ? string | number : Defaults["offsetSm"] | NonNullable<string | number>;
    };
    offsetXl: unknown extends Defaults["offsetXl"] ? {
        type: [StringConstructor, NumberConstructor];
        default: null;
    } : Omit<{
        type: [StringConstructor, NumberConstructor];
        default: null;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["offsetXl"] ? string | number : string | number | Defaults["offsetXl"]>;
        default: unknown extends Defaults["offsetXl"] ? string | number : Defaults["offsetXl"] | NonNullable<string | number>;
    };
    offsetXxl: unknown extends Defaults["offsetXxl"] ? {
        type: [StringConstructor, NumberConstructor];
        default: null;
    } : Omit<{
        type: [StringConstructor, NumberConstructor];
        default: null;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["offsetXxl"] ? string | number : string | number | Defaults["offsetXxl"]>;
        default: unknown extends Defaults["offsetXxl"] ? string | number : Defaults["offsetXxl"] | NonNullable<string | number>;
    };
    sm: unknown extends Defaults["sm"] ? {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    } : Omit<{
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["sm"] ? string | number | boolean : string | number | boolean | Defaults["sm"]>;
        default: unknown extends Defaults["sm"] ? string | number | boolean : Defaults["sm"] | NonNullable<string | number | boolean>;
    };
    xl: unknown extends Defaults["xl"] ? {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    } : Omit<{
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["xl"] ? string | number | boolean : string | number | boolean | Defaults["xl"]>;
        default: unknown extends Defaults["xl"] ? string | number | boolean : Defaults["xl"] | NonNullable<string | number | boolean>;
    };
    xxl: unknown extends Defaults["xxl"] ? {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    } : Omit<{
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["xxl"] ? string | number | boolean : string | number | boolean | Defaults["xxl"]>;
        default: unknown extends Defaults["xxl"] ? string | number | boolean : Defaults["xxl"] | NonNullable<string | number | boolean>;
    };
};
export declare const VCol: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<{
        style: string | false | import("vue").StyleValue[] | import("vue").CSSProperties | null;
        tag: string | import("../../util/index.js").JSXComponent;
        cols: string | number | boolean;
        offset: string | number;
        order: string | number;
        orderSm: string | number;
        orderMd: string | number;
        orderLg: string | number;
        orderXl: string | number;
        orderXxl: string | number;
        alignSelf: "auto" | "baseline" | "center" | "end" | "start" | "stretch";
        lg: string | number | boolean;
        md: string | number | boolean;
        offsetLg: string | number;
        offsetMd: string | number;
        offsetSm: string | number;
        offsetXl: string | number;
        offsetXxl: string | number;
        sm: string | number | boolean;
        xl: string | number | boolean;
        xxl: string | number | boolean;
    } & {
        class?: any;
    } & {
        $children?: {
            default?: (() => import("vue").VNodeChild) | undefined;
        } | {
            $stable?: boolean;
        } | (() => import("vue").VNodeChild) | import("vue").VNodeChild;
        'v-slots'?: {
            default?: false | (() => import("vue").VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => import("vue").VNodeChild) | undefined;
    }, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, {
        style: import("vue").StyleValue;
        tag: string | import("../../util/index.js").JSXComponent;
        cols: string | number | boolean;
        offset: string | number;
        order: string | number;
        orderSm: string | number;
        orderMd: string | number;
        orderLg: string | number;
        orderXl: string | number;
        orderXxl: string | number;
        alignSelf: "auto" | "baseline" | "center" | "end" | "start" | "stretch";
        lg: string | number | boolean;
        md: string | number | boolean;
        offsetLg: string | number;
        offsetMd: string | number;
        offsetSm: string | number;
        offsetXl: string | number;
        offsetXxl: string | number;
        sm: string | number | boolean;
        xl: string | number | boolean;
        xxl: string | number | boolean;
    }, true, {}, import("vue").SlotsType<Partial<{
        default: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
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
        tag: string | import("../../util/index.js").JSXComponent;
        cols: string | number | boolean;
        offset: string | number;
        order: string | number;
        orderSm: string | number;
        orderMd: string | number;
        orderLg: string | number;
        orderXl: string | number;
        orderXxl: string | number;
        alignSelf: "auto" | "baseline" | "center" | "end" | "start" | "stretch";
        lg: string | number | boolean;
        md: string | number | boolean;
        offsetLg: string | number;
        offsetMd: string | number;
        offsetSm: string | number;
        offsetXl: string | number;
        offsetXxl: string | number;
        sm: string | number | boolean;
        xl: string | number | boolean;
        xxl: string | number | boolean;
    } & {
        class?: any;
    } & {
        $children?: {
            default?: (() => import("vue").VNodeChild) | undefined;
        } | {
            $stable?: boolean;
        } | (() => import("vue").VNodeChild) | import("vue").VNodeChild;
        'v-slots'?: {
            default?: false | (() => import("vue").VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:default"?: false | (() => import("vue").VNodeChild) | undefined;
    }, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>, {}, {}, {}, {
        style: import("vue").StyleValue;
        tag: string | import("../../util/index.js").JSXComponent;
        cols: string | number | boolean;
        offset: string | number;
        order: string | number;
        orderSm: string | number;
        orderMd: string | number;
        orderLg: string | number;
        orderXl: string | number;
        orderXxl: string | number;
        alignSelf: "auto" | "baseline" | "center" | "end" | "start" | "stretch";
        lg: string | number | boolean;
        md: string | number | boolean;
        offsetLg: string | number;
        offsetMd: string | number;
        offsetSm: string | number;
        offsetXl: string | number;
        offsetXxl: string | number;
        sm: string | number | boolean;
        xl: string | number | boolean;
        xxl: string | number | boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<{
    style: string | false | import("vue").StyleValue[] | import("vue").CSSProperties | null;
    tag: string | import("../../util/index.js").JSXComponent;
    cols: string | number | boolean;
    offset: string | number;
    order: string | number;
    orderSm: string | number;
    orderMd: string | number;
    orderLg: string | number;
    orderXl: string | number;
    orderXxl: string | number;
    alignSelf: "auto" | "baseline" | "center" | "end" | "start" | "stretch";
    lg: string | number | boolean;
    md: string | number | boolean;
    offsetLg: string | number;
    offsetMd: string | number;
    offsetSm: string | number;
    offsetXl: string | number;
    offsetXxl: string | number;
    sm: string | number | boolean;
    xl: string | number | boolean;
    xxl: string | number | boolean;
} & {
    class?: any;
} & {
    $children?: {
        default?: (() => import("vue").VNodeChild) | undefined;
    } | {
        $stable?: boolean;
    } | (() => import("vue").VNodeChild) | import("vue").VNodeChild;
    'v-slots'?: {
        default?: false | (() => import("vue").VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:default"?: false | (() => import("vue").VNodeChild) | undefined;
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
    style: import("vue").StyleValue;
    tag: string | import("../../util/index.js").JSXComponent;
    cols: string | number | boolean;
    offset: string | number;
    order: string | number;
    orderSm: string | number;
    orderMd: string | number;
    orderLg: string | number;
    orderXl: string | number;
    orderXxl: string | number;
    alignSelf: "auto" | "baseline" | "center" | "end" | "start" | "stretch";
    lg: string | number | boolean;
    md: string | number | boolean;
    offsetLg: string | number;
    offsetMd: string | number;
    offsetSm: string | number;
    offsetXl: string | number;
    offsetXxl: string | number;
    sm: string | number | boolean;
    xl: string | number | boolean;
    xxl: string | number | boolean;
}, {}, string, import("vue").SlotsType<Partial<{
    default: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
}>>, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & import("../../util/index.js").FilterPropsOptions<{
    class: PropType<import("../../composables/component.js").ClassValue>;
    style: {
        type: PropType<import("vue").StyleValue>;
        default: null;
    };
    tag: {
        type: PropType<string | import("../../util/index.js").JSXComponent>;
        default: string;
    };
    cols: {
        type: (BooleanConstructor | NumberConstructor | StringConstructor)[];
        default: boolean;
    };
    offset: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    order: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    orderSm: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    orderMd: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    orderLg: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    orderXl: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    orderXxl: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    alignSelf: {
        type: PropType<(typeof ALIGN_SELF_VALUES)[number]>;
        default: null;
        validator: (str: any) => boolean;
    };
    lg: {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    };
    md: {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    };
    offsetLg: {
        type: [StringConstructor, NumberConstructor];
        default: null;
    };
    offsetMd: {
        type: [StringConstructor, NumberConstructor];
        default: null;
    };
    offsetSm: {
        type: [StringConstructor, NumberConstructor];
        default: null;
    };
    offsetXl: {
        type: [StringConstructor, NumberConstructor];
        default: null;
    };
    offsetXxl: {
        type: [StringConstructor, NumberConstructor];
        default: null;
    };
    sm: {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    };
    xl: {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    };
    xxl: {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    };
}, import("vue").ExtractPropTypes<{
    class: PropType<import("../../composables/component.js").ClassValue>;
    style: {
        type: PropType<import("vue").StyleValue>;
        default: null;
    };
    tag: {
        type: PropType<string | import("../../util/index.js").JSXComponent>;
        default: string;
    };
    cols: {
        type: (BooleanConstructor | NumberConstructor | StringConstructor)[];
        default: boolean;
    };
    offset: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    order: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    orderSm: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    orderMd: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    orderLg: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    orderXl: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    orderXxl: {
        type: (NumberConstructor | StringConstructor)[];
        default: null;
    };
    alignSelf: {
        type: PropType<(typeof ALIGN_SELF_VALUES)[number]>;
        default: null;
        validator: (str: any) => boolean;
    };
    lg: {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    };
    md: {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    };
    offsetLg: {
        type: [StringConstructor, NumberConstructor];
        default: null;
    };
    offsetMd: {
        type: [StringConstructor, NumberConstructor];
        default: null;
    };
    offsetSm: {
        type: [StringConstructor, NumberConstructor];
        default: null;
    };
    offsetXl: {
        type: [StringConstructor, NumberConstructor];
        default: null;
    };
    offsetXxl: {
        type: [StringConstructor, NumberConstructor];
        default: null;
    };
    sm: {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    };
    xl: {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    };
    xxl: {
        type: [BooleanConstructor, StringConstructor, NumberConstructor];
        default: false;
    };
}>>;
export type VCol = InstanceType<typeof VCol>;

