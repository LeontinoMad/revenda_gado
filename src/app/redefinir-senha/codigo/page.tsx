"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InsertCode from "./insertCode";

type inputs = {
  manter: boolean;
};

export default function VerificaOtp() {
  const { handleSubmit } = useForm<inputs>();
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(4).fill("")); 
  const [codigoCorreto, setCodigoCorreto] = useState<string>("");

  const gerarCodigoAleatorio = () => {
    const codigo = Math.floor(1000 + Math.random() * 9000).toString();
    return codigo;
  };

  useEffect(() => {
    const codigoGerado = gerarCodigoAleatorio();
    setCodigoCorreto(codigoGerado);
    console.log("Código gerado:", codigoGerado); 
  }, []);

  async function handleOtpSubmit() {
    const otpDigitado = otp.join(""); 
    console.log("Código correto:", codigoCorreto);
    console.log("OTP enviado:", otpDigitado);

    if (otpDigitado === codigoCorreto) {
      console.log("Parabéns, você acertou!");
      
      router.push("./nova-senha");
    } else {
      alert("Código inválido, tente novamente.");
    }
  }

  function handleVoltarLogin() {
    router.push("/login");
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/fundo.jpeg")' }}
    >
      <section>
        <div className="flex flex-col items-center justify-center px-2 py-2 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-center items-center flex-col p-6 space-y-4 md:space-y-6 sm:p-8">
              <>
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Verifique o código que foi enviado para o seu e-mail.
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit(handleOtpSubmit)} 
                >
                  <div>
                    <InsertCode setOtp={setOtp} /> 
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-gray-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Validar código
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
