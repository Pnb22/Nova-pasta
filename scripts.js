const API_URL = "https://crudcrud.com/api/6f4d8b94fa1c49a1b056aa408205ee42";

// Seletores
const clienteForm = document.getElementById("clienteForm");
const clientesList = document.getElementById("clientesList");

// Função para listar clientes
async function listarClientes() {
  try {
    const response = await fetch(API_URL);
    const clientes = await response.json();

    clientesList.innerHTML = "";
    clientes.forEach(cliente => {
      const li = document.createElement("li");
      li.textContent = `${cliente.nome} - ${cliente.email}`;

      const btnDelete = document.createElement("button");
      btnDelete.textContent = "Excluir";
      btnDelete.addEventListener("click", () => excluirCliente(cliente._id));

      li.appendChild(btnDelete);
      clientesList.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
  }
}

// Função para cadastrar cliente
clienteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email }),
    });

    if (response.ok) {
      clienteForm.reset();
      listarClientes(); // Atualiza a lista
    } else {
      console.error("Erro ao cadastrar cliente");
    }
  } catch (error) {
    console.error("Erro de rede ao cadastrar cliente:", error);
  }
});

// Função para excluir cliente
async function excluirCliente(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (response.ok) {
      listarClientes();
    } else {
      console.error("Erro ao excluir cliente");
    }
  } catch (error) {
    console.error("Erro de rede ao excluir cliente:", error);
  }
}

// Carregar a lista de clientes ao abrir a página
listarClientes();
