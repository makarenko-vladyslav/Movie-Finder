import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <main>{children}</main>
      </Suspense>
      <Footer />
    </div>
  );
}
