import { Document } from 'mongoose'

declare namespace AdminModel {
    interface IAdminPassword {
        name: string
        email: string
        phone: string
    }
    interface IAdmin extends Document {
        _id: string
        name: string
        email: string
        phone: string
        sault: string
        password: IAdminPassword
        nickname: string
        head: string
        create_date: string
    }
    interface IAdminInfo {
        _id: string
        name: string
        email: string
        phone: string
        nickname: string
        head: string
    }
}