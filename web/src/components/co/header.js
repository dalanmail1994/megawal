
import Link from "next/link";
import { CircleCheck, Menu } from "lucide-react"
import { useUser } from "@/context/UserContext";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { menuList } from "@/lib/general";
import Ico from "./Ico";
import { usePathname, useRouter } from "next/navigation";


export default function Header({}) {
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();
  
  
    // useEffect(() => {
    //     console.log(!pathname.includes('admin'))
    // }, [pathname])
  
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push('/login')
  }


  var navs = menuList.map((nav) => ({
      name: nav.name,
      icon: <Ico path={nav.icon} />,
      link:  nav.link
  }))
  if (user.user_type_id < 3) {
      navs.push(
          {
              name: 'Admin Panel',
              icon: <Ico path="/flags/ic-admin.svg" />,
              link:  "/admin"
          }
      )
  }

  return (
    <div className="h-[64px] bg-white px-[24px] flex flex-row items-center justify-between border-b border-dotted">
      <Sheet>
        <SheetTrigger className="xl:hidden">
          <div className="rounded-full flex items-center w-8 h-8 justify-center hover:bg-gray-200 transition-all duration-400 cursor-pointer">
            <Menu className="w-6" />
          </div>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px]">
          <SheetHeader className="space-y-5">
            <SheetTitle>
              <Link href="/">
                <img src="/flags/logo.svg" className="h-[40px] px-1" />
              </Link>
            </SheetTitle>


            <div className="flex flex-col space-y-1">
              <span className="text-xs text-gray-500 font-semibold px-3">MENU</span>
              <div className="flex flex-col space-y-1">
                {
                  navs.map((nav, n) => (
                      <SheetClose key={n} asChild>
                        <Link href={nav?.link} className={`${nav.link === pathname ? 'bg-blue-50 text-blue-600' : 'text-gray-500'} hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors duration-200 ${nav?.space ? nav.space : 'space-x-3'} py-3 px-3 rounded-md flex flex-row items-center`}>
                            {nav.icon}
                            <span className="font-semibold text-[15px]">{nav.name}</span>
                        </Link>
                      </SheetClose>
                  ))
                }
              </div>
            </div>
            {/* <div className="flex flex-col space-y-1">
              <span className="text-xs text-gray-500 font-semibold px-3">FAVORITE ASSETS</span>
              <div className="flex flex-col space-y-1">
                <Link key={n} href={nav?.link} className={`${nav.link === pathname ? 'bg-blue-50 text-blue-600' : 'text-gray-500'} hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition-colors duration-200 ${nav?.space ? nav.space : 'space-x-3'} py-3 px-3 rounded-md flex flex-row items-center`}>
                    {nav.icon}
                    <span className="font-semibold text-[15px]">{nav.name}</span>
                </Link>
              </div>
            </div> */}
          </SheetHeader>




          <SheetFooter>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-[48px] h-[48px] bg-gray-400 rounded-full flex items-center justify-center">
                <span className="font-semibold text-white text-[19px]">{user?.first_name.slice(0,1).toUpperCase()}{user?.last_name.slice(0,1).toUpperCase()}</span>
              </div>
              <div className="text-sm flex flex-col space-y-1 items-center font-medium">
                <span className="font-">{user?.first_name} {user?.last_name}</span>
                <span className="text-gray-600">{user?.email}</span>
              </div>
              <div className="flex flex-riw items-center space-x-2">
                <Button>
                    <span className="font-bold">My Account Info</span>
                </Button>
                <Button onClick={handleLogout} variant='outline' className="hover:bg-red-600 hover:text-white">
                    <span className="font-bold">Logout</span>
                </Button>
              </div>
            </div>
          </SheetFooter>

        </SheetContent>
      </Sheet>
      
      <Link href="/" className="hidden xl:flex">
        <img src="/flags/logo.svg" className="h-[40px]" />
      </Link>


      <div className="bg-white flex flex-row items-center space-x-4">

        <div className="border border-[#22c55e] h-[32px] flex flex-row items-center space-x-[5px] text-[#22c55e] rounded-md px-[14px]">
          <CircleCheck className="w-[19px]" />
          <span className="text-[14px] font-medium">Synced</span>
        </div>

        <div className="border-l-[1.5px] h-[40px]"></div>

        <img src="/flags/gb.webp" className="w-[26px] rounded-sm" />

        <Link href={'/account'} className="border-[2px] border-blue-200 flex items-center justify-center h-[40px] w-[40px] rounded-full">
          <div className="bg-[#22c55e] h-[34px] w-[34px] rounded-full flex items-center justify-center">
            <span className="text-xl font-semibold text-white">{user.first_name.slice(0,1).toUpperCase()}</span>
          </div>
        </Link>

      </div>
    </div>
  );
}


