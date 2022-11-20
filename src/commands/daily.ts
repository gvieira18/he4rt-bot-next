import { GuildMember, SlashCommandBuilder } from 'discord.js'
import { Command, DailyPOST } from '@/types'
import { DAILY } from '@/defines/commands.json'
import { isPrivileged, replaceDefineString } from '@/utils'
import { HCOINS_ERROR, HCOINS_SUCCESS } from '@/defines/localisation/commands/daily.json'

export const useDaily = (): Command => {
  const data = new SlashCommandBuilder().setName(DAILY.TITLE).setDescription(DAILY.DESCRIPTION).setDMPermission(false)

  return [
    data,
    async (interaction, client) => {
      const member = interaction.member as GuildMember

      client.api.users
        .daily()
        .post<DailyPOST>({
          donator: isPrivileged(member),
          discord_id: member.id,
        })
        .then(async ({ data }) => {
          await interaction.reply({
            content: replaceDefineString(HCOINS_SUCCESS, String(data.points)),
            ephemeral: true,
          })
        })
        .catch(async () => {
          await interaction.reply({
            content: HCOINS_ERROR,
            ephemeral: true,
          })
        })
    },
  ]
}
