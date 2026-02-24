const formularioLogin = document.getElementById("formLogin");

formularioLogin.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const campoNumeroConta = document.getElementById("numeroConta"); // adiciona este input no HTML
    const numeroConta = campoNumeroConta.value.trim();

    const campoPin = document.getElementById("PIN");
    const pin = campoPin.value.trim();

    if (!numeroConta || !pin) {
        alert("Digite número da conta e PIN");
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3000/atm/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                numeroConta: numeroConta,
                pin: pin
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            alert(dados.erro || dados.mensagem);
            return;
        }

        // Guardar token
        localStorage.setItem("tokenAppBank", dados.token);

        alert("Login realizado com sucesso!");

        // Redirecionar para painel
        window.location.href = "/pages/Atm.html";

    } catch (erro) {
        console.error("Erro:", erro);
        alert("Erro ao conectar ao servidor");
    }
});