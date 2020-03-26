import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";
import logoHero from "../../assets/logo.svg";
import "./styles.css";

export default function NewIncidents() {
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  async function handlerCadastrarCaso(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      });
      alert("Caso cadastrado com sucesso.");
      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar o caso, tente novamente.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoHero} alt="logoHero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resover
            isso.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para a profile
          </Link>
        </section>

        <form onSubmit={handlerCadastrarCaso}>
          <input
            placeholder="Título do Caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
