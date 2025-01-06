const Arrows = ({onClickLeft, onClickRight}:{onClickLeft: React.MouseEventHandler<SVGSVGElement>, onClickRight: React.MouseEventHandler<SVGSVGElement>}) => {
    return (
        <>
        <svg
                          onClick={onClickLeft}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                          />
                        </svg>
              
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-10 h-10 pointer-events-auto hover:opacity-60 transition-opacity cursor-pointer"
                          onClick={onClickRight}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                          />
                        </svg>
        </>)
}

export default Arrows;