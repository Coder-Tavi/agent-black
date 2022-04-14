module.exports.run = async () => {
  if (DEBUG) return;
  console.log(`[${module.exports.data.name}] Setting status...`);
  await client.user.setStatus('online');
  // const membercount = await client.guilds.cache.reduce((previousCount, currentGuild) => previousCount + currentGuild.memberCount, 0);
  // TODO: update activity message, maybe with servercount, once reached 100 servers
  await client.user.setActivity('with /help');
  console.log(`[${module.exports.data.name}] Status set!`);
};

module.exports.data = {
  name: 'status',
  callOn: '-',
};
