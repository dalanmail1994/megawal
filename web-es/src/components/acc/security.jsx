import { useState } from "react";
import Container from "../co/container";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { formDataToObject } from "@/lib/utils";

export default function SecurityAcc({updateUser}) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    var obj = formDataToObject(formData);

    const funcRefresh = (bool) => {
      setLoading(bool)
      e.target.reset();
    }

    updateUser(obj, funcRefresh, [], '/user/reset-password')
  }
  
  
  
  return (
    <Container>
      <form className="flex flex-col space-y-4 items-end" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 w-full">
          <Inp name="current_password" title="Old Password" className='col-span-2' />
          <div></div>
          <Inp name="new_password" title="New Password" />
          <Inp name="new_password_confirmation" title="Confirm New Password" />
        </div>
        <Button type="submit" className='font-semibold' disabled={loading}>Reset Password</Button>
      </form>
    </Container>
  );
}





const Inp = ({title, name, loading, requierd='false'}) => {
    const [value, setValue] = useState('');




    return (
        <div className="flex flex-col space-y-0.5">
            <span className="text-sm font-medium text-gray-700">{title}</span>
            <Input name={name} type='password' value={value} onChange={(e) => setValue(e.target.value)} disabled={loading} requierd={requierd} />
        </div>
    )
}








