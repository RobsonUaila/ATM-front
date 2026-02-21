//essa parte e dos primeiros modais de transferencias

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


const buttonsCancel = [document.getElementById('cancel-transfer-btn-external'), document.getElementById('cancel-transfer-btn')];

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


buttonsCancel.forEach((cancelTransferBtn) => {
  if (cancelTransferBtn) {
    cancelTransferBtn.addEventListener('click', () => {
      hideModal(modalTransferInternal);
      hideModal(modalTransferExternal);
      showModal(modal);
    });
  }
});


 



if (closeSuccessBtn) {
  closeSuccessBtn.addEventListener('click', () => hideModal(successModal));
}

// aqui comeca o restante dos modais
const serviceModals = [
  { open: 'open-payments-modal-btn', close: 'close-payments-modal-btn', id: 'payments-modal', overlay: 'payments-overlay' },
  { open: 'open-inquiries-modal-btn', close: 'close-inquiries-modal-btn', id: 'inquiries-modal', overlay: 'inquiries-overlay' },
  { open: 'open-withdraw-modal-btn', close: 'close-withdraw-modal-btn', id: 'withdraw-modal', overlay: 'withdraw-overlay' },
  { open: 'open-statement-modal-btn', close: 'close-statement-modal-btn', id: 'statement-modal', overlay: 'statement-overlay' },
  { open: 'open-deposit-modal-btn', close: 'close-deposit-modal-btn', id: 'deposit-modal', overlay: 'deposit-overlay' },
  { open: 'open-services-modal-btn', close: 'close-services-modal-btn', id: 'services-modal', overlay: 'services-overlay' }
];

serviceModals.forEach(config => {
  const openBtn = document.getElementById(config.open);
  const closeBtn = document.getElementById(config.close);
  const modalEl = document.getElementById(config.id);
  const overlayEl = document.getElementById(config.overlay);

  if (openBtn && modalEl) openBtn.addEventListener('click', () => showModal(modalEl));
  if (closeBtn && modalEl) closeBtn.addEventListener('click', () => hideModal(modalEl));
  if (overlayEl && modalEl) overlayEl.addEventListener('click', () => hideModal(modalEl));
});

//  Transferências Externas (Sub-modais)
const externalOptions = [
  { 
    btnId: 'Transfer-bnt-external', 
    modalId: 'transfer-modal-other-bank', 
    overlayId: 'modal-overlay-other-bank',
    confirmBtnId: 'confirm-other-bank-btn',
    cancelBtnId: 'cancel-other-bank-btn'
  },
  { 
    btnId: 'Transfer-bnt-movel', 
    modalId: 'transfer-modal-mobile', 
    overlayId: 'modal-overlay-mobile',
    confirmBtnId: 'confirm-mobile-btn',
    cancelBtnId: 'cancel-mobile-btn'
  },
  { 
    btnId: 'Transfer-btn-internacional', 
    modalId: 'transfer-modal-international', 
    overlayId: 'modal-overlay-international',
    confirmBtnId: 'confirm-international-btn',
    cancelBtnId: 'cancel-international-btn'
  }
];

externalOptions.forEach(opt => {
  const openBtn = document.getElementById(opt.btnId);
  const modalEl = document.getElementById(opt.modalId);
  const overlayEl = document.getElementById(opt.overlayId);
  const confirmBtn = document.getElementById(opt.confirmBtnId);
  const cancelBtn = document.getElementById(opt.cancelBtnId);

  // Abrir sub-modal e fechar menu de externa
  if (openBtn && modalEl) {
    openBtn.addEventListener('click', () => {
      hideModal(modalTransferExternal);
      showModal(modalEl);
    });
  }

  // Voltar para o menu de externa
  if (cancelBtn && modalEl) {
    cancelBtn.addEventListener('click', () => {
      hideModal(modalEl);
      showModal(modalTransferExternal);
    });
  }

  // Confirmar e mostrar sucesso
  if (confirmBtn && modalEl) {
    confirmBtn.addEventListener('click', () => {
      hideModal(modalEl);
      showModal(successModal);
    });
  }

  // Fechar ao clicar no overlay
  if (overlayEl && modalEl) {
    overlayEl.addEventListener('click', () => hideModal(modalEl));
  }
});
