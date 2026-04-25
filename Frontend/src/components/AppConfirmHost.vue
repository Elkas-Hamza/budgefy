<script setup>
import { getConfirmState, resolveConfirm } from '../composables/useConfirm'

const dialog = getConfirmState()

const closeDialog = (result) => {
  resolveConfirm(result)
}
</script>

<template>
  <teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="dialog.visible" class="fixed inset-0 z-[110] grid place-items-center bg-slate-900/55 p-4">
        <div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white">{{ dialog.title }}</h3>
          <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {{ dialog.message }}
          </p>
          <div class="mt-6 flex justify-end gap-3">
            <button
              class="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              type="button"
              @click="closeDialog(false)"
            >
              {{ dialog.cancelLabel }}
            </button>
            <button
              class="rounded-lg px-4 py-2 text-sm font-semibold text-white"
              :class="dialog.type === 'danger' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-primary hover:bg-primary/90'"
              type="button"
              @click="closeDialog(true)"
            >
              {{ dialog.confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
