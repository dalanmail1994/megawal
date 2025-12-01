"use client"

import Container from "@/components/co/container";
import Ico from "@/components/co/Ico";




export default function YourAssets({ user, currencies, selectedCoin, setSelectedCoin=() => {}, isHome }) {

    return (
        <Container
            className={`${isHome ? '!border-0 !shadow-none !p-0' : ''}`}
        >
            <div className="flex flex-col font-medium]">
                <div className={`flex flex-col space-y-5 mb-5 ${isHome ? 'p-[24px] pb-0' : ''}`}>
                    <h2 className="font-semibold text-xl text-gray-900">Your Assets</h2>
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center">
                        <span className="text-3xl font-extrabold text-gray-800">{user?.main_coin?.symbole}{user?.balance}</span>
                        <span className="text-sm text-gray-500">Total Assets</span>
                        </div>
                    </div>
                </div>
                <hr />
                <div className={`flex flex-col ${isHome ? 'space-y-0' : 'mt-5 space-y-1'}`}>
                    {
                        !currencies && (
                            <span>Loading...</span>
                        )
                    }
                    {
                        currencies?.map((currency, c) => (
                            <ItemCoin key={c} currency={currency} symbole={user?.main_coin?.symbole || '&'} widHei={isHome ? '25px' : '30px'} isHome={isHome} selectedCoin={selectedCoin} setSelectedCoin={setSelectedCoin} amountCrypto={user?.balances?.[currency.iso]?.amount || "0.00"} amountUsd={`${user?.main_coin?.symbole}${user?.balances?.[currency.iso]?.usd_value || "0"}`} widthIco="37px" heightIco="37px" />
                        ))
                    }
                </div>
            </div>
        </Container>
    )


}



function ItemCoin({ currency, selectedCoin, setSelectedCoin, amountCrypto, amountUsd, widHei, isHome, symbole }) {

  return (
    <div onClick={() => setSelectedCoin(currency.iso)} className={`flex flex-row font-medium text-[15px] items-center space-x-4 hover:bg-blue-50 ${selectedCoin == currency.iso ? 'bg-blue-50' : ''} rounded-lg px-4 py-4 ${isHome ? '' : 'cursor-pointer'}`}>
      <div>
        <Ico path={currency.logo} width={widHei} height={widHei} />
      </div>
      <div className="flex-grow">
        <div className="flex-col">
          <h2>{currency.name}</h2>
          <span className="text-sm text-gray-400"><span className="text-[15px]">{symbole}{currency.usd_rate}</span></span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <h2>{amountCrypto}</h2>
        <span className="text-sm text-gray-400">{amountUsd}</span>
      </div>
    </div>
    );
}
