"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useClienteStore } from "@/context/cliente";
import { useState } from "react";


type inputs = {
  email: string;
  senha: string;
  manter: boolean;
};

export default function Login() {

  const { logaCliente } = useClienteStore()
  const { register, handleSubmit } = useForm<inputs>();
  const router = useRouter();

  async function verificaLogin(data: inputs) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/clientes/login`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: data.email, senha: data.senha }),
      }
    );

    if (response.status == 200) {
      const dados = await response.json();
      logaCliente(dados);

      if (data.manter) {
        localStorage.setItem("client_key", dados.id);
      } else {
        if (localStorage.getItem("client_key")) {
          localStorage.removeItem("client_key");
        }
      }

      router.push("/");
    } else {
      alert("Erro... Senha ou Login incorretos");
    }
  }

  function handleEsqueceuSenha() {
    router.push("/redefinir-senha/email");
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/fundo.jpeg")' }}
    >
      <section>
        <div className="flex flex-col items-center justify-center px-2 py-2 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <>
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Informe seus Dados de Acesso
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit(verificaLogin)}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        E-mail do Cliente:
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required
                        {...register("email")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Senha de Acesso
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        {...register("senha")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            {...register("manter")}
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="remember"
                            className="text-gray-500 dark:text-gray-300"
                          >
                            Manter Conectado
                          </label>
                        </div>
                      </div>
                      <a
                        onClick={handleEsqueceuSenha}
                        className="text-sm font-medium text-primary-600 hover:underline cursor-pointer dark:text-white"
                      >
                        Esqueceu sua Senha?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-gray-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Entrar
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Não está cadastrado?{" "}
                      <a
                        href="#"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Cadastre-se
                      </a>
                    </p>
                  </form>
                </>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
function logaCliente(dados: any) {
  throw new Error("Function not implemented.");
}

