import { component$, $, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import {nip06, getPublicKey} from 'nostr-tools';
import { Command } from '@tauri-apps/api/shell'
export default component$(() => {
  const publicKey = useSignal("");
  const privKey = useSignal("");
  const createAccount = $(() => {
    const priv = nip06.privateKeyFromSeedWords(nip06.generateSeedWords());
    const pub = getPublicKey(priv);
    publicKey.value=pub;
    privKey.value=priv;
    
  })
  const savePriv=$(async()=>{
    const output = await new Command('op',['signin']).execute();
    console.log(output)
  })
  return (
    <>
    <h1 class="text-3xl font-bold my-4">Account created</h1>
    <form>
      <label>Public Key</label>
      <input
        type="text"
        class="w-full my-2 p-2 mb-2 border border-solid border-4 rounded-md"
        placeholder="public key"
        bind:value={publicKey}
        disabled
      />
      <label>Private Key</label>
      
      <input
        type="text"
        class="w-full my-2 p-2 border border-solid border-4 rounded-md"
        placeholder="private key"
        bind:value={privKey}
        disabled        
      />
    </form>
    <button onClick$={savePriv}  class="hover:text-black mt-4 bg-purple-500 hover:bg-purple-200 text-white px-4 py-2 cursor-pointer rounded">
      save to 1password
    </button>
    <h1 class="text-3xl font-bold my-4">Create Nostr Account</h1>
    <button onClick$={createAccount}  class="hover:text-black mt-4 bg-purple-500 hover:bg-purple-200 text-white px-4 py-2 cursor-pointer rounded">
      Create Public and Private Key
    </button>
    <Link href="/"  class="hover:text-black mt-4 bg-black hover:bg-gray-200 text-white px-4 py-2 cursor-pointer rounded">
      Back
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
