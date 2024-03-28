import { FC, Fragment, ReactElement } from 'react'

const tagsRegex = /(<\d+>[^<>]*<\/\d+>)/
const openCloseTagRegex = /<(\d+)>([^<>]*)<\/(\d+)>/

type TransProps = {
  tags?: Record<string, (str: string) => ReactElement>
  text: string
}

const interpolateTags = (data: TransProps) => {
  const { tags, text } = data

  if (!tags) {
    return text
  }

  const tokens = text.split(tagsRegex)

  return tokens.map(token => {
    const matchResult = openCloseTagRegex.exec(token)

    if (!matchResult) {
      return token
    }

    const [, openTag, content, closeTag] = matchResult

    if (!openTag || !closeTag || openTag !== closeTag) {
      return token
    }

    return <Fragment key={content}>{tags[openTag]?.(content ?? '')}</Fragment>
  })
}

export const Trans: FC<TransProps> = props => {
  return <>{interpolateTags(props)}</>
}
