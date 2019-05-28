export const displayToast = (toastManager, message, status) => {
  toastManager.add(`${message}`, {
    appearance: `${status}`,
    autoDismiss: true,
    pauseOnHover: false
  });
};

// statuses: success, error, warning, info
