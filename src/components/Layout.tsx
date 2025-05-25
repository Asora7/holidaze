import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* make wrapper full-viewport tall */
`;

const Main = styled.main`
  flex: 1; /* ← grow to fill between header & footer */
  padding: 2rem; /* add inside padding if you want */

  padding: 0 2rem;
  background: #f8f9fa; /* optional: give it that light-gray hero look */
`;

export default function Layout() {
  return (
    <Page>
      <Navbar />

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </Page>
  );
}
