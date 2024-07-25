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

export type LoginResponse = {
  accessToken: string
}

export type MeResponse = {
  email: string
  isBlocked: boolean
  userId: number
  userName: string
}

export type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type AddAvatarResponse = {
  avatar: Avatar | null
}

export type GetProfileResponse = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
}
