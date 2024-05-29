type FieldError = {
  field?: string
  message?: string
}

export type ApiErrorResult = {
  error: string
  messages: FieldError[]
  statusCode: number
}

export type UpdateTokensResult = {
  accessToken: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type PasswordRecoveryRequest = {
  baseUrl: string
  email: string
  recaptcha: string
}

export type NewPasswordRequest = {
  password: string
  recoveryCode: string
}

export type LoginResponse = {
  accessToken: string
}

export type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}
