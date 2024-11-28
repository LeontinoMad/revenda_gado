"use client";

import { InputPesquisa } from "../components/InputPesquisa";
import { ItemGados } from "../components/ItemGados";
import { GadoI } from "../utils/types/gados";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { useClienteStore } from "@/context/cliente";

export default function Home() {
  const [gados, setGados] = useState<GadoI[]>([]);
  const { logaCliente } = useClienteStore();

  useEffect(() => {
    console.log("Use Effect Funcionando");
    async function buscaCliente(idCliente: string) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`
      );
      if (response.status == 200) {
        const dados = await response.json();
        logaCliente(dados);
      }
    }

    if (localStorage.getItem("client_key")) {
      const idClienteLocal = localStorage.getItem("client_key") as string;
      buscaCliente(idClienteLocal);
    }

    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/gados`);
      console.log(response);
      const dados = await response.json();
      console.log("Busca Dados Funcionando");
      setGados(dados);
    }
    buscaDados();
  }, []);

  const listaGado = gados.map((gado) => (
    <ItemGados data={gado} key={gado.id} />
  ));

  return (
    <main
      className="bg-cover bg-center bg-no-repeat p-12 "
      style={{ backgroundImage: 'url("./fundo.jpeg")' }}
    >
      <InputPesquisa setGados={setGados} />

      <section className="max-w-screen-xl mx-auto w-full px-4 ">
        {" "}
        {/* Adicionando padding horizontal */}
        <h1 className="mb-10 mt-6 text-center text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-gray-900">
          Animais{"  "}
          <span className="underline underline-offset-3 decoration-8 decoration-gray-800 dark:decoration-gray-600">
            em destaque
          </span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaGado}
        </div>
      </section>

      <Toaster position="top-right" richColors />
    </main>
  );
}
