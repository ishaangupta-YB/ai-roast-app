'use client';

import { useState } from 'react';
import { readStreamableValue } from 'ai/rsc';
import { generate } from '@/lib/openai/actions';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export default function LeetcodeRoast() {
  const [generation, setGeneration] = useState<string>('');

  return (
    <div>
      <button
        onClick={async () => {
          const { output } = await generate('Why is the sky blue?');

          for await (const delta of readStreamableValue(output)) {
            setGeneration(currentGeneration => `${currentGeneration}${delta}`);
          }
        }}
      >
        Ask
      </button>

      <div>{generation}</div>
    </div>
  );
}