import type { IUserInfo } from '@/typings'

export type ILoginParam = {
    username: string
    password: string
}

export type ILoginResponse = {
    refreshToken: string
    accessToken: string
    expires: number
    userInfo: IUserInfo
}

export type IProfileRequest = {

}
