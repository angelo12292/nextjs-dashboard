async function getInvoices() {
    const res = await fetch('http://localhost:8080/api/invoices', {
      cache: 'no-store',
    });
  
    if (!res.ok) {
      throw new Error('Errore nel recupero fatture');
    }
  
    return res.json();
  }
  
  export default async function Page() {
    const invoices = await getInvoices();
  
    return (
      <main className="p-6">
        <h1 className="mb-4 text-2xl font-bold">
          Fatture da Spring Boot
        </h1>
  
        <pre>{JSON.stringify(invoices, null, 2)}</pre>
      </main>
    );
  }