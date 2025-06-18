'use client'

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function deletePatient() {
    
  const { id } = useParams();
  const router = useRouter();
  const [patient, setPatients] = useState<any>(null);

  useEffect(() => {
    const DelPatient = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/core/patients/${id}/`);
        setPatients(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    DelPatient()
  }, [id])

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/core/patients/${id}/`
      )
      router.push('/patients/read')
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  if (!patient) return <p className='p-6'>Chargement...</p>
  return (
    <div className='p-6 max-w-xl mx-auto'>
      <h2 className='text-xl font-bold mb-2'>Supprimer un patient</h2>
      <p>
        Voulez-vous vraiment supprimer : <strong>{patient.full_name}</strong> ?
      </p>
      <button
        onClick={handleDelete}
        className='mt-4 bg-red-600 text-white px-4 py-2 rounded'
      >
        Confirmer la suppression
      </button>
    </div>
  )
}
