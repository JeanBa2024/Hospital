// app/page.tsx
'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-blue-700">
          Bienvenue sur la Plateforme de Gestion Hospitalière
        </h1>
        <p className="text-lg">
          Cette application vous permet de gérer facilement les patients, les médecins, les rendez-vous, les ordonnances et plus encore.
        </p>

        <div className="space-x-4 mt-6">
          <Link href="/patients" className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
            Voir les Patients
          </Link>
          <Link href="/doctors" className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition">
            Voir les Médecins
          </Link>
        </div>
      </div>
    </main>
  );
}
