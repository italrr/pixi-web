import { Persona } from './Persona';
import { Source } from './Source';

export class Channel {
    uniqueId: string
    name: string
    topic: string
    sfw: boolean
    private: boolean
    mods: Persona[]
    permissions: Persona[]
    source: Source[]
    lastOrderId: number
    date: Date
}