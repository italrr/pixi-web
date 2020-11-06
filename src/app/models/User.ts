import { Persona } from './Persona';

export class User {
    uniqueId: string
    email: string
    emailConfirmed: boolean
    password: string
    level: number
    banned: boolean
    date: Date
    personas: Persona[]
}