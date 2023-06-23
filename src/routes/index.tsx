import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';


export default component$(() => {
  return (
    <>
    <h1 class="text-5xl font-bold mb-4">Welcome to Nostr Chat</h1>
    <Link class="bg-purple-700 hover:bg-purple-300 text-white font-semibold py-2 px-4 rounded cursor-pointer" href="/create-account">Create Account</Link>

    <Link class="bg-purple-700 mt-5 hover:bg-purple-300 text-white font-semibold py-2 px-4 rounded cursor-pointer">
      Import Account from 1Password
    </Link>
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
