import React from "react";
import { PageLayout } from "../components/page-layout";

export const NotFoundPage: React.FC = () => {
  return (
    <PageLayout>
      <div className="py-20">
        <h1 className="text-center text-2xl">Page not found!</h1>
      </div>
    </PageLayout>
  );
};
