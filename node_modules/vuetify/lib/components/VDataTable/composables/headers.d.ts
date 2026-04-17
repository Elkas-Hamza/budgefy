import type { DeepReadonly, InjectionKey, PropType, Ref } from 'vue';
import type { SortItem } from './sort.js';
import type { DataTableCompareFunction, DataTableHeader, InternalDataTableHeader } from '../types.js';
import type { FilterKeyFunctions } from '../../../composables/filter.js';
export declare const makeDataTableHeaderProps: <Defaults extends {
    headers?: unknown;
} = {}>(defaults?: Defaults | undefined) => {
    headers: unknown extends Defaults["headers"] ? PropType<readonly {
        readonly key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {});
        readonly value?: import("../../../util/index.js").SelectItemKey<Record<string, any>>;
        readonly title?: string;
        readonly fixed?: boolean | 'start' | 'end';
        readonly align?: 'start' | 'end' | 'center';
        readonly width?: number | string;
        readonly minWidth?: number | string;
        readonly maxWidth?: number | string;
        readonly nowrap?: boolean;
        readonly indent?: number;
        readonly headerProps?: {
            readonly [x: string]: any;
        } | undefined;
        readonly cellProps?: import("../../../types.js").DataTableHeaderCellPropsFunction | {
            readonly [x: string]: any;
        } | undefined;
        readonly sortable?: boolean;
        readonly sort?: DataTableCompareFunction;
        readonly sortRaw?: DataTableCompareFunction;
        readonly filter?: import("../../../types.js").FilterFunction;
        readonly children?: readonly {
            readonly key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {});
            readonly value?: import("../../../util/index.js").SelectItemKey<Record<string, any>>;
            readonly title?: string;
            readonly fixed?: boolean | 'start' | 'end';
            readonly align?: 'start' | 'end' | 'center';
            readonly width?: number | string;
            readonly minWidth?: number | string;
            readonly maxWidth?: number | string;
            readonly nowrap?: boolean;
            readonly indent?: number;
            readonly headerProps?: {
                readonly [x: string]: any;
            } | undefined;
            readonly cellProps?: import("../../../types.js").DataTableHeaderCellPropsFunction | {
                readonly [x: string]: any;
            } | undefined;
            readonly sortable?: boolean;
            readonly sort?: DataTableCompareFunction;
            readonly sortRaw?: DataTableCompareFunction;
            readonly filter?: import("../../../types.js").FilterFunction;
            readonly children?: readonly /*elided*/ any[] | undefined;
        }[] | undefined;
    }[]> : {
        type: PropType<unknown extends Defaults["headers"] ? readonly {
            readonly key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {});
            readonly value?: import("../../../util/index.js").SelectItemKey<Record<string, any>>;
            readonly title?: string;
            readonly fixed?: boolean | 'start' | 'end';
            readonly align?: 'start' | 'end' | 'center';
            readonly width?: number | string;
            readonly minWidth?: number | string;
            readonly maxWidth?: number | string;
            readonly nowrap?: boolean;
            readonly indent?: number;
            readonly headerProps?: {
                readonly [x: string]: any;
            } | undefined;
            readonly cellProps?: import("../../../types.js").DataTableHeaderCellPropsFunction | {
                readonly [x: string]: any;
            } | undefined;
            readonly sortable?: boolean;
            readonly sort?: DataTableCompareFunction;
            readonly sortRaw?: DataTableCompareFunction;
            readonly filter?: import("../../../types.js").FilterFunction;
            readonly children?: readonly {
                readonly key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {});
                readonly value?: import("../../../util/index.js").SelectItemKey<Record<string, any>>;
                readonly title?: string;
                readonly fixed?: boolean | 'start' | 'end';
                readonly align?: 'start' | 'end' | 'center';
                readonly width?: number | string;
                readonly minWidth?: number | string;
                readonly maxWidth?: number | string;
                readonly nowrap?: boolean;
                readonly indent?: number;
                readonly headerProps?: {
                    readonly [x: string]: any;
                } | undefined;
                readonly cellProps?: import("../../../types.js").DataTableHeaderCellPropsFunction | {
                    readonly [x: string]: any;
                } | undefined;
                readonly sortable?: boolean;
                readonly sort?: DataTableCompareFunction;
                readonly sortRaw?: DataTableCompareFunction;
                readonly filter?: import("../../../types.js").FilterFunction;
                readonly children?: readonly any[] | undefined;
            }[] | undefined;
        }[] : readonly {
            readonly key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {});
            readonly value?: import("../../../util/index.js").SelectItemKey<Record<string, any>>;
            readonly title?: string;
            readonly fixed?: boolean | 'start' | 'end';
            readonly align?: 'start' | 'end' | 'center';
            readonly width?: number | string;
            readonly minWidth?: number | string;
            readonly maxWidth?: number | string;
            readonly nowrap?: boolean;
            readonly indent?: number;
            readonly headerProps?: {
                readonly [x: string]: any;
            } | undefined;
            readonly cellProps?: import("../../../types.js").DataTableHeaderCellPropsFunction | {
                readonly [x: string]: any;
            } | undefined;
            readonly sortable?: boolean;
            readonly sort?: DataTableCompareFunction;
            readonly sortRaw?: DataTableCompareFunction;
            readonly filter?: import("../../../types.js").FilterFunction;
            readonly children?: readonly {
                readonly key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {});
                readonly value?: import("../../../util/index.js").SelectItemKey<Record<string, any>>;
                readonly title?: string;
                readonly fixed?: boolean | 'start' | 'end';
                readonly align?: 'start' | 'end' | 'center';
                readonly width?: number | string;
                readonly minWidth?: number | string;
                readonly maxWidth?: number | string;
                readonly nowrap?: boolean;
                readonly indent?: number;
                readonly headerProps?: {
                    readonly [x: string]: any;
                } | undefined;
                readonly cellProps?: import("../../../types.js").DataTableHeaderCellPropsFunction | {
                    readonly [x: string]: any;
                } | undefined;
                readonly sortable?: boolean;
                readonly sort?: DataTableCompareFunction;
                readonly sortRaw?: DataTableCompareFunction;
                readonly filter?: import("../../../types.js").FilterFunction;
                readonly children?: readonly any[] | undefined;
            }[] | undefined;
        }[] | Defaults["headers"]>;
        default: unknown extends Defaults["headers"] ? readonly {
            readonly key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {});
            readonly value?: import("../../../util/index.js").SelectItemKey<Record<string, any>>;
            readonly title?: string;
            readonly fixed?: boolean | 'start' | 'end';
            readonly align?: 'start' | 'end' | 'center';
            readonly width?: number | string;
            readonly minWidth?: number | string;
            readonly maxWidth?: number | string;
            readonly nowrap?: boolean;
            readonly indent?: number;
            readonly headerProps?: {
                readonly [x: string]: any;
            } | undefined;
            readonly cellProps?: import("../../../types.js").DataTableHeaderCellPropsFunction | {
                readonly [x: string]: any;
            } | undefined;
            readonly sortable?: boolean;
            readonly sort?: DataTableCompareFunction;
            readonly sortRaw?: DataTableCompareFunction;
            readonly filter?: import("../../../types.js").FilterFunction;
            readonly children?: readonly {
                readonly key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {});
                readonly value?: import("../../../util/index.js").SelectItemKey<Record<string, any>>;
                readonly title?: string;
                readonly fixed?: boolean | 'start' | 'end';
                readonly align?: 'start' | 'end' | 'center';
                readonly width?: number | string;
                readonly minWidth?: number | string;
                readonly maxWidth?: number | string;
                readonly nowrap?: boolean;
                readonly indent?: number;
                readonly headerProps?: {
                    readonly [x: string]: any;
                } | undefined;
                readonly cellProps?: import("../../../types.js").DataTableHeaderCellPropsFunction | {
                    readonly [x: string]: any;
                } | undefined;
                readonly sortable?: boolean;
                readonly sort?: DataTableCompareFunction;
                readonly sortRaw?: DataTableCompareFunction;
                readonly filter?: import("../../../types.js").FilterFunction;
                readonly children?: readonly any[] | undefined;
            }[] | undefined;
        }[] : readonly {
            readonly key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {});
            readonly value?: import("../../../util/index.js").SelectItemKey<Record<string, any>>;
            readonly title?: string;
            readonly fixed?: boolean | 'start' | 'end';
            readonly align?: 'start' | 'end' | 'center';
            readonly width?: number | string;
            readonly minWidth?: number | string;
            readonly maxWidth?: number | string;
            readonly nowrap?: boolean;
            readonly indent?: number;
            readonly headerProps?: {
                readonly [x: string]: any;
            } | undefined;
            readonly cellProps?: import("../../../types.js").DataTableHeaderCellPropsFunction | {
                readonly [x: string]: any;
            } | undefined;
            readonly sortable?: boolean;
            readonly sort?: DataTableCompareFunction;
            readonly sortRaw?: DataTableCompareFunction;
            readonly filter?: import("../../../types.js").FilterFunction;
            readonly children?: readonly {
                readonly key?: 'data-table-group' | 'data-table-select' | 'data-table-expand' | (string & {});
                readonly value?: import("../../../util/index.js").SelectItemKey<Record<string, any>>;
                readonly title?: string;
                readonly fixed?: boolean | 'start' | 'end';
                readonly align?: 'start' | 'end' | 'center';
                readonly width?: number | string;
                readonly minWidth?: number | string;
                readonly maxWidth?: number | string;
                readonly nowrap?: boolean;
                readonly indent?: number;
                readonly headerProps?: {
                    readonly [x: string]: any;
                } | undefined;
                readonly cellProps?: import("../../../types.js").DataTableHeaderCellPropsFunction | {
                    readonly [x: string]: any;
                } | undefined;
                readonly sortable?: boolean;
                readonly sort?: DataTableCompareFunction;
                readonly sortRaw?: DataTableCompareFunction;
                readonly filter?: import("../../../types.js").FilterFunction;
                readonly children?: readonly any[] | undefined;
            }[] | undefined;
        }[] | Defaults["headers"];
    };
};
export declare const VDataTableHeadersSymbol: InjectionKey<{
    headers: Ref<InternalDataTableHeader[][]>;
    columns: Ref<InternalDataTableHeader[]>;
}>;
type HeaderProps = {
    headers: DeepReadonly<DataTableHeader[]> | undefined;
    items: any[];
};
export declare function createHeaders(props: HeaderProps, options?: {
    groupBy?: Ref<readonly SortItem[]>;
    showSelect?: Ref<boolean>;
    showExpand?: Ref<boolean>;
}): {
    headers: Ref<{
        title?: string;
        fixed?: boolean | 'start' | 'end';
        align?: 'start' | 'end' | 'center';
        width?: number | string;
        minWidth?: number | string;
        maxWidth?: number | string;
        nowrap?: boolean;
        indent?: number;
        headerProps?: Record<string, any>;
        cellProps?: import("../types.js").HeaderCellProps;
        sortable: boolean;
        sort?: DataTableCompareFunction;
        sortRaw?: DataTableCompareFunction;
        filter?: import("../../../types.js").FilterFunction;
        key: string | null;
        value: import("../../../util/index.js").SelectItemKey | null;
        fixedOffset?: number;
        fixedEndOffset?: number;
        lastFixed?: boolean;
        firstFixedEnd?: boolean;
        colspan?: number;
        rowspan?: number;
        children?: /*elided*/ any[] | undefined;
    }[][], {
        title?: string;
        fixed?: boolean | 'start' | 'end';
        align?: 'start' | 'end' | 'center';
        width?: number | string;
        minWidth?: number | string;
        maxWidth?: number | string;
        nowrap?: boolean;
        indent?: number;
        headerProps?: Record<string, any>;
        cellProps?: import("../types.js").HeaderCellProps;
        sortable: boolean;
        sort?: DataTableCompareFunction;
        sortRaw?: DataTableCompareFunction;
        filter?: import("../../../types.js").FilterFunction;
        key: string | null;
        value: import("../../../util/index.js").SelectItemKey | null;
        fixedOffset?: number;
        fixedEndOffset?: number;
        lastFixed?: boolean;
        firstFixedEnd?: boolean;
        colspan?: number;
        rowspan?: number;
        children?: any[] | undefined;
    }[][] | InternalDataTableHeader[][]>;
    columns: Ref<{
        title?: string;
        fixed?: boolean | 'start' | 'end';
        align?: 'start' | 'end' | 'center';
        width?: number | string;
        minWidth?: number | string;
        maxWidth?: number | string;
        nowrap?: boolean;
        indent?: number;
        headerProps?: Record<string, any>;
        cellProps?: import("../types.js").HeaderCellProps;
        sortable: boolean;
        sort?: DataTableCompareFunction;
        sortRaw?: DataTableCompareFunction;
        filter?: import("../../../types.js").FilterFunction;
        key: string | null;
        value: import("../../../util/index.js").SelectItemKey | null;
        fixedOffset?: number;
        fixedEndOffset?: number;
        lastFixed?: boolean;
        firstFixedEnd?: boolean;
        colspan?: number;
        rowspan?: number;
        children?: any[] | undefined;
    }[], {
        title?: string;
        fixed?: boolean | 'start' | 'end';
        align?: 'start' | 'end' | 'center';
        width?: number | string;
        minWidth?: number | string;
        maxWidth?: number | string;
        nowrap?: boolean;
        indent?: number;
        headerProps?: Record<string, any>;
        cellProps?: import("../types.js").HeaderCellProps;
        sortable: boolean;
        sort?: DataTableCompareFunction;
        sortRaw?: DataTableCompareFunction;
        filter?: import("../../../types.js").FilterFunction;
        key: string | null;
        value: import("../../../util/index.js").SelectItemKey | null;
        fixedOffset?: number;
        fixedEndOffset?: number;
        lastFixed?: boolean;
        firstFixedEnd?: boolean;
        colspan?: number;
        rowspan?: number;
        children?: any[] | undefined;
    }[] | InternalDataTableHeader[]>;
    sortFunctions: Ref<Record<string, DataTableCompareFunction>, Record<string, DataTableCompareFunction>>;
    sortRawFunctions: Ref<Record<string, DataTableCompareFunction>, Record<string, DataTableCompareFunction>>;
    filterFunctions: Ref<FilterKeyFunctions, FilterKeyFunctions>;
};
export declare function useHeaders(): {
    headers: Ref<InternalDataTableHeader[][]>;
    columns: Ref<InternalDataTableHeader[]>;
};

