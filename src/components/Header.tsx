"use client";
import Link from "next/link";
import { useClienteStore } from "@/context/cliente";
import { useRouter } from "next/navigation";

export function Header() {
  const { cliente, deslogaCliente } = useClienteStore();
  const router = useRouter();

  function sairCliente() {
    deslogaCliente();
    // remove de localStorage o id do cliente logado (se ele indicou salvar no login)
    if (localStorage.getItem("client_key")) {
      localStorage.removeItem("client_key");
    }
    router.push("/login");
  }

  return (
    <nav className="bg-gray-600 border-gray-200">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse  ml-20"
        >
          <img src="/gado.webp" className="h-16" alt="Logo" />
          <span className="mr-11 text-4xl font-bold text-black whitespace-nowrap ">
            Revenda de Gado Biduca
          </span>
        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse mr-24">
          {cliente.id ? (
            <>
              <span className="text-gray-950 ">{cliente.nome}</span>
              <Link
                href="/propostas"
                className="font-bold text-gray-950 dark:text-gray-200 hover:underline"
              >
                Minhas Propostas
              </Link>
              <span
                className="cursor-pointer font-bold text-gray-200 dark:text-gray-200 hover:underline"
                onClick={sairCliente}
              >
                Sair
              </span>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="font-bold text-xl text-gray-200 dark:text-gray-950 hover:underline"
              >
                Entrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
