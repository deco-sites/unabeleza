interface Props {
    text: string
}

export default function Teste({ text }: Props) {
    return(
        <div className="text-zinc-300 mt-5">
            <h1>{text}</h1>
        </div>
    )
}