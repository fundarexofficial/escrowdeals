import { Suspense } from 'react';
import AccountsClient from './AccountsClient';

export default function AccountsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="text-center py-12 lg:py-20">
          <p className="text-slate-400 text-base lg:text-lg">Loading accounts...</p>
        </div>
      </div>
    }>
      <AccountsClient />
    </Suspense>
  );
}
