import { mergeProps as _mergeProps, createVNode as _createVNode, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass } from "vue";
// Styles
import "./VProgress.css";

// Components
import { VProgressCircular } from "../../components/VProgressCircular/VProgressCircular.js";
import { makeVProgressLinearProps, VProgressLinear } from "../../components/VProgressLinear/VProgressLinear.js"; // Composables
import { makeComponentProps } from "../../composables/component.js"; // Utilities
import { computed, toRef } from 'vue';
import { clamp, genericComponent, omit, pick, propsFactory, useRender } from "../../util/index.js"; // Types
export const makeVProgressProps = propsFactory({
  type: {
    type: String,
    default: 'linear'
  },
  label: String,
  detailsPosition: {
    type: String,
    default: 'top'
  },
  valueFormat: {
    type: [String, Function],
    default: '[percent]%'
  },
  max: {
    type: [Number, String],
    default: 100
  },
  absolute: Boolean,
  hideLabel: Boolean,
  hideValue: Boolean,
  indeterminate: Boolean,
  rounded: Boolean,
  ...pick(makeVProgressLinearProps(), [
  // relevant props shared between linear and circular
  'modelValue', 'color', 'bgColor', 'theme']),
  ...makeComponentProps()
}, 'VProgress');
function formatValue(format, value, max, percent) {
  if (typeof format === 'function') return format({
    value,
    max,
    percent
  });
  return format.replaceAll('[value]', String(value)).replaceAll('[max]', String(max)).replaceAll('[percent]', String(Math.round(percent)));
}
export const VProgress = genericComponent()({
  name: 'VProgress',
  props: makeVProgressProps(),
  setup(props, {
    slots
  }) {
    const isLinear = toRef(() => props.type === 'linear');
    const max = toRef(() => parseFloat(props.max) || 100);
    const normalizedValue = computed(() => clamp(parseFloat(props.modelValue), 0, max.value));
    const percent = computed(() => normalizedValue.value / max.value * 100);
    const formattedValue = toRef(() => formatValue(props.valueFormat, normalizedValue.value, max.value, percent.value));
    useRender(() => {
      const hasDetails = !!(props.label || slots.label) && !(props.hideLabel && props.hideValue);
      const scopeProps = {
        max: max.value,
        percent: percent.value,
        value: normalizedValue.value,
        formattedValue: formattedValue.value
      };
      const progressProps = {
        role: 'progressbar',
        'aria-label': props.label,
        'aria-valuenow': props.indeterminate ? undefined : normalizedValue.value,
        'aria-valuemin': 0,
        'aria-valuemax': max.value,
        'aria-valuetext': props.indeterminate ? undefined : formattedValue.value
      };
      function progressComponent() {
        if (isLinear.value) {
          const linearProps = VProgressLinear.filterProps(props);
          return _createVNode(VProgressLinear, _mergeProps(linearProps, {
            "modelValue": props.modelValue,
            "aria-hidden": "true"
          }), null);
        }
        const circularProps = VProgressCircular.filterProps(omit(props, ['indeterminate']));
        return _createVNode(VProgressCircular, _mergeProps(circularProps, {
          "modelValue": percent.value,
          "aria-hidden": "true",
          "indeterminate": props.indeterminate
        }), null);
      }
      return _createElementVNode("div", _mergeProps({
        "class": ['v-progress', {
          'v-progress--absolute': props.absolute
        }, props.class],
        "style": props.style
      }, progressProps), [hasDetails && _createElementVNode("div", {
        "key": "details",
        "class": _normalizeClass(['v-progress__details', `v-progress__details--location-${props.detailsPosition}`]),
        "aria-hidden": "true"
      }, [!props.hideLabel && _createElementVNode("div", {
        "key": "label",
        "class": "v-progress__label"
      }, [slots.label?.(scopeProps) ?? props.label]), !props.hideValue && _createElementVNode("div", {
        "key": "value",
        "class": "v-progress__value"
      }, [slots.value?.(scopeProps) ?? formattedValue.value])]), slots.default?.(scopeProps) ?? progressComponent(), props.absolute && hasDetails && _createElementVNode("div", {
        "key": "spacer",
        "class": "v-progress__spacer",
        "style": {
          order: props.detailsPosition === 'bottom' ? -1 : 2
        }
      }, null)]);
    });
    return {};
  }
});
//# sourceMappingURL=VProgress.js.map