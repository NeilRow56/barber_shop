import { Webhook } from 'svix'
import { User } from '@prisma/client'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

import { revalidatePath } from 'next/cache'
import { createUser, UpdateUser } from '@/lib/actions/users'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local'
    )
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = headers()
  const svix_id = (await headerPayload).get('svix-id')
  const svix_timestamp = (await headerPayload).get('svix-timestamp')
  const svix_signature = (await headerPayload).get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400
    })
  }

  // Do something with payload
  // For this guide, log payload to console

  const eventType = evt.type

  if (eventType === 'user.created') {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
      phone_numbers
    } = evt.data

    if (!id || !email_addresses || !email_addresses.length) {
      return new Response('Error occurred -- missing data', {
        status: 400
      })
    }

    const email = email_addresses[0].email_address
    const phone = phone_numbers ? phone_numbers[0].phone_number : null

    const user = {
      clerkUserId: id,
      firstName: first_name,
      lastName: last_name,
      email: email,
      phone: phone,
      ...(image_url ? { imageUrl: image_url } : {})
    }

    try {
      await createUser(user as User)
      revalidatePath(`/admin`)
    } catch (error) {
      return new Response('Error occurred', {
        status: 400
      })
    }
  }

  if (eventType === 'user.updated') {
    const { id, first_name, last_name, image_url } = evt.data

    if (!id) {
      return new Response('Error occurred -- missing data', {
        status: 400
      })
    }

    const data = {
      ...(first_name ? { firstName: first_name } : {}),
      ...(last_name ? { lastName: last_name } : {}),
      ...(image_url ? { imageUrl: image_url } : {})
    }

    try {
      await UpdateUser(id, data)
      revalidatePath(`/admin`)
    } catch (error) {
      return new Response('Error occurred', {
        status: 400
      })
    }
  }

  return new Response('', { status: 200 })
}
