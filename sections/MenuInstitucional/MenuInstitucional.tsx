interface Menu {
    titulo_institucional?: string,
    titulo_suporte?: string,
    links_institucionais?: Link[],
    links_ajudas?: Link[]
}

interface Link {
    rota?: string,
    etiqueta?: string 
}

export default function MenuInstitucional({ titulo_institucional, titulo_suporte, links_institucionais, links_ajudas }: Menu) {

    return(
        <div className="absolute top-[280px] left-[80px] list-none bg-[#FAFAFA] py-[40px] pl-[40px] pr-[49px]">
            <h3 className="text-slate-950 text-[16px] font-bold mb-[20px]">{titulo_institucional}</h3>
            <div>
            {links_institucionais && links_institucionais.map(({ rota, etiqueta }, index) => (
                <li className="text-slate-950 text-[12px] font-regular hover:text-[#8F2AED] cursor-pointer" key={index}><a href={rota}>{etiqueta}</a></li>
            ))
            }
            </div>

            <hr className="border-t-1 border-[#F1F1F1] my-5"/>
            
            <h3 className="text-slate-950 text-[16px] font-bold mb-[20px]">{titulo_suporte}</h3>
            <div>
            {links_ajudas && links_ajudas.map(({ rota, etiqueta }, index) => (
                <li className="text-slate-950 text-[12px] font-regular hover:text-[#8F2AED]" key={index}><a href={rota}>{etiqueta}</a></li>
            ))
            }
            </div>
        </div>
    )
}