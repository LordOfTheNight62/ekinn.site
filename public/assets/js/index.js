window.addEventListener('load', () => {
  const notYetReadyToast = document.getElementById('notYetReadyToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(notYetReadyToast);
  window.showNotYetReadyToast = () => {
    toastBootstrap.show();
  };
});
