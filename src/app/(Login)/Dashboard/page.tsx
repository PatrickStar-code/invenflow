import { BarChart } from '@/app/components/barChart'
import CardDashboard from '@/app/components/cardDashboard'
import { TabelaCard } from '@/app/components/table'
import { IconUserBolt } from '@tabler/icons-react'

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

export default function Dashboard() {
  return (
    <main className="flex-1 p-6 bg-white">
      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardDashboard
          title="Estoque Total"
          count={10}
          percent={50}
          icon={
            <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          }
          status="Neutral"
          backgroundColor="bg-neutral-100 dark:bg-neutral-800"
        />
        <CardDashboard
          title="Produtos em Estoque Crítico"
          count={10}
          percent={50}
          icon={
            <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          }
          status="Neutral"
          backgroundColor="bg-neutral-100 dark:bg-neutral-800"
        />
        <CardDashboard
          title="Pedidos Recentes"
          count={10}
          percent={50}
          icon={
            <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          }
          status="Neutral"
          backgroundColor="bg-neutral-100 dark:bg-neutral-800"
        />
        <CardDashboard
          title="Total de usuários"
          count={10}
          percent={50}
          icon={
            <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          }
          status="Neutral"
          backgroundColor="bg-neutral-100 dark:bg-neutral-800"
        />
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
