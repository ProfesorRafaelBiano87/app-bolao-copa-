import { collection, addDoc, onSnapshot } 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let nomeUsuario = "";

window.entrar = function () {
  const nome = document.getElementById("name").value;
  if (!nome) return alert("Digite seu nome!");

  nomeUsuario = nome;
  document.getElementById("userBox").style.display = "none";
  document.getElementById("app").style.display = "block";

  carregarPalpites();
};

window.enviarPalpite = async function () {
  const brasil = document.getElementById("golsBrasil").value;
  const haiti = document.getElementById("golsHaiti").value;

  if (brasil === "" || haiti === "") {
    return alert("Preencha o placar!");
  }

  await addDoc(collection(window.db, "palpites"), {
    nome: nomeUsuario,
    brasil,
    haiti,
    data: new Date()
  });

  alert("Palpite enviado!");
};

function carregarPalpites() {
  onSnapshot(collection(window.db, "palpites"), (snapshot) => {
    let html = "";

    snapshot.forEach(doc => {
      const p = doc.data();
      html += `<p><b>${p.nome}</b>: Brasil ${p.brasil} x ${p.haiti} Haiti</p>`;
    });

    document.getElementById("lista").innerHTML = html;
  });
}
