const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');

const modal = document.getElementById('transfer-modal');
const modalTransferInternal = document.getElementById('transfer-modal-internal');
const modalTransferExternal = document.getElementById('transfer-modal-external');
const successModal = document.getElementById('success-modal');

const overlay = document.getElementById('modal-overlay');
const overlay1 = document.getElementById('modal-overlay1');
const overlay2 = document.getElementById('modal-overlay2');
const successOverlay = successModal
  ? successModal.querySelector('.fixed.inset-0')
  : null;

const internalTransferBtn = document.getElementById('internal-transfer-btn');
const externalTransferBtn = document.getElementById('external-transfer-btn');
const confirmTransferBtn = document.getElementById('confirm-transfer-btn');
const cancelTransferBtn = document.getElementById('cancel-transfer-btn');
const closeSuccessBtn = document.getElementById('close-success-btn');

function showModal(element) {
  if (element) element.classList.remove('hidden');
}

function hideModal(element) {
  if (element) element.classList.add('hidden');
}

if (openModalBtn) {
  openModalBtn.addEventListener('click', () => {
    hideModal(modalTransferInternal);
    hideModal(modalTransferExternal);
    hideModal(successModal);
    showModal(modal);
  });
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => hideModal(modal));
}

if (internalTransferBtn) {
  internalTransferBtn.addEventListener('click', () => {
    hideModal(modal);
    hideModal(modalTransferExternal);
    showModal(modalTransferInternal);
  });
}

if (externalTransferBtn) {
  externalTransferBtn.addEventListener('click', () => {
    hideModal(modal);
    hideModal(modalTransferInternal);
    showModal(modalTransferExternal);
  });
}

[overlay, overlay1, overlay2, successOverlay].forEach((element) => {
  if (!element) return;

  element.addEventListener('click', () => {
    hideModal(modal);
    hideModal(modalTransferInternal);
    hideModal(modalTransferExternal);
    hideModal(successModal);
  });
});

if (confirmTransferBtn) {
  confirmTransferBtn.addEventListener('click', () => {
    hideModal(modalTransferInternal);
    hideModal(modalTransferExternal);
    showModal(successModal);
  });
}

if (cancelTransferBtn) {
  cancelTransferBtn.addEventListener('click', () => {
    hideModal(modalTransferInternal);
    hideModal(modalTransferExternal);
    showModal(modal);
  });
}

if (closeSuccessBtn) {
  closeSuccessBtn.addEventListener('click', () => hideModal(successModal));
}
