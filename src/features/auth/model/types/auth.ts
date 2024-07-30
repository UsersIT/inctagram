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

export type recoveryCodeCheckRequest = {
  recoveryCode: string
}

export type NewPasswordRequest = {
  newPassword: string
  recoveryCode: string
}
