"use client";



export default function MenuAccount({ index, setIndex, navs }) {

    return (
        <div className="h-[64px] flex flex-row items-center justify-start">
            <div className="space-x-4 flex flex-row">
                {
                    navs.map((nav, n) => (
                        // transition-colors duration-200
                        <div key={n} onClick={() => setIndex(n)} className={`text-gray-600 border-b-[2px] ${index == n ? "border-gray-900 text-gray-700" : "border-white"}  hover:text-gray-700 cursor-pointer  py-1 px-2 pl-0 pb-[11px] space-x-2 flex flex-row items-center`}>
                            {nav.icon}
                            <span className="font-semibold text-[15px]">{nav.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}


