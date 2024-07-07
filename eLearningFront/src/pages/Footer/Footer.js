/* eslint-disable */
// @mui
// hooks
import './../home.scss';
import LogoElearning from 'src/components/LogoElearning';
import DashboardNavbar from 'src/layouts/dashboard/DashboardNavbar';
import useResponsive from 'src/hooks/useResponsive';
import { useState } from 'react';
import { getCurrentUser } from 'src/services/user/current-user';
import NavConfigClient from '../../layouts/dashboard/NavConfigClient';
import navConfigAdmin from '../../layouts/dashboard/NavConfigAdmin';
import NavSection from 'src/components/NavSection';
import NewsLetter from '../NewsLetter';
import { Link } from '@mui/material';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Footer() {
  const isDesktop = useResponsive('up', 'lg');
  const [footerView, setFooterView] = useState(true);
  return (
    <div role="footer" className="footer-style">
      <div className="parent1">
        <div className="div10">
          <LogoElearning location="footer" />
        </div>
        <div className="div11">
          {isDesktop && (
            <NavSection
              footerView={footerView}
              navConfig={getCurrentUser().role === 'client' ? NavConfigClient : navConfigAdmin}
            />
          )}
        </div>
        <div className="div12">
          <NewsLetter />
        </div>
        <div className="div13">
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '2rem' }}
          >
            <img src={process.env.PUBLIC_URL + '/favicon/facebook.png'} />
          </Link>
          <Link href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{ marginRight: '2rem' }}>
            <img src={process.env.PUBLIC_URL + '/favicon/twitter.png'} />
          </Link>
          <Link
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '2rem' }}
          >
            <img src={process.env.PUBLIC_URL + '/favicon/linkedIn.png'} />
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '2rem' }}
          >
            <img src={process.env.PUBLIC_URL + '/favicon/instagram.png'} />
          </Link>
        </div>
      </div>
    </div>
  );
}
