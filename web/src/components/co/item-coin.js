import Ico from "./Ico";


export default function ItemCoin({ iso, title, amountCrypto, amountUsd, ico="/coins/btc.svg", hover="hover:bg-gray-200", widthIco="25px", heightIco="25px"  }) {
    return (
    <div className={`flex flex-row font-medium text-[15px] items-center space-x-4 ${hover} px-4 py-2 cursor-pointer`}>
      <div>
        <Ico path={ico} width={widthIco} height={heightIco} />
      </div>
      <div className="flex-grow">
        <div className="flex-col">
          <h2>{title}</h2>
          <span className="text-sm text-gray-400">{iso}</span>
        </div>
      </div>
      <div className="flex-col">
        <h2>{amountCrypto}</h2>
        <span className="text-sm text-gray-400">{amountUsd}</span>
      </div>
    </div>
    );
  }
  
  
  