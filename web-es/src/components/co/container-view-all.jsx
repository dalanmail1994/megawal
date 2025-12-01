// src/components/co/container-view-all.jsx
import { Link } from 'react-router-dom'
import Container from './container'
import { ChevronRight } from 'lucide-react'

export default function ContainerViewAll({
  children,
  title,
  subTitle,
  pBody = 'p-[22px] pt-0',
  viewAll = true,
  href = '/',
  to, // אופציונלי: אם תעביר 'to', הוא ידרוס את href
}) {
  const linkTo = to ?? href ?? '/'

  return (
    <Container p="p-0">
      <div className="flex flex-col">
        <div className="flex flex-col p-[22px]">
          <h2 className="font-bold text-lg">{title}</h2>
          <span className="text-gray-400 text-sm font-medium">{subTitle}</span>
        </div>

        <div className={pBody}>{children}</div>

        {viewAll && (
          <div className="flex flex-col">
            <hr className="w-full relative border-t border-dotted border-gray-300" />
            <div className="flex justify-end p-4">
              <Link
                to={linkTo}
                className="flex flex-row items-center space-x-2 hover:bg-gray-100 transition-all duration-400 cursor-pointer rounded-sm"
              >
                <span className="text-[15px] font-semibold">View All</span>
                <ChevronRight className="w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}
