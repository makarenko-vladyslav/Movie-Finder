import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

import { Suspense } from "react";
import Spinner from "../Spinner/Spinner";

export default function Layout({ children }) {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<Spinner />}>
        <main>{children}</main>
      </Suspense>
      <Footer />
    </div>
  );
}
