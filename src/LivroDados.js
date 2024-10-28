import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ControleEditora from './controle/ControleEditora';
import ControleLivro from './controle/ControleLivros';

const LivroDados = () => {
  // a) Instanciar controladores de livros e editoras
  const controleLivro = new ControleLivro();
  const controleEditora = new ControleEditora();

  // b) Definir o vetor opcoes invocando o método getEditoras
  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  // c) Definir os estados para as propriedades
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0]?.value || 0);

  // d) Usar o Hook useNavigate para navegação
  const navigate = useNavigate();

  // e) Método tratarCombo para definir o código da editora selecionada
  const tratarCombo = (evento) => {
    setCodEditora(Number(evento.target.value));
  };

  // f) Método incluir para adicionar um novo livro
  const incluir = (evento) => {
    evento.preventDefault(); // Prevenir o comportamento padrão do formulário

    const novoLivro = {
      codigo: 0, // O código inicial é 0, será alterado pelo controlador
      titulo,
      resumo,
      autores: autores.split('\n'), // Separar os autores por linha
      codEditora,
    };

    controleLivro.incluir(novoLivro); // Incluir o livro no controlador
    navigate('/'); // Redirecionar para a listagem de livros
  };

  return (
    <main className="container mt-5">
      {/* g) Título da página */}
      <h1 className="mb-4">Cadastro de Livro</h1>

      {/* Formulário de cadastro */}
      <form onSubmit={incluir}>
        {/* Campo de Título */}
        <div className="mb-3">
          <label className="form-label">Título:</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        {/* Campo de Resumo */}
        <div className="mb-3">
          <label className="form-label">Resumo:</label>
          <textarea
            className="form-control"
            rows="3"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
            required
          />
        </div>

        {/* Campo de Autores */}
        <div className="mb-3">
          <label className="form-label">Autores (separados por linha):</label>
          <textarea
            className="form-control"
            rows="3"
            value={autores}
            onChange={(e) => setAutores(e.target.value)}
            required
          />
        </div>

        {/* h) Combo box para selecionar a editora */}
        <div className="mb-3">
          <label className="form-label">Editora:</label>
          <select
            className="form-select"
            value={codEditora}
            onChange={tratarCombo}
          >
            {opcoes.map((editora) => (
              <option key={editora.value} value={editora.value}>
                {editora.text}
              </option>
            ))}
          </select>
        </div>

        {/* Botão de submissão */}
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </form>
    </main>
  );
};

export default LivroDados;