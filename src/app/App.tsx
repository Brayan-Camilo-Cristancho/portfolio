import { domAnimation, LazyMotion, MotionConfig } from 'motion/react';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { SkipLink } from '@/components/layout/SkipLink';
import { HomePage } from '@/features/home/HomePage';
import { NotFoundPage } from '@/features/not-found/NotFoundPage';
import { ScrollManager } from './ScrollManager';
import { BackToTop } from '@/components/layout/BackToTop';
import { Starfield } from '@/components/space/Starfield';

/**
 * App shell. While the mobile menu is open, main and footer are `inert`, which keeps
 * focus inside the menu without a focus trap. LazyMotion `strict` guarantees only the
 * lightweight `m` components are used.
 */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ScrollManager />

        <Starfield />
        <SkipLink />
        <Navbar menuOpen={menuOpen} onMenuOpenChange={setMenuOpen} />

        <main id="main" tabIndex={-1} inert={menuOpen} className="outline-none">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer inert={menuOpen} />
        <BackToTop />
      </MotionConfig>
    </LazyMotion>
  );
}
