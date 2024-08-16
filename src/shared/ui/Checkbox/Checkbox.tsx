import { FC, ReactNode } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'

import s from './Checkbox.module.scss'

import { CheckBoxSelectedIcon } from './checkBoxSelectedIcon'

export type CheckboxProps = {
  checked: boolean
  className?: string
  disabled?: boolean
  id?: string
  label?: ReactNode
  onChange: (checked: boolean) => void
  required?: boolean
}

export const CheckBox: FC<CheckboxProps> = ({
  checked,
  className,
  disabled,
  id,
  label,
  onChange,
  required = false,
}) => {
  const classNames = {
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
    container: clsx(s.container, className ? className : ''),
    indicator: s.indicator,
    label: clsx(s.label, disabled && s.disabled),
    root: clsx(s.root, disabled && s.disabled),
  }

  return (
    <div className={classNames.container}>
      <LabelRadix.Root className={classNames.label}>
        <div className={classNames.buttonWrapper}>
          <CheckboxRadix.Root
            checked={checked}
            className={classNames.root}
            disabled={disabled}
            id={id}
            onCheckedChange={onChange}
            required={required}
          >
            <AnimatePresence initial={false}>
              {checked && (
                <CheckboxRadix.Indicator asChild className={classNames.indicator} forceMount>
                  <motion.div
                    animate={'checked'}
                    exit={'unchecked'}
                    initial={'unchecked'}
                    variants={{
                      checked: { scale: 1 },
                      unchecked: { scale: 0.5 },
                    }}
                  >
                    <motion.div
                      variants={{
                        checked: {
                          opacity: 1,
                          strokeDashoffset: 0,
                          transition: { duration: 0.1 },
                        },
                        unchecked: {
                          opacity: 0,
                          transition: { duration: 0.1 },
                        },
                      }}
                    >
                      <CheckBoxSelectedIcon
                        color={disabled ? 'var(--color-light-100)' : 'var(--color-dark-900)'}
                      />
                    </motion.div>
                  </motion.div>
                </CheckboxRadix.Indicator>
              )}
            </AnimatePresence>
          </CheckboxRadix.Root>
        </div>
        {label}
      </LabelRadix.Root>
    </div>
  )
}
