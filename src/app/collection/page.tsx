import { CollectionItems} from '@/core/pages/collections'
import { BreadcrumbWithCustomSeparator } from '@/core/pages/collections/bread-crumbs'

function BreadcrumbComp() {
  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <CollectionItems />
    </div>
  )
}

export default BreadcrumbComp
