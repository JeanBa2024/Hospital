'use client'

import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  UserIcon,
  CalendarIcon,
  PhoneIcon,
  MapPinIcon,
  PencilIcon,
  TrashIcon,
  AtSignIcon,
} from 'lucide-react'

interface Patient {
  id: number
  full_name: string
  email: string
  phone: number
  birth_date: string
  gender: string
  address: string
}

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/core/patients/'
        )
        setPatients(response.data)
      } catch (error) {
        console.log('Erreur:', error)
      }
    }
    fetchPatient()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-tr from-blue-50 to-indigo-100 py-10 px-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center mb-10'>
          <h1 className='text-4xl font-extrabold text-indigo-700'>
            👨‍⚕️ Liste des Patients
          </h1>
          <Link
            href='/patients/create'
            className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition duration-300'
          >
            ➕ Nouveau Patient
          </Link>
        </div>

        {patients.length === 0 ? (
          <p className='text-center text-gray-600 text-lg'>
            Aucun patient trouvé pour le moment.
          </p>
        ) : (
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {patients.map((patient) => (
              <div
                key={patient.id}
                className='bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300 border border-gray-200'
              >
                <div className='flex items-center gap-2 mb-3 text-indigo-600'>
                  <UserIcon className='w-5 h-5' />
                  <h2 className='text-xl font-bold'>{patient.full_name}</h2>
                </div>
                <div className='text-sm text-gray-700 space-y-1'>
                  <p className='flex items-center gap-2'>
                    <AtSignIcon className='w-4 h-4' /> {patient.email}
                  </p>
                  <p className='flex items-center gap-2'>
                    <PhoneIcon className='w-4 h-4' /> {patient.phone}
                  </p>
                  <p className='flex items-center gap-2'>
                    <CalendarIcon className='w-4 h-4' /> {patient.birth_date}
                  </p>
                  <p className='flex items-center gap-2'>
                    <span className='w-4 h-4 inline-block bg-indigo-400 rounded-full'></span>{' '}
                    {patient.gender}
                  </p>
                  <p className='flex items-center gap-2'>
                    <MapPinIcon className='w-4 h-4' /> {patient.address}
                  </p>
                </div>
                <div className='flex justify-end gap-3 mt-4'>
                  <Link
                    href={`/patients/update/${patient.id}`}
                    className='inline-flex items-center text-sm text-blue-600 hover:underline'
                  >
                    <PencilIcon className='w-4 h-4 mr-1' /> Modifier
                  </Link>
                  <Link
                    href={`/patients/delete/${patient.id}`}
                    className='inline-flex items-center text-sm text-red-600 hover:underline'
                  >
                    <TrashIcon className='w-4 h-4 mr-1' /> Supprimer
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
