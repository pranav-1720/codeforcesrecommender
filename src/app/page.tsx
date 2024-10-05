'use client'

import { useState, useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { fetchUserData } from '@/app/actions'
import { userData, userInfo } from '@/definitions'
import { ThreeColumnGrid } from '@/components/ui/threecolumngrid'


export default function Component() {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState<userData | null>(null);

  const [userInfo, setUserInfo] = useState<userInfo | null>(null)

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setUserData(null)

    startTransition(async () => {
      try {
        const result = await fetchUserData(username)
        setUserData(result)
        setUserInfo([
          { name: "Handle", value: result.handle },
          { name: "Name", value: result.Name },
          { name: "Country", value: result.country },
          { name: "Rating", value: result.rating },
          { name: "Max Rating", value: result.maxRating },
          { name: "Rank", value: result.rank },
        ])
      } catch (err) {
        setError(`An error occurred while fetching data: ${err}`)
      }
    })
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="grid w-full max-w-screen-sm items-center gap-1.5">
        <Label htmlFor="username">Enter your username</Label>
        <Input
          type="text"
          id="username"
          placeholder="Username"
          className=''
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Fetching...' : 'Fetch User Data'}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
      {userInfo && <ThreeColumnGrid classname='w-full max-w-screen-sm m-5' items={userInfo} />}
    </div>
  )
}