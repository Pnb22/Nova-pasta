export class Cliente {
  constructor(nome, email, id = null) {
    this.nome = nome;
    this.email = email;
    this._id = id;
  }
}

export class ClienteService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async listar() {
    const res = await fetch(this.apiUrl);
    if (!res.ok) throw new Error("Erro ao listar clientes");
    const data = await res.json();
    return data.map(c => new Cliente(c.nome, c.email, c._id));
  }

  async cadastrar(cliente) {
    const res = await fetch(this.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cliente)
    });
    if (!res.ok) throw new Error("Erro ao cadastrar cliente");
  }

  async excluir(id) {
    const res = await fetch(`${this.apiUrl}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Erro ao excluir cliente");
  }
}
