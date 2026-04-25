import { reactive } from 'vue'

const confirmState = reactive({
  visible: false,
  title: 'Confirm',
  message: '',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  type: 'default',
  resolve: null,
})

export const useConfirm = () => {
  const confirm = (options) => {
    return new Promise((resolve) => {
      if (confirmState.resolve) {
        confirmState.resolve(false)
      }

      confirmState.visible = true
      confirmState.title = String(options?.title ?? 'Confirm')
      confirmState.message = String(options?.message ?? '')
      confirmState.confirmLabel = String(options?.confirmLabel ?? 'Confirm')
      confirmState.cancelLabel = String(options?.cancelLabel ?? 'Cancel')
      confirmState.type = options?.type === 'danger' ? 'danger' : 'default'
      confirmState.resolve = resolve
    })
  }

  return {
    confirm,
  }
}

export const getConfirmState = () => confirmState

export const resolveConfirm = (result) => {
  if (confirmState.resolve) {
    confirmState.resolve(result)
  }

  confirmState.resolve = null
  confirmState.visible = false
}
