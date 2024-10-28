/** @title {{titulo}} */
interface PoliticasProps {
    titulo: string,
    subtitulo?: string,
    paragrafos?: string[],
    lista?: string[],
    lista_numerada?: string[],
    links?: Link[],
}

interface Link {
    rota?: string,
    etiqueta?: string
}

export default function Politicas({
    titulo, subtitulo, paragrafos, lista, lista_numerada, links
}: PoliticasProps) {
    return (
        <div className="mt-[100px] pl-[333px]">
            <section>
                <div className="font-[PP-Hatton] text-[32px] mt-12 font-bold">
                    <h1 className="text-slate-950">{titulo}</h1>
                </div>
                <div className="font-[Montserrat] text-[16px] pt-5 pb-5 font-bold">
                    <h2>{subtitulo}</h2>
                </div>    
                <div className="font-[Montserrat] text-[16px]">
                    {paragrafos && paragrafos.map((paragrafo, index) => (
                          <p key={index}>{paragrafo}</p>
                    ))
                    }
                    {lista && lista.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                    }
                    {lista_numerada && lista_numerada.map((item, index) => (
                        <ol key={index}>{item}</ol>
                    ))
                    }
                    {links && links.map(({ rota, etiqueta },  index ) => (
                        <a className="text-[#8F2AED]" key={index} href={rota}>{etiqueta}</a>
                    ))
                    }
                </div>
            </section>
        </div>
    )
}