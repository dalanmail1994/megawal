
export default function Container({children, className, bg="bg-white", w="", p="p-[24px]", s="shadow-sm", b="border-[1px]", general=""}) {
  return (
    <div className={`${bg} ${s} rounded-xl ${p} ${b} ${w} border-gray-50 overflow-hidden ${general} ${className}`}>
      {children}
    </div>
  );
}


