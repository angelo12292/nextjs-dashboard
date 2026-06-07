import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { notFound } from 'next/navigation';

async function getSpringInvoiceById(id: string) {
  const res = await fetch(`http://localhost:8080/api/invoices/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

async function getSpringCustomers() {
  const res = await fetch('http://localhost:8080/api/customers', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Errore nel recupero clienti da Spring');
  }

  return res.json();
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [invoice, customers] = await Promise.all([
    getSpringInvoiceById(id),
    getSpringCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}