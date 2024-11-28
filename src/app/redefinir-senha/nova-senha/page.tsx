"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { emailValido } from "../email/page";


type inputs = {
  confirmarSenha: string;
  senha: string;
};

export default function novaSenha() {

  const { register, handleSubmit } = useForm<inputs>();
  const router = useRouter();

  function validaSenha(senha: string) {
    let mensa: string = "";
  
    if (senha.length < 8) {
      mensa = "Erro... senha deve possuir, no mínimo, 8 caracteres";
      alert(mensa)
      return false;
    }
    
    let pequenas = 0;
    let grandes = 0;
    let numeros = 0;
    let simbolos = 0;
    
    for (const letra of senha) {
      if (/[a-z]/.test(letra)) {
        pequenas++;
      } else if (/[A-Z]/.test(letra)) {
        grandes++;
      } else if (/[0-9]/.test(letra)) {
        numeros++;
      } else {
        simbolos++;
      }
    }
  
    if (pequenas === 0 || grandes === 0 || numeros === 0 || simbolos === 0) {
      mensa = "Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos"
      alert(mensa)
      return false;
    }
    
    return true;
  }

  async function criaNovaSenha(data: inputs) {
    console.log(data.senha);
    console.log(data.confirmarSenha);

    if (!validaSenha(data.senha)){
      return
    }
        
    console.log(emailValido);
    

    const email = emailValido

    if (data.senha == data.confirmarSenha){
        
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_URL_API}/clientes/redefinir-senha/${email}`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({ senha: data.senha }),
              }
            );

            if (response.status == 201) {
              const dados = await response.json();
              console.log("Senha Alterada");
              
              router.push("/login");
              } else {
              alert("Erro na atualização da Senha.");
              }

    } else {
      alert("Insira a mesma senha nos dois campos.")
    } 



    // <>
    //     const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_URL_API}/clientes/verifica-email`, 
    //     {
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //         method: "POST",
    //         body: JSON.stringify({ email: data.email }),
    //     }
    //     );
    
        // if (response.status == 200) {
        // const dados = await response.json();
        // console.log("Email encontrado");

        // router.push("/redefinir-senha/codigo");
        // } else {
        // alert("Erro, e-mail não cadastrado.");
        // }
    // </>
  }

  function handleVoltarLogin(){
    router.push("/login")
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
                    Criar nova senha
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit(criaNovaSenha)}
                  >
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Nova senha:
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
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirme sua senha:
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        {...register("confirmarSenha")}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-gray-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Criar nova senha
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Lembrou a senha? volte para o{" "}
                      <a
                        onClick={handleVoltarLogin}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Login
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

