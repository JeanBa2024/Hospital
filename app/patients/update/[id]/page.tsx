'use client'

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

export default function update() {
  const { id } = useParams()
  const router = useRouter()
  const [full_name, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birth_date, setBirthdate] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAdress] = useState('')

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`
          http://127.0.0.1:8000/api/core/patients/${id}/`)
        const data = response.data
        setFullname(data.full_name)
        setEmail(data.email)
        setPhone(data.phone)
        setBirthdate(data.birth_date)
        setGender(data.gender)
        setAdress(data.address)
      } catch (error) {
        console.log('erreur', error)
      }
    }

    fetch()
  }, [id])

  const soumission = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        `
        http://127.0.0.1:8000/api/core/patients/${id}/`,
        {
          full_name,
          email,
          phone,
          birth_date,
          gender,
          address,
        }
      )
      console.log(response.data)
      router.push('/patients/read')
    } catch (error) {
      console.log('erreur', error)
    }
  }

  return (
    <div className='p-6 max-w-xl mx-auto bg-amber-300'>
      <h2 className='text-2xl font-bold mb-4'>Modifier un patient </h2>
      <form onSubmit={soumission} className='space-y-4'>
        <div>
          <label className='block mb-1 text-gray-950'> Nom complet</label>
          <input
            value={full_name}
            onChange={(e) => setFullname(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>

        <div>
          <label className='block mb-1 text-gray-950'> Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>
        <div>
          <label className='block mb-1 text-gray-950'> Telephone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>
        <div>
          <label className='block mb-1 text-gray-950'> Date de naissance</label>
          <input
            value={birth_date}
            onChange={(e) => setBirthdate(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>

        <div>
          <label className='block mb-1 text-gray-950'> Sexe</label>
          <input
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>

        <div>
          <label className='block mb-1 text-gray-950'> Adresse</label>
          <input
            value={address}
            onChange={(e) => setAdress(e.target.value)}
            className='w-full p-2 border rounded'
          />
        </div>
        <button className='bg-green-500 text-white px-4 py-2 rounded'>
          Mettre à jour
        </button>
      </form>
    </div>
  )
}
