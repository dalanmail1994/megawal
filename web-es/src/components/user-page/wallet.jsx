import Container from "../co/container";
import Ico from "../co/Ico";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { formDataToObject } from "@/lib/utils";
import { getRequest, putRequest } from "@/lib/api";
import { toast } from "sonner"


export default function WalletPage ({userId, user}) {
    const [currencies, setCurrencies] = useState(null);
  
    const handleData = async () => {
      try {
          const res = await getRequest(`/currencies/${userId}`);
          // console.log("currencies:", res)
          setCurrencies(res)
      } catch (err) {
          setCurrencies([])
      } finally {
          
      }
    }
    
    useEffect(() => {
      handleData()
    }, [])





    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold">Wallets</h2>
            <Container>
            <div className="flex flex-col space-y-5 font-medium">
                <h2 className="font-semibold text-xl text-gray-900">User Assets</h2>
                <div className="flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <span className="text-3xl font-extrabold text-gray-800">{user?.main_coin?.symbole}{user?.balance || 0}</span>
                    <span className="text-sm text-gray-500">Total Assets</span>
                </div>
                </div>
                <hr />

                {
                  !currencies && (
                    <span>Loading...</span>
                  )
                }

                {
                  currencies?.map((currency, c) => (
                      <ItemCoin key={c} userId={userId} currency={currency} amountCrypto={user?.balances?.[currency.iso]?.amount || "0.00"} amountUsd={`${user?.main_coin?.symbole || '$'}${user?.balances?.[currency.iso]?.usd_value || "0"}`} hover="hover:bg-blue-50 rounded-lg" widthIco="37px" heightIco="37px" />
                  ))
                }
            </div>
            </Container>
        </div>
    )
}



function ItemCoin({ currency, amountCrypto, amountUsd, hover="hover:bg-gray-200", widthIco="25px", heightIco="25px", userId  }) {
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)


  const updateWallet = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const obj = formDataToObject(formData);

    try {
      const res = await putRequest(`/users/${userId}/wallet`, {
        ...obj,
        currency_iso: currency.iso
      });
      toast.success(res.message)
      setIsEdit(false)
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={`flex flex-row font-medium text-[15px] items-center space-x-4 ${hover} px-4 py-2`}>
      <div>
        <Ico path={currency.logo} width={widthIco} height={heightIco} />
      </div>
      <div className="flex-grow">
        <div className="flex-col">
          <h2>{currency.name}</h2>
          <span className="text-sm text-gray-400">
            <span className="text-[15px]">${currency?.usd_rate || 0}</span>
          </span>
        </div>
      </div>

      
      <form className="flex flex-row space-x-3" onSubmit={updateWallet}>
        <Input name="public_key" defaultValue={currency?.wallet?.public_key} disabled={!isEdit} />
        {
          !isEdit ? (
            <Button
              variant="blue"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEdit(true);
              }}
            >
              <span className="font-semibold">Edit Wallet</span>
            </Button>
          ) : (
            <Button type="submit" disabled={loading}>
                <span className="font-semibold">Update Wallet</span>
            </Button>
          )
        }
        <div className="flex flex-col items-end min-w-[80px]">
            <h2>{amountCrypto}</h2>
            <span className="text-sm text-gray-400">{amountUsd}</span>
        </div>
      </form>
    </div>
  );
}
  
  