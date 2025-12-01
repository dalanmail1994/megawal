import { use, useEffect, useState } from "react";
import Container from "../co/container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { formDataToObject } from "@/lib/utils";
import { cn } from "@/lib/utils"
import { useInfo } from "@/context/InfoContext";
import { useUser } from "@/context/UserContext";
import CountrySelect from "../ui/selectCountry";


export default function GeneralAcc({updateUser}) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false)
  const { getCurrencies } = useInfo()
  const [selectedCountry, setSelectedCountry] = useState(user?.iso)


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    var obj = formDataToObject(formData);
    const fieldNames = [...formData.keys(),  'iso', 'main_coin'];

    const funcRefresh = (bool) => {
      getCurrencies()
      setLoading(bool)
    }


    updateUser({...obj, 'iso': selectedCountry}, funcRefresh, fieldNames)
  }



  return (
    <div className="flex flex-col space-y-6">
      <Container>
        <form className="flex flex-col space-y-4 items-end" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 w-full">
            <Inp user={user} loading={loading} title="First Name" name="first_name" requierd={'true'} />
            <Inp user={user} loading={loading} title="Last Name" name="last_name" requierd={'true'} />
            <Inp user={user} loading={loading} title="Email Address" name="email" requierd={'true'} />
            <Inp user={user} loading={loading} title="Address" name="address" />
            {/* <Inp user={user} loading={loading} title="Country" name="country" /> */}


            <div className="flex flex-col space-y-0.5">
              <span className="text-sm font-medium text-gray-700">Country</span>
              <CountrySelect selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
              {/* <Input name={name} value={value} onChange={(e) => setValue(e.target.value)} disabled={loading} requierd={requierd} /> */}
            </div>

            <Inp user={user} loading={loading} title="City" name="city" />
            <Inp user={user} loading={loading} title="Postal Code" name="postal_code" />
            <Inp user={user} loading={loading} title="Date Of Birth" name="birthday" />
            <Sel user={user} loading={loading} title="Main Coin" name="main_coin_id" 
                opts={[
                    {value: '1', title: 'USD'},
                    {value: '2', title: 'EUR'},
                ]}
            />
          </div>
          <Button type={'submit'} className='font-semibold' disabled={loading}>Save Changes</Button>
        </form>
      </Container>
    </div>
  );
}




const Inp = ({user, title, name, loading, requierd='false'}) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        if (user) {
            setValue(user?.[name] || '')
        }
    }, [user])


    return (
      <div className="flex flex-col space-y-0.5">
          <span className="text-sm font-medium text-gray-700">{title}</span>
          <Input name={name} value={value} onChange={(e) => setValue(e.target.value)} disabled={loading} requierd={requierd} />
      </div>
    )
}


const Sel = ({user, title, name, loading, opts}) => {
    const [value, setValue] = useState(4);

    useEffect(() => {
        if (user) {
            setValue(user?.[name])
        }
    }, [user])
    

    return (
        <div className="flex flex-col space-y-0.5">
            <span className="text-sm font-medium text-gray-700">{title}</span>
            <select name={name} value={value} onChange={(e) => setValue(e.target.value)} disabled={loading}
              className={cn(
                  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              )}
            >
              {
                opts?.map((opt, o) => (
                    <option key={o} value={opt.value}>{opt.title}</option>
                ))
              }
          </select>
        </div>
    )
}