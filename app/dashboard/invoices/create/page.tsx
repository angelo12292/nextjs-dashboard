import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';

async function getSpringCustomers() {
  const res = await fetch('http://localhost:8080/api/customers', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Errore nel recupero clienti da Spring');
  }

  return res.json();
}

export default async function Page() {
  const customers = await getSpringCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}