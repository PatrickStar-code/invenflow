import { IconArrowDown, IconArrowUp, IconMinus } from '@tabler/icons-react'
import React from 'react'

type cardDashboardProps = {
  title: string
  count: number
  percent: number
  icon: React.ReactNode
  status: 'Positive' | 'Negative' | 'Neutral'
  backgroundColor: string
}

export default function CardDashboard({
  title,
  count,
  percent,
  icon,
  status,
  backgroundColor,
}: cardDashboardProps) {
  return (
    <div className="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex flex-col space-y-2">
          <span className="text-gray-400">{title}</span>
          <span className="text-lg font-semibold">{count}</span>
        </div>
        <div
          className={'p-10 ' + backgroundColor + '  rounded-lg items-center'}
        >
          {icon}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="inline-block px-2 text-sm text-white bg-green-300 rounded">
            {percent}%
          </span>
          {status === 'Positive' && (
            <IconArrowUp
              className="text-green-500 h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
          )}
          {status === 'Negative' && (
            <IconArrowDown
              className="text-red-500 h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
          )}
          {status === 'Neutral' && (
            <IconMinus
              className="text-gray-500 h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </div>
  )
}
