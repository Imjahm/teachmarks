import { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  // Return the Mapbox token from environment variables
  return {
    statusCode: 200,
    body: JSON.stringify({
      token: process.env.MAPBOX_TOKEN
    })
  }
}