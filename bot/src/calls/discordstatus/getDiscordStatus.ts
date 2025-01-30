import axios from 'axios'

export async function getDiscordStatus() {
  const summary = await axios.get(
    'https://discordstatus.com/api/v2/summary.json',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  return {
    timezone: summary.data.timezone,
    url: summary.data.page.url,
    components: {
      api: {
        name: summary.data.components[0].name,
        status: summary.data.components[0].status,
        time: summary.data.components[0].updated_at,
      },
      cloudflare: {
        name: summary.data.components[1].name,
        status: summary.data.components[1].status,
        time: summary.data.components[1].updated_at,
      },
      zone: {
        brazil: {
          name: summary.data.components[2].name,
          status: summary.data.components[2].status,
          time: summary.data.components[2].updated_at,
        },
        rotterdam: {
          name: summary.data.components[3].name,
          status: summary.data.components[3].status,
          time: summary.data.components[3].updated_at,
        },
        hongKong: {
          name: summary.data.components[6].name,
          status: summary.data.components[6].status,
          time: summary.data.components[6].updated_at,
        },
        india: {
          name: summary.data.components[9].name,
          status: summary.data.components[9].status,
          time: summary.data.components[9].updated_at,
        },
        japan: {
          name: summary.data.components[12].name,
          status: summary.data.components[12].status,
          time: summary.data.components[12].updated_at,
        },
        russia: {
          name: summary.data.components[13].name,
          status: summary.data.components[13].status,
          time: summary.data.components[13].updated_at,
        },
        singapore: {
          name: summary.data.components[15].name,
          status: summary.data.components[15].status,
          time: summary.data.components[15].updated_at,
        },
        southAfrica: {
          name: summary.data.components[17].name,
          status: summary.data.components[17].status,
          time: summary.data.components[17].updated_at,
        },
        southKorea: {
          name: summary.data.components[19].name,
          status: summary.data.components[19].status,
          time: summary.data.components[19].updated_at,
        },
        sydney: {
          name: summary.data.components[20].name,
          status: summary.data.components[20].status,
          time: summary.data.components[20].updated_at,
        },
        usCentral: {
          name: summary.data.components[21].name,
          status: summary.data.components[21].status,
          time: summary.data.components[21].updated_at,
        },
        usEast: {
          name: summary.data.components[22].name,
          status: summary.data.components[22].status,
          time: summary.data.components[22].updated_at,
        },
        usSouth: {
          name: summary.data.components[23].name,
          status: summary.data.components[23].status,
          time: summary.data.components[23].updated_at,
        },
        usWest: {
          name: summary.data.components[24].name,
          status: summary.data.components[24].status,
          time: summary.data.components[24].updated_at,
        },
      },
      media: {
        name: summary.data.components[4].name,
        status: summary.data.components[4].status,
        time: summary.data.components[4].updated_at,
      },
      tax: {
        name: summary.data.components[5].name,
        status: summary.data.components[5].status,
        time: summary.data.components[5].updated_at,
      },
      push: {
        name: summary.data.components[7].name,
        status: summary.data.components[7].status,
        time: summary.data.components[7].updated_at,
      },
      creator: {
        name: summary.data.components[8].name,
        status: summary.data.components[8].status,
        time: summary.data.components[8].updated_at,
      },
      search: {
        name: summary.data.components[10].name,
        status: summary.data.components[10].status,
        time: summary.data.components[10].updated_at,
      },
      voice: {
        name: summary.data.components[11].name,
        status: summary.data.components[11].status,
        time: summary.data.components[11].updated_at,
      },
      thirdParty: {
        name: summary.data.components[14].name,
        status: summary.data.components[14].status,
        time: summary.data.components[14].updated_at,
      },
      serverPages: {
        name: summary.data.components[16].name,
        status: summary.data.components[16].status,
        time: summary.data.components[16].updated_at,
      },
      payments: {
        name: summary.data.components[18].name,
        status: summary.data.components[18].status,
        time: summary.data.components[18].updated_at,
      },
    },
    incidents: summary.data.incidents,
    scheduledMaintenances: summary.data.scheduled_maintenances,
    status: summary.data.status,
  }
}
