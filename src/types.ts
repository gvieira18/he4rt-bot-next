import {
  APIEmbedField,
  CacheType,
  Client,
  Collection,
  CommandInteraction,
  CommandInteractionOption,
  ForumChannel,
  HexColorString,
  NewsChannel,
  REST,
  RestOrArray,
  SlashCommandBuilder,
  TextChannel,
  User,
  VoiceChannel,
} from 'discord.js'
import { ClientBuilder } from 'uncreate'
import { Logger } from './client/logger'
import { Ticker } from './client/ticker'

export type Maybe<T> = T | undefined | null
export type RESTJson<T extends string | number | symbol = string, K = any> = Record<T, K>
export type CommandGetOption<T extends CacheType = CacheType> = (
  interaction: CommandInteraction,
  target: string
) => CommandInteractionOption<T>

export type WebhookEvent = NewsChannel | TextChannel | VoiceChannel | ForumChannel

export type CommandCallback = (interaction: CommandInteraction, client: He4rtClient) => Promise<void>
export type CommandSet = SlashCommandBuilder | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>
export type Command = [CommandSet, CommandCallback]

export type TickerCallback = () => void | Promise<void>
export type TickerItem = [TickerName, TickerCallback]
export enum TickerName {
  Pomodoro = 'COWORKING_POMODORO',
  DiscordPresence = 'DISCORD_PRESENCE',
}

export type He4rtClient = Client<boolean> & {
  commands: Collection<CommandSet, CommandCallback>
  ticker: Ticker
  logger: Logger
  api: {
    he4rt: ClientBuilder
    apoiase: ClientBuilder
  }
}

export interface LoggerEmitOptions {
  message: string
  type: 'bot' | 'http' | 'apoiase' | 'command' | 'event' | 'role' | 'discord' | 'he4rt-api' | 'ticket'
  color: 'success' | 'info' | 'warning' | 'error'
  user?: User
}

export interface RoleDefine {
  id: string
  name: string
  emoji: string
}

export interface EmbedTemplateOptions {
  title: string
  description?: string
  footer?: boolean
  delas?: boolean
  author?: User
  color?: HexColorString
  url?: string
  fields?: RestOrArray<APIEmbedField>[]
  target?: {
    user: User
    icon?: boolean
  }
}

export interface GetChannelOptions {
  id: string
  client: He4rtClient
}

export interface RankingGET extends RESTJson {
  data: RankingMember[]
}

export interface DailyPOST extends RESTJson {
  points: number
  date: string
}

export interface IntroducePUT extends RESTJson {}

export interface IntroducePOST extends RESTJson {}

export interface BadgePOST {
  name: string
  description: string
  image_url: string
  redeem_code: string
  active: number
}

export interface UserGETBody {
  name: string
  nickname: string
  about: string
  git: string
  linkedin: string | null
}

export interface UserLevelXP {
  levelup_exp: {
    id: number
    required: number
    created_at: string | null
    updated_at: string | null
  }
}

export interface UserGET extends RESTJson, UserGETBody, UserLevelXP {
  id: number
  discord_id: string
  twitch_id: any
  email: string | null
  level: number
  current_exp: number
  money: string
  daily: string | null
  created_at: string | null
  updated_at: string | null
}

export interface UserPUT extends UserGET {}

export interface MessagePOST extends RESTJson {}

export interface ApoiaseGET extends RESTJson {
  isPaidThisMonth: boolean
  isBacker: boolean
  thisMonthPaidValue?: number
}

export interface RankingMember extends UserLevelXP {
  nickname?: string
  level: number
  current_exp: number
  discord_id: string
  messages_count: number
}

export interface Context {
  client: He4rtClient
  rest: REST
}
