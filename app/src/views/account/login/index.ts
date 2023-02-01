import type { IUserInfo} from '@/typings'
export interface ILoginInfo {
    accessToken: string
    expires: number
    refreshToken?: string
    userInfo?: IUserInfo
}