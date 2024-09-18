export const USERNAME_PATTERN = /^[a-zA-Z0-9_-]*$/

export const PASSWORD_PATTERN =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~])[A-Za-z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/

export const EMAIL_PATTERN = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/

export const FIRSTNAME_AND_LASTNAME_PATTERN = /^[a-zA-Zа-яёЁА-Я-\s']+$/
