module.exports.run = async (interaction) => {
  // check maintainer permissions
  if (!await client.functions.get('CHECK_DBperms').run(interaction.user.id)) {
    interaction.respond([{ name: `You are not authorized to use \`/${module.exports.data.name}\``, value: 0 }]);
    return;
  }

  // handle response
  const respond = (response) => interaction.respond(response);

  const searchInput = interaction.options.getNumber('serverid', true);

  if (searchInput.length <= 2) return interaction.respond([]);

  const guilds = interaction.client.guilds.cache;

  // id search
  if (!isNaN(searchInput)) {
    const found = guilds.find((guild) => guild.id === searchInput);
    if (found) respond([{ name: found.name, value: Number(found.id) }]);
    return respond([]);
  }

  // text search
  const guildReply = await guilds
    .filter((guild) => guild.name.toLowerCase().search(searchInput.toLowerCase()) !== -1)
    .map((guild) => ({ name: guild.name, value: Number(guild.id) }));
  respond(guildReply.slice(0, 24));
};

module.exports.data = {
  name: 'guildmgr',
};
