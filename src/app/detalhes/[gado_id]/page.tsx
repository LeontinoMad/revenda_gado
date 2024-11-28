"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GadoI } from "@/utils/types/gados";
import { useClienteStore } from "@/context/cliente";
import { useForm } from "react-hook-form";
import CustomAlert from "@/components/CustomAlert"; // Ajuste o caminho conforme necessário

type Inputs = {
  descricao: string;
};

export default function Detalhes() {
  const params = useParams();
  const [gado, setGado] = useState<GadoI>();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { cliente } = useClienteStore();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/gados/${params.gado_id}`
      );
      const dados = await response.json();
      setGado(dados);
    }
    buscaDados();
  }, [params.gado_id]);

  async function enviaProposta(data: Inputs) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/propostas`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            clienteId: cliente.id,
            gadoId: Number(params.gado_id),
            descricao: data.descricao,
          }),
        }
      );

      console.log("Status da resposta:", response.status);

      if (response.status === 201) {
        setAlertMessage("Obrigado. Sua proposta foi enviada. Aguarde retorno.");
        setAlertType("success");
        setShowAlert(true);
        reset();
      } else {
        setAlertMessage("Erro... Não foi possível enviar sua proposta.");
        setAlertType("error");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Erro inesperado. Tente novamente mais tarde.");
      setAlertType("error");
      setShowAlert(true);
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/fundo.jpeg")' }}
    >
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
          type={alertType}
        />
      )}
      <section className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mx-auto">
        <img
          className="object-cover w-full h-96 md:h-auto md:w-2/4 rounded-t-lg md:rounded-none md:rounded-l-lg"
          src={gado?.foto}
          alt="Foto Gado."
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {gado?.tipo} {gado?.racas.nome}
          </h5>
          <p className="mb-3 font-bold text-gray-700 dark:text-gray-400 text-justify">
            {gado?.informacoes}
          </p>
          <h3 className="mb-3 font-normal text-gray-950 dark:text-gray-400">
            Preço: R${" "}
            {Number(gado?.preco).toLocaleString("pt-br", {
              minimumFractionDigits: 2,
            })}
          </h3>
          {cliente.id ? (
            <>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Gostou deste Animal? Faça uma Proposta!
              </h3>
              <form onSubmit={handleSubmit(enviaProposta)}>
                <input
                  type="text"
                  className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={`${cliente.nome} (${cliente.email})`}
                  disabled
                  readOnly
                />
                <textarea
                  id="message"
                  className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descreva a sua proposta"
                  required
                  {...register("descricao")}
                ></textarea>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Enviar Proposta
                </button>
              </form>
            </>
          ) : (
            <h3 className="text-xl font-bold tracking-tight text-orange-700 dark:text-white">
              <p>** Buenas!!</p>
              Faça login para fazer uma proposta para este animal.
            </h3>
          )}
        </div>
      </section>
    </main>
  );
}
