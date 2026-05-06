<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();

const props = withDefaults(
  defineProps<{
    active?: {
      left?: boolean;
      center?: boolean;
      right?: boolean;
      suffix?: boolean;
    };
    attached?: {
      left?: boolean;
      center?: boolean;
      right?: boolean;
      suffix?: boolean;
    };
    noPointer?: {
      left?: boolean;
      center?: boolean;
      right?: boolean;
      suffix?: boolean;
    };
    classes?: {
      left?: string | string[];
      center?: string | string[];
      right?: string | string[];
      suffix?: string | string[];
    };
  }>(),
  {
    attached: () => ({
      center: true,
      right: true,
    }),
  },
);

defineEmits(['click:left', 'click:center', 'click:right', 'click:suffix']);

const isActive = (name: 'left' | 'center' | 'right' | 'suffix') => {
  if (!props.active) return false;
  return props.active[name as keyof typeof props.active] === true;
};

const isAttached = (name: 'left' | 'center' | 'right' | 'suffix') => {
  if (!props.attached) return false;
  return props.attached[name as keyof typeof props.attached] === true;
};

const isNoPointer = (name: 'left' | 'center' | 'right' | 'suffix') => {
  if (!props.noPointer) return false;
  return props.noPointer[name as keyof typeof props.noPointer] === true;
};

const isAttachedToNext = (name: 'left' | 'center' | 'right' | 'suffix') => {
  if (name === 'left') {
    if (slots.center) return isAttached('center');
    if (slots.right) return isAttached('right');
    if (slots.suffix) return isAttached('suffix');
  }
  if (name === 'center') {
    if (slots.right) return isAttached('right');
    if (slots.suffix) return isAttached('suffix');
  }
  if (name === 'right') {
    if (slots.suffix) return isAttached('suffix');
  }
  return false;
};
</script>

<template>
  <slot name="prefix" />

  <div
    v-if="slots.left"
    class="smolbutton transition-element left"
    :class="[
      {
        active: isActive('left'),
        attached: isAttached('left'),
        'attached-next': isAttachedToNext('left'),
        'no-pointer': isNoPointer('left'),
      },
      classes?.left,
    ]"
    @click="$emit('click:left')"
  >
    <slot name="left" />
  </div>

  <div
    v-if="slots.center"
    class="smolbutton transition-element center"
    :class="[
      {
        active: isActive('center'),
        attached: isAttached('center'),
        'attached-next': isAttachedToNext('center'),
        'no-pointer': isNoPointer('center'),
      },
      classes?.center,
    ]"
    @click="$emit('click:center')"
  >
    <slot name="center" />
  </div>

  <div
    v-if="slots.right"
    class="smolbutton transition-element right"
    :class="[
      {
        active: isActive('right'),
        attached: isAttached('right'),
        'attached-next': isAttachedToNext('right'),
        'no-pointer': isNoPointer('right'),
      },
      classes?.right,
    ]"
    @click="$emit('click:right')"
  >
    <slot name="right" />
  </div>

  <div
    v-if="slots.suffix"
    class="transition-element suffix"
    :class="[
      {
        active: isActive('suffix'),
        attached: isAttached('suffix'),
        'attached-next': isAttachedToNext('suffix'),
        'no-pointer': isNoPointer('suffix'),
      },
      classes?.suffix,
    ]"
    @click="$emit('click:suffix')"
  >
    <slot name="suffix" />
  </div>

  <slot name="suffix-raw" />
</template>

<style scoped>
div:empty {
  display: none;
}

.no-pointer {
  cursor: default;
}

.smolbutton {
  border: solid 2px var(--type-btn-color);
  color: var(--type-btn-color);
  border-radius: 6px 3px 6px 3px;
  text-align: center;
  text-decoration: none;
  padding: 3px 5px 3px 5px;
  vertical-align: middle;
  line-height: 16px;
  cursor: pointer;

  &.active {
    background: var(--type-btn-color);
    color: var(--button);
  }

  &.attached {
    border-radius: 0 3px 6px 0;
    margin-left: -10px;
  }

  &:hover {
    background: var(--type-dark-color);
    border-color: var(--type-dark-color);
    color: var(--button);
  }
}

.smolbutton.attached-next {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
