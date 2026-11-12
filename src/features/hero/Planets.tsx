import { Astronaut } from '@/components/space/Astronaut';
import { CoralPlanet, Moon, RingedPlanet } from '@/components/space/planets';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export function Planets() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <>
      <RingedPlanet className="animate-float absolute -top-16 -right-24 w-44 opacity-70 sm:-top-10 sm:-right-20 sm:w-80 sm:opacity-80 lg:-top-40 lg:-right-20 lg:w-[30rem] lg:opacity-90" />
      <Moon className="animate-float-slow absolute top-6 left-[46%] hidden w-14 opacity-80 sm:block lg:top-10 lg:w-16" />
      <CoralPlanet
        animate={!reducedMotion}
        className="animate-float-slow absolute top-[21rem] left-[43%] hidden w-44 opacity-90 lg:block"
      />
      {/* Sits right before the text column: container edge + padding - own width - gap. */}
      <Astronaut className="animate-drift absolute top-20 left-[calc((100%-72rem)/2+1.5rem-var(--w)-1.25rem)] hidden w-(--w) drop-shadow-[0_0_28px_rgb(56_189_248/0.3)] [--w:12rem] 2xl:block min-[110rem]:[--w:15rem]" />
    </>
  );
}
