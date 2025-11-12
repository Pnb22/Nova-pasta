// Funções puras e utilitárias

export const criarElemento = (tag, props = {}, ...children) => {
  const el = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.substring(2).toLowerCase(), value);
    } else {
      el[key] = value;
    }
  });
  children.forEach(child =>
    typeof child === "string" ? el.appendChild(document.createTextNode(child)) : el.appendChild(child)
  );
  return el;
};

export const limparLista = lista => (lista.innerHTML = "");

export const mostrarMensagem = (msg, tipo = "info") => {
  const feedback = document.getElementById("feedback");
  feedback.textContent = msg;
  feedback.className = tipo;
};
