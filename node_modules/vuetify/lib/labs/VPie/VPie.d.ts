
import type { PropType, TransitionProps } from 'vue';
import type { PieItem, TextTemplate } from './types.js';
export type VPieSlots = {
    center: {
        total: number;
    };
    legend: {
        isActive: (item: PieItem) => boolean;
        toggle: (item: PieItem) => void;
        items: PieItem[];
        total: number;
    };
    'legend-text': {
        item: PieItem;
        total: number;
    };
    title: never;
    tooltip: {
        item: PieItem;
        total: number;
    };
};
export declare const makeVPieProps: <Defaults extends {
    density?: unknown;
    reveal?: unknown;
    innerCut?: unknown;
    hoverScale?: unknown;
    gap?: unknown;
    rounded?: unknown;
    animation?: unknown;
    hideSlice?: unknown;
    title?: unknown;
    bgColor?: unknown;
    items?: unknown;
    palette?: unknown;
    itemKey?: unknown;
    itemValue?: unknown;
    itemTitle?: unknown;
    size?: unknown;
    rotate?: unknown;
    gaugeCut?: unknown;
    legend?: unknown;
    tooltip?: unknown;
} = {}>(defaults?: Defaults | undefined) => {
    density: unknown extends Defaults["density"] ? {
        type: PropType<import("../../composables/density.js").Density>;
        default: string;
        validator: (v: any) => boolean;
    } : Omit<{
        type: PropType<import("../../composables/density.js").Density>;
        default: string;
        validator: (v: any) => boolean;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["density"] ? import("../../composables/density.js").Density : Defaults["density"] | import("../../composables/density.js").Density>;
        default: unknown extends Defaults["density"] ? import("../../composables/density.js").Density : Defaults["density"] | NonNullable<import("../../composables/density.js").Density>;
    };
    reveal: unknown extends Defaults["reveal"] ? {
        type: PropType<boolean | {
            duration?: number;
        }>;
        default: boolean;
    } : Omit<{
        type: PropType<boolean | {
            duration?: number;
        }>;
        default: boolean;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["reveal"] ? boolean | {
            duration?: number;
        } : boolean | {
            duration?: number;
        } | Defaults["reveal"]>;
        default: unknown extends Defaults["reveal"] ? boolean | {
            duration?: number;
        } : Defaults["reveal"] | NonNullable<boolean | {
            duration?: number;
        }>;
    };
    innerCut: unknown extends Defaults["innerCut"] ? (NumberConstructor | StringConstructor)[] : {
        type: PropType<unknown extends Defaults["innerCut"] ? string | number : string | number | Defaults["innerCut"]>;
        default: unknown extends Defaults["innerCut"] ? string | number : Defaults["innerCut"] | NonNullable<string | number>;
    };
    hoverScale: unknown extends Defaults["hoverScale"] ? {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    } : Omit<{
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["hoverScale"] ? string | number : string | number | Defaults["hoverScale"]>;
        default: unknown extends Defaults["hoverScale"] ? string | number : Defaults["hoverScale"] | NonNullable<string | number>;
    };
    gap: unknown extends Defaults["gap"] ? (NumberConstructor | StringConstructor)[] : {
        type: PropType<unknown extends Defaults["gap"] ? string | number : string | number | Defaults["gap"]>;
        default: unknown extends Defaults["gap"] ? string | number : Defaults["gap"] | NonNullable<string | number>;
    };
    rounded: unknown extends Defaults["rounded"] ? (NumberConstructor | StringConstructor)[] : {
        type: PropType<unknown extends Defaults["rounded"] ? string | number : string | number | Defaults["rounded"]>;
        default: unknown extends Defaults["rounded"] ? string | number : Defaults["rounded"] | NonNullable<string | number>;
    };
    animation: unknown extends Defaults["animation"] ? {
        type: PropType<boolean | {
            duration?: number;
            easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
        }>;
        default: boolean;
    } : Omit<{
        type: PropType<boolean | {
            duration?: number;
            easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
        }>;
        default: boolean;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["animation"] ? boolean | {
            duration?: number;
            easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
        } : boolean | {
            duration?: number;
            easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
        } | Defaults["animation"]>;
        default: unknown extends Defaults["animation"] ? boolean | {
            duration?: number;
            easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
        } : Defaults["animation"] | NonNullable<boolean | {
            duration?: number;
            easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
        }>;
    };
    hideSlice: unknown extends Defaults["hideSlice"] ? BooleanConstructor : {
        type: PropType<unknown extends Defaults["hideSlice"] ? boolean : boolean | Defaults["hideSlice"]>;
        default: unknown extends Defaults["hideSlice"] ? boolean : boolean | Defaults["hideSlice"];
    };
    title: unknown extends Defaults["title"] ? StringConstructor : {
        type: PropType<unknown extends Defaults["title"] ? string : string | Defaults["title"]>;
        default: unknown extends Defaults["title"] ? string : string | Defaults["title"];
    };
    bgColor: unknown extends Defaults["bgColor"] ? StringConstructor : {
        type: PropType<unknown extends Defaults["bgColor"] ? string : string | Defaults["bgColor"]>;
        default: unknown extends Defaults["bgColor"] ? string : string | Defaults["bgColor"];
    };
    items: unknown extends Defaults["items"] ? {
        type: PropType<Record<string, any> | {
            color?: string;
            pattern?: string;
        }[]>;
        default: () => never[];
    } : Omit<{
        type: PropType<Record<string, any> | {
            color?: string;
            pattern?: string;
        }[]>;
        default: () => never[];
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["items"] ? {
            color?: string;
            pattern?: string;
        }[] | Record<string, any> : {
            color?: string;
            pattern?: string;
        }[] | Record<string, any> | Defaults["items"]>;
        default: unknown extends Defaults["items"] ? {
            color?: string;
            pattern?: string;
        }[] | Record<string, any> : Defaults["items"] | NonNullable<{
            color?: string;
            pattern?: string;
        }[] | Record<string, any>>;
    };
    palette: unknown extends Defaults["palette"] ? {
        type: PropType<({
            color?: string;
            pattern?: string;
        } | string)[]>;
        default: () => never[];
    } : Omit<{
        type: PropType<({
            color?: string;
            pattern?: string;
        } | string)[]>;
        default: () => never[];
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["palette"] ? (string | {
            color?: string;
            pattern?: string;
        })[] : (string | {
            color?: string;
            pattern?: string;
        })[] | Defaults["palette"]>;
        default: unknown extends Defaults["palette"] ? (string | {
            color?: string;
            pattern?: string;
        })[] : (string | {
            color?: string;
            pattern?: string;
        })[] | Defaults["palette"];
    };
    itemKey: unknown extends Defaults["itemKey"] ? {
        type: StringConstructor;
        default: string;
    } : Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["itemKey"] ? string : string | Defaults["itemKey"]>;
        default: unknown extends Defaults["itemKey"] ? string : string | Defaults["itemKey"];
    };
    itemValue: unknown extends Defaults["itemValue"] ? {
        type: StringConstructor;
        default: string;
    } : Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["itemValue"] ? string : string | Defaults["itemValue"]>;
        default: unknown extends Defaults["itemValue"] ? string : string | Defaults["itemValue"];
    };
    itemTitle: unknown extends Defaults["itemTitle"] ? {
        type: StringConstructor;
        default: string;
    } : Omit<{
        type: StringConstructor;
        default: string;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["itemTitle"] ? string : string | Defaults["itemTitle"]>;
        default: unknown extends Defaults["itemTitle"] ? string : string | Defaults["itemTitle"];
    };
    size: unknown extends Defaults["size"] ? {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    } : Omit<{
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["size"] ? string | number : string | number | Defaults["size"]>;
        default: unknown extends Defaults["size"] ? string | number : Defaults["size"] | NonNullable<string | number>;
    };
    rotate: unknown extends Defaults["rotate"] ? (NumberConstructor | StringConstructor)[] : {
        type: PropType<unknown extends Defaults["rotate"] ? string | number : string | number | Defaults["rotate"]>;
        default: unknown extends Defaults["rotate"] ? string | number : Defaults["rotate"] | NonNullable<string | number>;
    };
    gaugeCut: unknown extends Defaults["gaugeCut"] ? (NumberConstructor | StringConstructor)[] : {
        type: PropType<unknown extends Defaults["gaugeCut"] ? string | number : string | number | Defaults["gaugeCut"]>;
        default: unknown extends Defaults["gaugeCut"] ? string | number : Defaults["gaugeCut"] | NonNullable<string | number>;
    };
    legend: unknown extends Defaults["legend"] ? {
        type: PropType<boolean | {
            position?: 'left' | 'top' | 'right' | 'bottom';
            textFormat?: TextTemplate;
        }>;
        default: boolean;
    } : Omit<{
        type: PropType<boolean | {
            position?: 'left' | 'top' | 'right' | 'bottom';
            textFormat?: TextTemplate;
        }>;
        default: boolean;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["legend"] ? boolean | {
            position?: 'left' | 'top' | 'right' | 'bottom';
            textFormat?: TextTemplate;
        } : boolean | {
            position?: 'left' | 'top' | 'right' | 'bottom';
            textFormat?: TextTemplate;
        } | Defaults["legend"]>;
        default: unknown extends Defaults["legend"] ? boolean | {
            position?: 'left' | 'top' | 'right' | 'bottom';
            textFormat?: TextTemplate;
        } : Defaults["legend"] | NonNullable<boolean | {
            position?: 'left' | 'top' | 'right' | 'bottom';
            textFormat?: TextTemplate;
        }>;
    };
    tooltip: unknown extends Defaults["tooltip"] ? {
        type: PropType<boolean | {
            titleFormat?: TextTemplate;
            subtitleFormat?: TextTemplate;
            avatarSize?: number;
            transition?: string | boolean | TransitionProps;
            offset?: number;
        }>;
        default: boolean;
    } : Omit<{
        type: PropType<boolean | {
            titleFormat?: TextTemplate;
            subtitleFormat?: TextTemplate;
            avatarSize?: number;
            transition?: string | boolean | TransitionProps;
            offset?: number;
        }>;
        default: boolean;
    }, "default" | "type"> & {
        type: PropType<unknown extends Defaults["tooltip"] ? boolean | {
            titleFormat?: TextTemplate;
            subtitleFormat?: TextTemplate;
            avatarSize?: number;
            transition?: string | boolean | TransitionProps;
            offset?: number;
        } : boolean | {
            titleFormat?: TextTemplate;
            subtitleFormat?: TextTemplate;
            avatarSize?: number;
            transition?: string | boolean | TransitionProps;
            offset?: number;
        } | Defaults["tooltip"]>;
        default: unknown extends Defaults["tooltip"] ? boolean | {
            titleFormat?: TextTemplate;
            subtitleFormat?: TextTemplate;
            avatarSize?: number;
            transition?: string | boolean | TransitionProps;
            offset?: number;
        } : Defaults["tooltip"] | NonNullable<boolean | {
            titleFormat?: TextTemplate;
            subtitleFormat?: TextTemplate;
            avatarSize?: number;
            transition?: string | boolean | TransitionProps;
            offset?: number;
        }>;
    };
};
export declare const VPie: {
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<{
        density: import("../../composables/density.js").Density;
        reveal: boolean | {
            duration?: number;
        };
        hoverScale: string | number;
        animation: boolean | {
            duration?: number;
            easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
        };
        hideSlice: boolean;
        items: {
            color?: string;
            pattern?: string;
        }[] | Record<string, any>;
        palette: (string | {
            color?: string;
            pattern?: string;
        })[];
        itemKey: string;
        itemValue: string;
        itemTitle: string;
        size: string | number;
        legend: boolean | {
            position?: 'left' | 'top' | 'right' | 'bottom';
            textFormat?: TextTemplate;
        };
        tooltip: boolean | {
            titleFormat?: TextTemplate;
            subtitleFormat?: TextTemplate;
            avatarSize?: number;
            transition?: string | boolean | TransitionProps;
            offset?: number;
        };
    } & {
        innerCut?: string | number | undefined;
        gap?: string | number | undefined;
        rounded?: string | number | undefined;
        title?: string | undefined;
        bgColor?: string | undefined;
        rotate?: string | number | undefined;
        gaugeCut?: string | number | undefined;
    } & {
        $children?: {
            center?: ((arg: {
                total: number;
            }) => import("vue").VNodeChild) | undefined;
            legend?: ((arg: {
                isActive: (item: PieItem) => boolean;
                toggle: (item: PieItem) => void;
                items: PieItem[];
                total: number;
            }) => import("vue").VNodeChild) | undefined;
            'legend-text'?: ((arg: {
                item: PieItem;
                total: number;
            }) => import("vue").VNodeChild) | undefined;
            title?: (() => import("vue").VNodeChild) | undefined;
            tooltip?: ((arg: {
                item: PieItem;
                total: number;
            }) => import("vue").VNodeChild) | undefined;
        } | {
            $stable?: boolean;
        } | {} | import("vue").VNodeChild;
        'v-slots'?: {
            center?: false | ((arg: {
                total: number;
            }) => import("vue").VNodeChild) | undefined;
            legend?: false | ((arg: {
                isActive: (item: PieItem) => boolean;
                toggle: (item: PieItem) => void;
                items: PieItem[];
                total: number;
            }) => import("vue").VNodeChild) | undefined;
            'legend-text'?: false | ((arg: {
                item: PieItem;
                total: number;
            }) => import("vue").VNodeChild) | undefined;
            title?: false | (() => import("vue").VNodeChild) | undefined;
            tooltip?: false | ((arg: {
                item: PieItem;
                total: number;
            }) => import("vue").VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:center"?: false | ((arg: {
            total: number;
        }) => import("vue").VNodeChild) | undefined;
        "v-slot:legend"?: false | ((arg: {
            isActive: (item: PieItem) => boolean;
            toggle: (item: PieItem) => void;
            items: PieItem[];
            total: number;
        }) => import("vue").VNodeChild) | undefined;
        "v-slot:legend-text"?: false | ((arg: {
            item: PieItem;
            total: number;
        }) => import("vue").VNodeChild) | undefined;
        "v-slot:title"?: false | (() => import("vue").VNodeChild) | undefined;
        "v-slot:tooltip"?: false | ((arg: {
            item: PieItem;
            total: number;
        }) => import("vue").VNodeChild) | undefined;
    }, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, {
        density: import("../../composables/density.js").Density;
        reveal: boolean | {
            duration?: number;
        };
        hoverScale: string | number;
        animation: boolean | {
            duration?: number;
            easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
        };
        hideSlice: boolean;
        items: {
            color?: string;
            pattern?: string;
        }[] | Record<string, any>;
        palette: (string | {
            color?: string;
            pattern?: string;
        })[];
        itemKey: string;
        itemValue: string;
        itemTitle: string;
        size: string | number;
        legend: boolean | {
            position?: 'left' | 'top' | 'right' | 'bottom';
            textFormat?: TextTemplate;
        };
        tooltip: boolean | {
            titleFormat?: TextTemplate;
            subtitleFormat?: TextTemplate;
            avatarSize?: number;
            transition?: string | boolean | TransitionProps;
            offset?: number;
        };
    }, true, {}, import("vue").SlotsType<Partial<{
        center: (arg: {
            total: number;
        }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>[];
        legend: (arg: {
            isActive: (item: PieItem) => boolean;
            toggle: (item: PieItem) => void;
            items: PieItem[];
            total: number;
        }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>[];
        'legend-text': (arg: {
            item: PieItem;
            total: number;
        }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>[];
        title: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>[];
        tooltip: (arg: {
            item: PieItem;
            total: number;
        }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
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
        density: import("../../composables/density.js").Density;
        reveal: boolean | {
            duration?: number;
        };
        hoverScale: string | number;
        animation: boolean | {
            duration?: number;
            easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
        };
        hideSlice: boolean;
        items: {
            color?: string;
            pattern?: string;
        }[] | Record<string, any>;
        palette: (string | {
            color?: string;
            pattern?: string;
        })[];
        itemKey: string;
        itemValue: string;
        itemTitle: string;
        size: string | number;
        legend: boolean | {
            position?: 'left' | 'top' | 'right' | 'bottom';
            textFormat?: TextTemplate;
        };
        tooltip: boolean | {
            titleFormat?: TextTemplate;
            subtitleFormat?: TextTemplate;
            avatarSize?: number;
            transition?: string | boolean | TransitionProps;
            offset?: number;
        };
    } & {
        innerCut?: string | number | undefined;
        gap?: string | number | undefined;
        rounded?: string | number | undefined;
        title?: string | undefined;
        bgColor?: string | undefined;
        rotate?: string | number | undefined;
        gaugeCut?: string | number | undefined;
    } & {
        $children?: {
            center?: ((arg: {
                total: number;
            }) => import("vue").VNodeChild) | undefined;
            legend?: ((arg: {
                isActive: (item: PieItem) => boolean;
                toggle: (item: PieItem) => void;
                items: PieItem[];
                total: number;
            }) => import("vue").VNodeChild) | undefined;
            'legend-text'?: ((arg: {
                item: PieItem;
                total: number;
            }) => import("vue").VNodeChild) | undefined;
            title?: (() => import("vue").VNodeChild) | undefined;
            tooltip?: ((arg: {
                item: PieItem;
                total: number;
            }) => import("vue").VNodeChild) | undefined;
        } | {
            $stable?: boolean;
        } | {} | import("vue").VNodeChild;
        'v-slots'?: {
            center?: false | ((arg: {
                total: number;
            }) => import("vue").VNodeChild) | undefined;
            legend?: false | ((arg: {
                isActive: (item: PieItem) => boolean;
                toggle: (item: PieItem) => void;
                items: PieItem[];
                total: number;
            }) => import("vue").VNodeChild) | undefined;
            'legend-text'?: false | ((arg: {
                item: PieItem;
                total: number;
            }) => import("vue").VNodeChild) | undefined;
            title?: false | (() => import("vue").VNodeChild) | undefined;
            tooltip?: false | ((arg: {
                item: PieItem;
                total: number;
            }) => import("vue").VNodeChild) | undefined;
        } | undefined;
    } & {
        "v-slot:center"?: false | ((arg: {
            total: number;
        }) => import("vue").VNodeChild) | undefined;
        "v-slot:legend"?: false | ((arg: {
            isActive: (item: PieItem) => boolean;
            toggle: (item: PieItem) => void;
            items: PieItem[];
            total: number;
        }) => import("vue").VNodeChild) | undefined;
        "v-slot:legend-text"?: false | ((arg: {
            item: PieItem;
            total: number;
        }) => import("vue").VNodeChild) | undefined;
        "v-slot:title"?: false | (() => import("vue").VNodeChild) | undefined;
        "v-slot:tooltip"?: false | ((arg: {
            item: PieItem;
            total: number;
        }) => import("vue").VNodeChild) | undefined;
    }, () => JSX.Element, {}, {}, {}, {
        density: import("../../composables/density.js").Density;
        reveal: boolean | {
            duration?: number;
        };
        hoverScale: string | number;
        animation: boolean | {
            duration?: number;
            easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
        };
        hideSlice: boolean;
        items: {
            color?: string;
            pattern?: string;
        }[] | Record<string, any>;
        palette: (string | {
            color?: string;
            pattern?: string;
        })[];
        itemKey: string;
        itemValue: string;
        itemTitle: string;
        size: string | number;
        legend: boolean | {
            position?: 'left' | 'top' | 'right' | 'bottom';
            textFormat?: TextTemplate;
        };
        tooltip: boolean | {
            titleFormat?: TextTemplate;
            subtitleFormat?: TextTemplate;
            avatarSize?: number;
            transition?: string | boolean | TransitionProps;
            offset?: number;
        };
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<{
    density: import("../../composables/density.js").Density;
    reveal: boolean | {
        duration?: number;
    };
    hoverScale: string | number;
    animation: boolean | {
        duration?: number;
        easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
    };
    hideSlice: boolean;
    items: {
        color?: string;
        pattern?: string;
    }[] | Record<string, any>;
    palette: (string | {
        color?: string;
        pattern?: string;
    })[];
    itemKey: string;
    itemValue: string;
    itemTitle: string;
    size: string | number;
    legend: boolean | {
        position?: 'left' | 'top' | 'right' | 'bottom';
        textFormat?: TextTemplate;
    };
    tooltip: boolean | {
        titleFormat?: TextTemplate;
        subtitleFormat?: TextTemplate;
        avatarSize?: number;
        transition?: string | boolean | TransitionProps;
        offset?: number;
    };
} & {
    innerCut?: string | number | undefined;
    gap?: string | number | undefined;
    rounded?: string | number | undefined;
    title?: string | undefined;
    bgColor?: string | undefined;
    rotate?: string | number | undefined;
    gaugeCut?: string | number | undefined;
} & {
    $children?: {
        center?: ((arg: {
            total: number;
        }) => import("vue").VNodeChild) | undefined;
        legend?: ((arg: {
            isActive: (item: PieItem) => boolean;
            toggle: (item: PieItem) => void;
            items: PieItem[];
            total: number;
        }) => import("vue").VNodeChild) | undefined;
        'legend-text'?: ((arg: {
            item: PieItem;
            total: number;
        }) => import("vue").VNodeChild) | undefined;
        title?: (() => import("vue").VNodeChild) | undefined;
        tooltip?: ((arg: {
            item: PieItem;
            total: number;
        }) => import("vue").VNodeChild) | undefined;
    } | {
        $stable?: boolean;
    } | {} | import("vue").VNodeChild;
    'v-slots'?: {
        center?: false | ((arg: {
            total: number;
        }) => import("vue").VNodeChild) | undefined;
        legend?: false | ((arg: {
            isActive: (item: PieItem) => boolean;
            toggle: (item: PieItem) => void;
            items: PieItem[];
            total: number;
        }) => import("vue").VNodeChild) | undefined;
        'legend-text'?: false | ((arg: {
            item: PieItem;
            total: number;
        }) => import("vue").VNodeChild) | undefined;
        title?: false | (() => import("vue").VNodeChild) | undefined;
        tooltip?: false | ((arg: {
            item: PieItem;
            total: number;
        }) => import("vue").VNodeChild) | undefined;
    } | undefined;
} & {
    "v-slot:center"?: false | ((arg: {
        total: number;
    }) => import("vue").VNodeChild) | undefined;
    "v-slot:legend"?: false | ((arg: {
        isActive: (item: PieItem) => boolean;
        toggle: (item: PieItem) => void;
        items: PieItem[];
        total: number;
    }) => import("vue").VNodeChild) | undefined;
    "v-slot:legend-text"?: false | ((arg: {
        item: PieItem;
        total: number;
    }) => import("vue").VNodeChild) | undefined;
    "v-slot:title"?: false | (() => import("vue").VNodeChild) | undefined;
    "v-slot:tooltip"?: false | ((arg: {
        item: PieItem;
        total: number;
    }) => import("vue").VNodeChild) | undefined;
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, {
    density: import("../../composables/density.js").Density;
    reveal: boolean | {
        duration?: number;
    };
    hoverScale: string | number;
    animation: boolean | {
        duration?: number;
        easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
    };
    hideSlice: boolean;
    items: {
        color?: string;
        pattern?: string;
    }[] | Record<string, any>;
    palette: (string | {
        color?: string;
        pattern?: string;
    })[];
    itemKey: string;
    itemValue: string;
    itemTitle: string;
    size: string | number;
    legend: boolean | {
        position?: 'left' | 'top' | 'right' | 'bottom';
        textFormat?: TextTemplate;
    };
    tooltip: boolean | {
        titleFormat?: TextTemplate;
        subtitleFormat?: TextTemplate;
        avatarSize?: number;
        transition?: string | boolean | TransitionProps;
        offset?: number;
    };
}, {}, string, import("vue").SlotsType<Partial<{
    center: (arg: {
        total: number;
    }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
    legend: (arg: {
        isActive: (item: PieItem) => boolean;
        toggle: (item: PieItem) => void;
        items: PieItem[];
        total: number;
    }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
    'legend-text': (arg: {
        item: PieItem;
        total: number;
    }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
    title: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
    tooltip: (arg: {
        item: PieItem;
        total: number;
    }) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
}>>, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & import("../../util/index.js").FilterPropsOptions<{
    density: {
        type: PropType<import("../../composables/density.js").Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    reveal: {
        type: PropType<boolean | {
            duration?: number;
        }>;
        default: boolean;
    };
    innerCut: (NumberConstructor | StringConstructor)[];
    hoverScale: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    gap: (NumberConstructor | StringConstructor)[];
    rounded: (NumberConstructor | StringConstructor)[];
    animation: {
        type: PropType<boolean | {
            duration?: number;
            easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
        }>;
        default: boolean;
    };
    hideSlice: BooleanConstructor;
    title: StringConstructor;
    bgColor: StringConstructor;
    items: {
        type: PropType<Record<string, any> | {
            color?: string;
            pattern?: string;
        }[]>;
        default: () => never[];
    };
    palette: {
        type: PropType<({
            color?: string;
            pattern?: string;
        } | string)[]>;
        default: () => never[];
    };
    itemKey: {
        type: StringConstructor;
        default: string;
    };
    itemValue: {
        type: StringConstructor;
        default: string;
    };
    itemTitle: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    rotate: (NumberConstructor | StringConstructor)[];
    gaugeCut: (NumberConstructor | StringConstructor)[];
    legend: {
        type: PropType<boolean | {
            position?: 'left' | 'top' | 'right' | 'bottom';
            textFormat?: TextTemplate;
        }>;
        default: boolean;
    };
    tooltip: {
        type: PropType<boolean | {
            titleFormat?: TextTemplate;
            subtitleFormat?: TextTemplate;
            avatarSize?: number;
            transition?: string | boolean | TransitionProps;
            offset?: number;
        }>;
        default: boolean;
    };
}, import("vue").ExtractPropTypes<{
    density: {
        type: PropType<import("../../composables/density.js").Density>;
        default: string;
        validator: (v: any) => boolean;
    };
    reveal: {
        type: PropType<boolean | {
            duration?: number;
        }>;
        default: boolean;
    };
    innerCut: (NumberConstructor | StringConstructor)[];
    hoverScale: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    gap: (NumberConstructor | StringConstructor)[];
    rounded: (NumberConstructor | StringConstructor)[];
    animation: {
        type: PropType<boolean | {
            duration?: number;
            easing?: "easeInCubic" | "easeInOutCubic" | "easeInOutQuad" | "easeInOutQuart" | "easeInOutQuint" | "easeInQuad" | "easeInQuart" | "easeInQuint" | "easeOutCubic" | "easeOutQuad" | "easeOutQuart" | "easeOutQuint" | "instant" | "linear";
        }>;
        default: boolean;
    };
    hideSlice: BooleanConstructor;
    title: StringConstructor;
    bgColor: StringConstructor;
    items: {
        type: PropType<Record<string, any> | {
            color?: string;
            pattern?: string;
        }[]>;
        default: () => never[];
    };
    palette: {
        type: PropType<({
            color?: string;
            pattern?: string;
        } | string)[]>;
        default: () => never[];
    };
    itemKey: {
        type: StringConstructor;
        default: string;
    };
    itemValue: {
        type: StringConstructor;
        default: string;
    };
    itemTitle: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    rotate: (NumberConstructor | StringConstructor)[];
    gaugeCut: (NumberConstructor | StringConstructor)[];
    legend: {
        type: PropType<boolean | {
            position?: 'left' | 'top' | 'right' | 'bottom';
            textFormat?: TextTemplate;
        }>;
        default: boolean;
    };
    tooltip: {
        type: PropType<boolean | {
            titleFormat?: TextTemplate;
            subtitleFormat?: TextTemplate;
            avatarSize?: number;
            transition?: string | boolean | TransitionProps;
            offset?: number;
        }>;
        default: boolean;
    };
}>>;
export type VPie = InstanceType<typeof VPie>;
