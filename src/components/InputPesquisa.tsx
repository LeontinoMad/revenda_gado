import React from "react";
import { GadoI } from "../utils/types/gados";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  termo: string;
};

type InputPesquisaProps = {
  setGados: React.Dispatch<React.SetStateAction<GadoI[]>>;
};

export function InputPesquisa({ setGados }: InputPesquisaProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  async function enviaPesquisa(data: Inputs) {
    if (data.termo.length < 2) {
      toast.warning("Digite no mínimo, 2 caractere.");
      reset({ termo: "" });
      return;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/gados/pesquisa/${data.termo}`
    );
    const dados = await response.json();
    if (dados.length == 0) {
      toast.error("Não há animais com o termo pesquisado");
      reset({ termo: "" });
      return;
    }

    setGados(dados);
  }

  async function mostraDestaques() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/gados`);
    const dados = await response.json();
    setGados(dados);
    reset({ termo: "" });
  }

  return (
    <section className="flex max-w-5xl mx-auto ">
      <form className="flex-1" onSubmit={handleSubmit(enviaPesquisa)}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className=" mt-8 relative">
          <div className="  absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Que gado procuras? (Tipo, raça ou preço máximo.)"
            required
            {...register("termo")}
          />
          <button
            type="submit"
            className="text-white text-lm absolute end-2.5 bottom-2.5 bg-gray-700 border hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Buscar
          </button>
        </div>
      </form>

      <button
        type="button"
        className="ms-3 mt-9 focus:outline-none text-lm text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900"
        onClick={mostraDestaques}
      >
        Animais em Destaque
      </button>
    </section>
  );
}
