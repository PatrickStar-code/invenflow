import { BarChart } from '@/app/components/barChart'
import CardDashboard from '@/app/components/cardDashboard'
import { TabelaCard } from '@/app/components/table'
import { IconUserBolt } from '@tabler/icons-react'

export type cardDashboardProps = {
  title: string
  count: number
  percent: number
  icon: React.ReactNode
  status: 'Positive' | 'Negative' | 'Neutral'
  backgroundColor: string
}

const produtosHeaders = ['Nome', 'Quantidade', 'Valor']
const produtosData: string[][] = [
  ['Produto 1', '5', 'R$ 10,00'],
  ['Produto 2', '3', 'R$ 15,00'],
]

const notificacoesHeaders = ['Data', 'Notificação']
const notificacoesData: string[][] = [
  ['10/10/2024', 'Produto 1 está com estoque baixo.'],
  ['09/10/2024', 'Produto 2 foi adicionado ao estoque.'],
]

const CardDashboardContent: cardDashboardProps[] = [
  {
    title: 'Estoque Total',
    count: 10,
    percent: 50,
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    status: 'Neutral',
    backgroundColor: 'bg-neutral-100 dark:bg-neutral-800',
  },
  {
    title: 'Produtos em Estoque Crítico',
    count: 10,
    percent: 50,
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    status: 'Neutral',
    backgroundColor: 'bg-neutral-100 dark:bg-neutral-800',
  },
  {
    title: 'Pedidos Recentes',
    count: 10,
    percent: 50,
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    status: 'Neutral',
    backgroundColor: 'bg-neutral-100 dark:bg-neutral-800',
  },
  {
    title: 'Total de usuários',
    count: 10,
    percent: 50,
    icon: (
      <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
    status: 'Neutral',
    backgroundColor: 'bg-neutral-100 dark:bg-neutral-800',
  },
]

export type ColumnsProps<T> = {
  title: string
  dataIndex: keyof T
  type: string
  formatToLocale?: boolean
}

export default function Dashboard() {
  return (
    <main className="flex-1 p-6 bg-white">
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        {CardDashboardContent.map((card) => (
          <CardDashboard
            key={card.title}
            title={card.title}
            count={card.count}
            percent={card.percent}
            icon={card.icon}
            status={card.status}
            backgroundColor={card.backgroundColor}
          />
        ))}
      </div>

      {/* Gráficos lado a lado */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mt-6">
        <div className="flex-1">
          <BarChart />
        </div>
        <div className="flex-1">
          <BarChart />
        </div>
      </div>

      <section className="flex mt-4 p-4">
        <div className="flex-1 mr-4">
          <TabelaCard
            title="Produtos com Pouco Estoque"
            headers={produtosHeaders}
            data={produtosData}
          />
        </div>
        <div className="flex-1">
          <TabelaCard
            title="Últimas Notificações"
            headers={notificacoesHeaders}
            data={notificacoesData}
          />
        </div>
      </section>
    </main>
  )
}
