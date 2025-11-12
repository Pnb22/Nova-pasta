import { Cliente, ClienteService } from "./classes.js";
import { criarElemento, limparLista, mostrarMensagem } from "./utils.js";

const API_URL = "https://crudcrud.com/api/6f4d8b94fa1c49a1b056aa408205ee42/clientes";
const service = new ClienteService(API_URL);

// Seletores
const form = document.getElementById("clienteForm");
const lista = document.getElementById("clientesList");

// Função principal para renderizar a lista
async function renderClientes() {
  try {
    const clientes = await service.listar();
    limparLista(lista);

    clientes.map(cliente => {
      const li = criarElemento(
        "li",
        {},
        `${cliente.nome} - ${cliente.email}`,
        criarElemento("button", {
          textContent: "Excluir",
          className: "delete-btn",
          onclick: () => excluirCliente(cliente._id)
        })
      );
      lista.appendChild(li);
    });
  } catch (err) {
    mostrarMensagem("Erro ao carregar clientes.", "error");
    console.error(err);
  }
}

// Função de cadastro
form.addEventListener("submit", async e => {
  e.preventDefault();

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();

  if (!nome || !email) {
    mostrarMensagem("Preencha todos os campos!", "error");
    return;
  }

  try {
    const novoCliente = new Cliente(nome, email);
    await service.cadastrar(novoCliente);
    form.reset();
    mostrarMensagem("Cliente cadastrado com sucesso!", "success");
    renderClientes();
  } catch (err) {
    mostrarMensagem("Erro ao cadastrar cliente.", "error");
    console.error(err);
  }
});

// Função de exclusão
async function excluirCliente(id) {
  try {
    await service.excluir(id);
    mostrarMensagem("Cliente excluído!", "success");
    renderClientes();
  } catch (err) {
    mostrarMensagem("Erro ao excluir cliente.", "error");
    console.error(err);
  }
}

// Inicialização
renderClientes();
