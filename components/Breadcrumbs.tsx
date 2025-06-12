import { usePathname } from 'next/navigation'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Fragment } from 'react'

function Breadcrumbs() {
    const path = usePathname()

    const segments = path.split('/')

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    {segments
                        .filter((segment) => segment) // skip empty segments
                        .map((segment, index) => {
                            const href = '/' + segments
                                .filter((seg) => seg)
                                .slice(0, index + 1)
                                .join('/');
                            const isLast = index === segments.filter((seg) => seg).length - 1;
                            return (
                                <Fragment key={href}>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>{segment}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={href}>
                                                {segment.charAt(0).toUpperCase() + segment.slice(1)}
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </Fragment>
                            );
                        })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default Breadcrumbs
