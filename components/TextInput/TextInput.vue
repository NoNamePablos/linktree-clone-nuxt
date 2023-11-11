<script setup lang="ts">
  import { computed } from 'vue';
  import { cva, type VariantProps } from 'class-variance-authority';
  type TIntent =
    | 'base'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning';
  type TAllowedType = 'text' | 'password' | 'email' | 'phone';
  interface ITextInput {
    error?: string;
    label?: string;
    placeholder?: string;
    inputType?: TAllowedType;
    modelValue: string;
    intent?: TIntent;
    required?: boolean;
  }
  const props = withDefaults(defineProps<ITextInput>(), {
    inputType: 'text',
    placeholder: 'Enter text',
    intent: 'base',
    required: true,
  });

  const emits = defineEmits(['update:modelValue']);
  const handleInput = (target: HTMLInputElement) => {
    emits('update:modelValue', target.value);
  };
  const inputClass = computed(() => {
    return cva('input input-bordered w-full', {
      variants: {
        intent: {
          base: '',
          primary: 'input-primary',
          secondary: 'input-secondary',
          accent: 'input-accent',
          info: 'input-info',
          success: 'input-success',
          warning: 'input-warning',
          error: 'input-error',
        },
      },
    })({ intent: props.intent });
  });
</script>

<template>
  <div class="form-control w-full">
    <label class="label" v-if="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <client-only>
      <input
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput($event.target)"
        autocomplete="off"
        :class="inputClass" />
    </client-only>
    <label class="label" v-if="error">
      <span class="label-text-alt text-red-500 text-[14px] font-semibold">{{
        error
      }}</span>
    </label>
  </div>
</template>

<style scoped></style>
