import React, { useEffect, useRef, useState } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { FormField } from './form-field.tsx';

interface HTMLVanillaTiltElement extends HTMLDivElement {
  vanillaTilt?: VanillaTilt;
}

function Tilt({
  children,
  max = 25,
  speed = 400,
  glare = true,
  maxGlare = 0.5,
}: {
  children: React.ReactNode;
  max?: number;
  speed?: number;
  glare?: boolean;
  maxGlare?: number;
}) {
  const tiltRef = useRef<HTMLVanillaTiltElement | null>(null);

  useEffect(() => {
    const { current: tiltNone } = tiltRef;
    if (!tiltNone) return;
    const vanillaTiltOptions = {
      max,
      speed,
      glare,
      'max-glare': maxGlare,
    };
    VanillaTilt.init(tiltNone, vanillaTiltOptions);

    return () => tiltNone.vanillaTilt?.destroy();
  }, [maxGlare, glare, speed, max]);

  return (
    <div className="tilt-root" ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  );
}

export function TiltApp() {
  const [showTilt, setShowTilt] = useState(true);
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState({
    max: 25,
    speed: 400,
    glare: true,
    maxGlare: 0.5,
  });
  return (
    <div className="p-6">
      <button onClick={() => setShowTilt((s) => !s)}>Toggle Visibility</button>
      {showTilt ? (
        <div className="app">
          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
            onChange={(event) => {
              const formData = new FormData(event.currentTarget);
              setOptions({
                max: Number(formData.get('max')),
                speed: Number(formData.get('speed')),
                glare: formData.get('glare') === 'on',
                maxGlare: Number(formData.get('maxGlare')),
              });
            }}
          >
            <FormField label="Max:" name="max" type="number" defaultValue={25} />
            <FormField label="Glare:" name="glare" type="checkbox" defaultChecked />
            <FormField label="Glare:" name="glare" type="number" defaultChecked />
            <FormField label="Speed:" name="speed" type="number" defaultValue={0.5} />
          </form>
          <br />
          <Tilt {...options}>
            <div className="totally-centered">
              <button className="count-button" onClick={() => setCount((c) => c + 1)}>
                {count}
              </button>
            </div>
          </Tilt>
        </div>
      ) : null}
    </div>
  );
}

// 🤫 we'll fix this in the next step!
// (ALMOST) NEVER DISABLE THIS LINT RULE IN REAL LIFE!
/*
eslint
	react-hooks/exhaustive-deps: "off",
*/
