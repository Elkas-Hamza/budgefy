<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { toastEventName } from '../composables/useToast'

const toast = ref({
  visible: false,
  message: '',
  type: 'success',
})

let hideTimeout = null

const clearHideTimeout = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
}

const handleToastEvent = (event) => {
  const message = String(event?.detail?.message ?? '').trim()

  if (!message) {
    return
  }

  const type = event?.detail?.type === 'error' ? 'error' : 'success'
  const duration = Number(event?.detail?.duration ?? 2600)

  clearHideTimeout()

  toast.value = {
    visible: true,
    message,
    type,
  }

  hideTimeout = setTimeout(() => {
    toast.value.visible = false
  }, duration > 0 ? duration : 2600)
}

onMounted(() => {
  window.addEventListener(toastEventName, handleToastEvent)
})

onBeforeUnmount(() => {
  clearHideTimeout()
  window.removeEventListener(toastEventName, handleToastEvent)
})
</script>

<template>
  <teleport to="body">
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-if="toast.visible"
        class="fixed left-1/2 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-xl border px-4 py-3 text-sm font-semibold shadow-xl"
        :class="toast.type === 'success'
          ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300'
          : 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/50 dark:text-rose-300'"
      >
        {{ toast.message }}
      </div>
    </transition>
  </teleport>
</template>
