export type Svg = {
    id: number;
    name: string;
    path?: string;
    href?: string;
}

const DisplaySvgs = ({ svgs, className, divClassName }: { svgs : Array<Svg>, className?: string, divClassName?: string }) => {
    return (
        <div className={`flex items-center gap-3 flex-wrap ${divClassName}`}>
        {svgs?.map((svg, index) => (
            <a
            key={index}
            className={`w-10 h-10 rounded-md p-2 flex justify-center items-center cursor-pointer pointer-events-auto ${className}`}
            title={svg.name}
            href={svg.href}
            target="_blank"
            rel="noopener noreferrer"
            >
                <img src={svg.path} alt="" className="w-full h-full" />
            </a>
        ))}
        </div>
    )
}

export default DisplaySvgs;