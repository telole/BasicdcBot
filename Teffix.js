const { Client, GatewayIntentBits, REST, Routes, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const products = {
  netflix: {
    name: 'Netflix',
    description: 'Akun Netflix Premium',
    price: 'Rp 20.000 / bulan'
  },
  spotify: {
    name: 'Spotify',
    description: 'Akun Spotify Premium',
    price: 'Rp 15.000 / bulan'
  },
  capcut: {
    name: 'Capcut',
    description: 'Akun Capcut Pro',
    price: 'Rp 10.000 / bulan'
  },
  fanda: {
    name: 'Fanda',
    description: 'Akun Fanda Premium',
    price: 'Rp 25.000 / bulan'
  }
};

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'produk') {
      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('select_product')
        .setPlaceholder('Pilih produk premium...')
        .addOptions(Object.keys(products).map(key => ({
          label: products[key].name,
          description: products[key].description,
          value: key
        })));

      const row = new ActionRowBuilder().addComponents(selectMenu);
      await interaction.reply({ content: 'Silakan pilih produk:', components: [row], ephemeral: true });
    }
  }

  if (interaction.isStringSelectMenu()) {
    const selected = interaction.values[0];
    const product = products[selected];

    const embed = new EmbedBuilder()
      .setTitle(`Detail Produk: ${product.name}`)
      .setDescription(product.description)
      .addFields({ name: 'Harga', value: product.price })
      .setColor(0x00AE86);

    await interaction.update({ content: '', embeds: [embed], components: [] });
  }
});

client.login(process.env.TOKEN);
