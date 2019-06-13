import { Persona } from './Persona';
import { Channel } from './Channel';

export class Content {
    uniqueId: string
    title: string
    sources: any[]
    type: string
    orderId: number
    points: number
    date: Date
    sfw: boolean
    channel: Channel
    persona: Persona
    //comments: any[]
}