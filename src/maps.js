import { ErrorType } from './enums'

export const errorListMap = {
  [ErrorType.userNotFoud]: 'Пользователя с таким email не существует',
  [ErrorType.invalidEmail]: 'Email указан не верно',
  [ErrorType.wrongPassword]: 'Пароль указан не верно',
  [ErrorType.weakPassword]: 'Пароль должен содержать не менее 6 символов'
}
