import { Nav } from '@/components/Nav'
import { SwooshRule } from '@/components/SwooshRule'
import { ReadingProgress } from '@/components/motion/ReadingProgress'
import { Hero } from '@/sections/Hero'
import { QuemSomos } from '@/sections/QuemSomos'
import { Atuacao } from '@/sections/Atuacao'
import { Numeros } from '@/sections/Numeros'
import { Empreendimentos } from '@/sections/Empreendimentos'
import { Contato } from '@/sections/Contato'
import { Footer } from '@/sections/Footer'

/**
 * Ritmo de fundo: foto → papel → papel → VERMELHO → papel → VERMELHO → rodapé.
 * As duas faixas cheias ficam separadas por Empreendimentos, que é a seção mais
 * longa da página — juntas, pesariam.
 */
export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-brand-red focus:px-4 focus:py-2.5 focus:font-sans focus:text-[0.75rem] focus:uppercase focus:tracking-[0.16em] focus:text-white focus:shadow-glow"
      >
        Pular para o conteúdo
      </a>

      <ReadingProgress />
      <Nav />

      <main id="conteudo">
        <Hero />
        <SwooshRule className="pt-14 md:pt-20" />
        <QuemSomos />
        <Atuacao />
        <Numeros />
        <SwooshRule className="pt-16 md:pt-24" />
        <Empreendimentos />
        <Contato />
      </main>

      <Footer />
    </>
  )
}
