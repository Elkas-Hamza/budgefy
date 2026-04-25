const TOAST_EVENT_NAME = 'app-toast'

export const toastEventName = TOAST_EVENT_NAME

export const useToast = () => {
  const showToast = (message, type = 'success', duration = 2600) => {
    if (!message) {
      return
    }

    window.dispatchEvent(
      new CustomEvent(TOAST_EVENT_NAME, {
        detail: {
          message,
          type,
          duration,
        },
      }),
    )
  }

  return {
    showToast,
  }
}
