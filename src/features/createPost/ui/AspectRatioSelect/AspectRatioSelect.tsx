import React from 'react'

import { Expand, ImageIcon } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui'
import * as Select from '@radix-ui/react-select'

import s from './AspectRatioSelect.module.scss'

type Props = React.ComponentPropsWithoutRef<typeof Select.Root>

export const AspectRatioSelect = (props: Props) => {
  const { t } = useTranslation()

  return (
    <Select.Root {...props}>
      <Select.Trigger className={s.trigger}>
        <Select.Icon aria-label={t.buttons.aspectRatioSelect} title={t.buttons.aspectRatioSelect}>
          <Expand />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={s.content} position={'popper'} side={'top'} sideOffset={2}>
          <Select.Viewport className={s.viewport}>
            <Select.Item className={s.item} value={'original'}>
              <Select.ItemText asChild>
                <Typography as={'span'} variant={'regular-text-16'}>
                  {t.pages.create.original}
                </Typography>
              </Select.ItemText>
              <ImageIcon aria-hidden height={24} width={24} />
            </Select.Item>
            <Select.Item className={s.item} value={'1:1'}>
              <Select.ItemText asChild>
                <Typography as={'span'} variant={'regular-text-16'}>
                  1:1
                </Typography>
              </Select.ItemText>
              <span aria-hidden className={s['indicator-1-1']} />
            </Select.Item>
            <Select.Item className={s.item} value={'4:5'}>
              <Select.ItemText asChild>
                <Typography as={'span'} variant={'regular-text-16'}>
                  4:5
                </Typography>
              </Select.ItemText>
              <span aria-hidden className={s['indicator-4-5']} />
            </Select.Item>
            <Select.Item className={s.item} value={'16:9'}>
              <Select.ItemText asChild>
                <Typography as={'span'} variant={'regular-text-16'}>
                  16:9
                </Typography>
              </Select.ItemText>
              <span aria-hidden className={s['indicator-16-9']} />
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
