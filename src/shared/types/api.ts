export type UpdateTokensResult = {
  accessToken: string
}

type FieldError = {
  field?: string
  message?: string
}

export type ApiErrorResult = {
  error: string
  messages: FieldError[]
  statusCode: number
}
