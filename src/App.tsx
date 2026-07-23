import { Nav } from '@/components/Nav'
import { SwooshRule } from '@/components/SwooshRule'
import { Hero } from '@/sections/Hero'
import { QuemSomos } from '@/sections/QuemSomos'
import { Numeros } from '@/sections/Numeros'
import { Empreendimentos } from '@/sections/Empreendimentos'
import { Contato } from '@/sections/Contato'
import { Footer } from '@/sections/Footer'

export default function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-brand-red focus:px-4 focus:py-2 focus:font-sans focus:text-[0.75rem] focus:uppercase focus:tracking-[0.16em] focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Nav />

      <main id="conteudo">
        <Hero />
        <SwooshRule className="pt-14 md:pt-20" />
        <QuemSomos />
        <Numeros />
        <SwooshRule className="pt-16 md:pt-24" />
        <Empreendimentos />
        <Contato />
      </main>

      <Footer />
    </>
  )
}
