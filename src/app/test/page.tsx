"use client"
import React from 'react';
import AirplaneScrollAnimation from './AirplaneScrollAnimation';
import { EmptyState } from '@/components/common-components/empty-state/EmptyState';
import { ErrorState } from '@/components/common-components/error-state/ErrorState';

const Page = () => {

  const handleRetry = () => {
    window.location.reload();
  };
  return (
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-500 via-purple-600 to-amber-500">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <ErrorState
            title="Failed to Load Content"
            message="asas"
            icon="alert"
            variant="error"
            size="md"
            actionLabel="Try Again"
            onAction={handleRetry}
          />
        </div>
      </section>
  );
};

export default Page;