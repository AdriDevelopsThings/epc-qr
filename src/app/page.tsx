"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { isValid } from 'iban'
import QRCode from 'react-qr-code'

function parseAmount(amount: string) {
    const splitted = amount.split(amount.includes(',') ? ',' : '.')
    if (splitted.length == 0 || splitted.length > 2) {
      return false
    }

    const first = parseInt(splitted[0])
    if (isNaN(first)) {
      return null
    }
    const second = splitted.length == 2 ? parseInt(splitted[1]) : 0
    if (isNaN(second) || second < 0 || second > 99) {
      return null
    }

    return `EUR${first}.${second}`
}

export default function Home() {
  const [receiver, setReceiver] = useState('')
  const [iban, setIban] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')

  const [validIban, setValidIban] = useState(false)
  const [epc, setEpc] = useState<null | string>('')

  useEffect(() => {
    const newIban = iban.replace(' ', '').toUpperCase()
    setIban(newIban)
    const valid = isValid(newIban)
    setValidIban(valid)


    const parsedAmount = parseAmount(amount)
    if (parsedAmount && valid && receiver) {
      setEpc(`BCD\n002\n1\nSCT\n\n${receiver}\n${iban}\n${parsedAmount}\n\n\n${description}\n`)
    } else {
      setEpc(null)
    }
  }, [iban, amount, receiver, description])

  return (
    <div>
      <Label htmlFor='receiver'>Receiver Name</Label>
      <Input value={receiver} onChange={(e) => setReceiver(e.target.value)} id='receiver' placeholder='Mr. X' className={ receiver != '' ? 'border-lime-600' : 'border-rose-500' } />

      <Label htmlFor='iban'>IBAN that should receive the money</Label>
      <Input value={iban} onChange={(e) => setIban(e.target.value)} id='iban' placeholder='DE02100500000054540402' className={ validIban ? 'border-lime-600' : 'border-rose-500' }/>

      <Label htmlFor='amount'>Amount</Label>
      <Input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} id='amount' placeholder='12.99' className={ parseAmount(amount) ? 'border-lime-600' : 'border-rose-500' } />

      <Label htmlFor='description'>Description</Label>
      <Input value={description} onChange={(e) => setDescription(e.target.value)} id='description' placeholder='My description is...' />

      {epc ? <QRCode
        className='mt-8 w-full'
        value={epc}
       /> : null}
    </div>
  )
}
