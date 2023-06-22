import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';



export default component$(() => {
  return (
    <>
    <h1 class="text-5xl font-bold mb-4">Welcome to Nostr Chat</h1>
    <button class="bg-purple-700 hover:bg-purple-300 text-white font-semibold py-2 px-4 rounded">
      Click Me
    </button>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
