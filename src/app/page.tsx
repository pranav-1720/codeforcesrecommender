'use client'

import { useState, useTransition } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchUserData } from '@/app/actions'
import { userInfo } from '@/definitions'
import { ThreeColumnGrid } from '@/components/ui/threecolumngrid'
import Overview from './Overview'
// import { motion } from 'framer-motion'

export default function Component() {
  const [username, setUsername] = useState('')
  // const [userData, setUserData] = useState<userData | null>(null);

  const [userInfo, setUserInfo] = useState<userInfo | null>(null)

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  const [userFetched, setUserFetched] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    // setUserData(null)

    startTransition(async () => {
      try {
        const result = await fetchUserData(username)
        // setUserData(result)
        setUserInfo([
          { name: "Handle", value: result.handle },
          { name: "Name", value: result.Name },
          { name: "Country", value: result.country },
          { name: "Rating", value: result.rating },
          { name: "Max Rating", value: result.maxRating },
          { name: "Rank", value: result.rank },
        ])
        setUserFetched(true)
      } catch (err) {
        setError(`An error occurred while fetching data: ${err}`)
      }
    })
  }


  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {/* <motion.div
          animate={{ y: userFetched ? -window.innerHeight / 2 + 200 : 0 }}
          transition={{ duration: 0.4 }}
        > */}
        <form onSubmit={handleSubmit} className="grid w-full max-w-screen-sm items-center gap-1.5 mt-2">
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
        {userInfo && <ThreeColumnGrid classname='w-full max-w-screen-sm m-3' items={userInfo} />}
        {userFetched &&
          <Tabs defaultValue="Overview" className='w-full max-w-screen-md'>
            <TabsList className='grid w-full grid-cols-3'>
              <TabsTrigger className='w-full' value="Overview">Overview</TabsTrigger>
              <TabsTrigger className='w-full' value="Recommender">Recommender</TabsTrigger>
              <TabsTrigger className='w-full' value='Advanced'>Advanced</TabsTrigger>
            </TabsList>
            <TabsContent value="Overview"><Overview user={username}/></TabsContent>
            <TabsContent value="Recommender">Change your password here.</TabsContent>
            <TabsContent value="Advanced">Change your Advanced here.</TabsContent>
          </Tabs>
        }
        {/* </motion.div> */}
      </div>
    </div>
  )
}