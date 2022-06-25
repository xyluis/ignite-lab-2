import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

import codeMockup from '../assets/code-mockup.png'

export function Subscribe (): JSX.Element {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [createSubscriber, { loading }] = useCreateSubscriberMutation()

  async function handleSubscribe (event: FormEvent) {
    event.preventDefault()

    if (name !== '' || email !== '') {
      await createSubscriber({
        variables: {
          name, 
          email
        }
      })
  
      navigate('/event')
    }
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat bg-center flex flex-col items-center">
      <div className="w-full lg:max-w-[1100px] flex lg:flex-row flex-col items-center lg:justify-between lg:gap-0 gap-8 mt-20 mx-auto">
        <div className="lg:max-w-[640px] max-w-[320px] flex flex-col lg:items-start items-center lg:text-start  text-center gap-2">
          <Logo />

          <h1 className="mt-8 lg:text-[2.5rem] text-[1.8rem] leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
          </h1>

          <p className="text-gray-200 leading-tight lg:text-base text-[0.8rem]">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>

        <div className="w-full p-8 bg-gray-700 border-t border-b lg:border lg:w-auto border-gray-500 rounded">
          <strong className="text-2xl mb-6 block">Increva-se gratuitamente</strong>
          
          <form action="" className="flex flex-col gap-2 w-full" onSubmit={handleSubscribe}>
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="text" 
              placeholder="Seu nome completo"
              onChange={event => setName(event.target.value)}
            />
            <input
              className="bg-gray-900 rounded px-5 h-14"
              type="email" 
              placeholder="Digite seu e-mail"
              onChange={event => setEmail(event.target.value)}
            />

            <button 
              type="submit"
              className="mt-4 bg-green-500 uppercase py-4 rounded font-bold hover:bg-green-700 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>

      <img src={codeMockup} draggable={false} className="mt-10" alt="Code Mockup" />
    </div>
  )
}