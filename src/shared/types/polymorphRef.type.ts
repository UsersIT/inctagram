import { ElementRef, ElementType, Ref } from 'react'

export type PolymorphRef<T extends ElementType> = {
  ref?: Ref<ElementRef<T>>
}
