import * as React from 'react';
import { Link } from 'gatsby';

// import Layout from "../Layout/AppLayout"
import Seo from '../components/Seo';

const SecondPage = () => (
  <>
    <Seo title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </>
);

export default SecondPage;
