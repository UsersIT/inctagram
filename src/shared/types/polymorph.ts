import { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType } from 'react'

export type AsPolymorphProp<T extends ElementType> = {
  as?: T
}

export type PolymorphProps<T extends ElementType, ElementProps = {}> = AsPolymorphProp<T> &
  ElementProps &
  Omit<ComponentPropsWithoutRef<T>, keyof (ElementProps & AsPolymorphProp<T>)>

export type PolymorphRef<T extends ElementType> = ComponentPropsWithRef<T>['ref']

export type PolymorphPropRef<T extends ElementType> = { ref?: PolymorphRef<T> }

export type PolymorphPropsWithRef<T extends ElementType, ElementProps = {}> = PolymorphProps<
  T,
  ElementProps
> &
  PolymorphPropRef<T>
