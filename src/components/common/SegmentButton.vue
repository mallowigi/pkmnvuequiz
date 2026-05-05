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
</script>

<template>
  <slot name="prefix" />

  <div
    v-if="slots.left"
    class="smolbutton left"
    :class="[
      {
        active: isActive('left'),
        attached: isAttached('left'),
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
    class="smolbutton center"
    :class="[
      {
        active: isActive('center'),
        attached: isAttached('center'),
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
    class="smolbutton right"
    :class="[
      {
        active: isActive('right'),
        attached: isAttached('right'),
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
    class="smolbutton suffix"
    :class="[
      {
        active: isActive('suffix'),
        attached: isAttached('suffix'),
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

.smolbutton.center.attached {
  border-radius: 0;
}
</style>
