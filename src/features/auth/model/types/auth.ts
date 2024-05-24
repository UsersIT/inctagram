export type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

export type RegisterInput = {
  baseUrl?: string
  email: string
  password: string
  userName: string
}

export type RegistrationEmailResendingInput = {
  baseUrl?: string
  email: string
}
