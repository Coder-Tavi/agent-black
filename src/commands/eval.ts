import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { CustomClient } from '../typings/Extensions.js';

export const name = 'eval';
export const ephemeral = true;
export const data = new SlashCommandBuilder()
  .setName(name)
  .setDescription('Runs snippets of code')
  .addStringOption((option) => {
    return option.setName('script').setDescription('The code to run').setRequired(true);
  });
export async function run(
  client: CustomClient,
  interaction: ChatInputCommandInteraction,
  options: ChatInputCommandInteraction['options']
): Promise<void> {
  const dbUser = await client.models.user.findOne({
    where: { userId: interaction.user.id }
  });
  if (!dbUser) {
    interaction.editReply({
      content: 'You are not authorized to use this command'
    });
    return;
  }
  if (!dbUser.flags.has('Owner')) {
    interaction.editReply({
      content: 'You are not authorized to use this command'
    });
    return;
  }
  // Execute command
  const result = eval(options.getString('script', true));
  interaction.editReply({
    embeds: [
      new EmbedBuilder().setTitle('Evaluation').setDescription(`\`\`\`js\n${JSON.stringify(result, null, 2)}\`\`\``)
    ]
  });
  return;
}
