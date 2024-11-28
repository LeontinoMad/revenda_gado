import React, { useRef, useState, useEffect } from "react";

interface InsertCodeProps {
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function InsertCode({ setOtp }: InsertCodeProps) {
  const [otp, setLocalOtp] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setOtp(otp);
  }, [otp, setOtp]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const index = inputRefs.current.indexOf(e.target);

    if (value) {
      setLocalOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value; // Atualiza o valor do input atual
        return newOtp;
      });
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus(); // Foca no próximo input
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select(); // Seleciona o conteúdo do input
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");

    if (!new RegExp(`^[0-9]{${otp.length}}$`).test(text)) {
      return; // Apenas permite colar números válidos
    }

    const digits = text.split("");
    setLocalOtp(digits); // Define os dígitos colados
  };

  const limparCampos = () => {
    setLocalOtp(Array(4).fill("")); // Limpa todos os campos do OTP
  };

  return (
    <section className="py-10">
      <div className="container flex items-center flex-col">
        <form id="otp-form" className="flex gap-2">
          {otp.map((digit, index) => {
            const inputRef = (el: HTMLInputElement | null) => {
              inputRefs.current[index] = el;
            };

            return (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={handleInput}
                onFocus={handleFocus}
                onPaste={handlePaste}
                ref={inputRef}
                className="shadow-xs flex w-[64px] items-center justify-center rounded-lg border border-stroke bg-white p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl dark:border-dark-3 dark:bg-white/5"
              />
            );
          })}
        </form>
        <p
          onClick={limparCampos}
          className="text-sm font-light text-gray-500 dark:text-gray-400 cursor-pointer hover:underline mt-2"
        >
          Clique aqui para limpar os campos
        </p>
      </div>
    </section>
  );
}
