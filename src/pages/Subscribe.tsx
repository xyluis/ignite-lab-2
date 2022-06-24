import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscriber ($name: String!, $email: String!) {
    createSubscriber(data: {name: $name, email: $email}) {
      id
    }
  }
`

export function Subscribe (): JSX.Element {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [createSubscriber, { loading }] = useMutation<{ id: string }>(CREATE_SUBSCRIBER_MUTATION)

  async function handleSubscribe (event: FormEvent) {
    event.preventDefault()


    await createSubscriber({
      variables: {
        name, 
        email
      }
    })

    navigate('/event')
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat bg-center flex flex-col items-center">
      <div className="w-full md:max-w-[1100px] flex md:flex-row flex-col items-center md:justify-between md:gap-0 gap-8 mt-20 mx-auto">
        <div className="md:max-w-[640px] max-w-[320px] flex flex-col md:items-start items-center md:text-start  text-center gap-2">
          <Logo />

          <h1 className="mt-8 md:text-[2.5rem] text-[1.8rem] leading-tight">
            Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
          </h1>

          <p className="text-gray-200 leading-tight md:text-base text-[0.8rem]">
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>

        <div className="w-full p-8 bg-gray-700 border-t border-b md:border md:w-auto border-gray-500 rounded">
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

      <img src="/src/assets/code-mockup.png" draggable={false} className="mt-10" alt="Code Mockup" />
    </div>
  )
}