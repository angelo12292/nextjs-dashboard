async function getUsers() {
    const res = await fetch('http://localhost:8080/api/users', {
      cache: 'no-store',
    });
  
    if (!res.ok) {
      throw new Error('Errore nel recupero utenti');
    }
  
    return res.json();
  }
  
  export default async function Page() {
    const users = await getUsers();
  
    return (
      <main className="p-6">
        <h1 className="mb-4 text-2xl font-bold">
          Utenti da Spring Boot
        </h1>
  
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </main>
    );
  }