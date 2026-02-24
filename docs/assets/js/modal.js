
// URLs do backend (NestJS)
const BASE_URL = 'http://localhost:3000/api';

// Transferência Interna
document.getElementById('form-transfer-internal').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        conta: formData.get('conta'),
        montante: parseFloat(formData.get('montante')),
        descricao: formData.get('descricao')
    };

    try {
        const res = await fetch(`${BASE_URL}/transferencias/interna`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if(res.ok) alert('Transferência realizada com sucesso!');
    } catch (err) {
        alert('Erro ao realizar a transferência');
        console.error(err);
    }
});

// Depósito
document.getElementById('form-deposit').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
        montante: parseFloat(formData.get('montante')),
        conta: formData.get('conta')
    };
    try {
        const res = await fetch(`${BASE_URL}/depositos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if(res.ok) alert('Depósito realizado com sucesso!');
    } catch (err) {
        alert('Erro ao realizar o depósito');
        console.error(err);
    }
});

// Consultas
document.getElementById('open-inquiries-modal-btn').addEventListener('click', async () => {
    try {
        const res = await fetch(`${BASE_URL}/conta/saldo`);
        const data = await res.json();
        document.getElementById('saldo-disponivel').textContent = `Saldo Disponível: ${data.saldoDisponivel}`;
        document.getElementById('saldo-contabilistico').textContent = `Saldo Contabilístico: ${data.saldoContabilistico}`;
        document.getElementById('inquiries-modal').classList.remove('hidden');
    } catch(err) {
        alert('Erro ao consultar saldo');
    }
});

// Extrato
document.getElementById('form-statement').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const params = new URLSearchParams({
        dataInicio: formData.get('dataInicio'),
        dataFim: formData.get('dataFim')
    });
    try {
        const res = await fetch(`${BASE_URL}/extrato?${params.toString()}`);
        const data = await res.json();
        document.getElementById('extrato-result').innerText = JSON.stringify(data, null, 2);
    } catch(err) {
        alert('Erro ao consultar extrato');
    }
});