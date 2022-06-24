import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom'
import cn from 'classnames'

interface LessonProps {
  title: string
  slug: string
  availableAt: Date
  type: 'live' | 'class'
}

export function Lesson ({ title, slug, availableAt, type }: LessonProps): JSX.Element {
  const { slug: urlSlug } = useParams<{ slug: string }>()

  const isLessonAvailable  = isPast(availableAt)
  const availableDateFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR
  })

  const isActiveLesson = urlSlug === slug

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">
        {availableDateFormatted}
      </span>

      <div 
        className={cn('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-50', {
          'bg-green-500': isActiveLesson
        })}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span className={cn('text-sm font-medium flex items-center gap-2', {
              'text-blue-500': !isActiveLesson,
              'text-white': isActiveLesson
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em Breve
            </span>
          )}

          <span className={cn('text-xs rounded py-[0.125rem] px-2 text-white border font-bold', {
            'border-green-300': !isActiveLesson,
            'border-white': isActiveLesson
          })}>
            {type === 'live' ? 'AO VIVO' : 'AULA PRATICA'}
          </span>
        </header>

        <strong className={cn('mt-5 block', {
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson
        })}>
          {title}
        </strong>
      </div>
    </Link>
  )
}