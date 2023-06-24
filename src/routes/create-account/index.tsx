import { component$, $,useTask$, useStore } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link } from '@builder.io/qwik-city';
import {nip06, getPublicKey} from 'nostr-tools';
import { Command } from '@tauri-apps/api/shell'
export const DialogBox = component$(({ isOpen, onClose, title, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          onClick={onClose}
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Dialog container */}
        <div
          className="w-full sm:mx-auto sm:max-w-md sm:max-h-full relative sm:my-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialogTitle"
          >
          <div className="bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Dialog content */}
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="dialogTitle"
                  >
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{description}</p>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                onClick={onClose}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
});
export default component$(() => {
  const state = useStore({ publicKey: "",
    privKey:"",
    accountCreated:false,
    error:false,
  errorMessage:""});

  const createAccount = $(() => {
    const priv = nip06.privateKeyFromSeedWords(nip06.generateSeedWords());
    const pub = getPublicKey(priv);
    state.publicKey=pub;
    state.privKey=priv;
    state.accountCreated=true;
  })
  const savePriv=$(async()=>{
    state.error=false;
    const output = await new Command('op',['whoami','--format','json']).execute();
    if(output.stdout.includes("account is not signed in")){
      const login = await new Command('op',['whoami','--format','json']).execute();

      if(login.stderr.trim().length>0){
        const pattern = /^\[ERROR\] \d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/;
         const cleanedString = login.stderr.replace(pattern, '');
state.error=true;
state.errorMessage=cleanedString;
return
      }
    }

  })
  useTask$(async () => {

  });
  return (
    <>
    {state.error && <div class="bg-red-200 p-4 rounded border-l-4 border-red-600 text-red-800">
      <p>
        <strong>{state.errorMessage}</strong>
      </p>
    </div>}

    {state.accountCreated &&<>
    <h1 class="text-3xl font-bold my-4">Account created</h1>
    <form>
      <label>Public Key</label>
      <input
        type="text"
        class="w-full my-2 p-2 mb-2 border border-solid border-4 rounded-md"
        placeholder="public key"
        bind:value={state.publicKey}
        disabled
      />
      <label>Private Key</label>

      <input
        type="text"
        class="w-full my-2 p-2 border border-solid border-4 rounded-md"
        placeholder="private key"
        bind:value={state.privKey}
        disabled        
      />
    </form>
    <button onClick$={savePriv}  class="hover:text-black mt-4 bg-purple-500 hover:bg-purple-200 text-white px-4 py-2 cursor-pointer rounded">
      Save to 1password
    </button>

    <button onClick$={savePriv}  class="hover:text-black mt-4 bg-green-500 hover:bg-green-200 text-white px-4 py-2 cursor-pointer rounded">
      Continue
    </button>
    <button onClick$={()=>state.accountCreated=false}  class="hover:text-black mt-4 bg-red-500  hover:bg-gray-200 text-white px-4 py-2 cursor-pointer rounded">
      Cancel
    </button>
    </>}
    {!state.accountCreated && <>
    <h1 class="text-3xl font-bold my-4">Create Nostr Account</h1>
    <button onClick$={createAccount}  class="hover:text-black mt-4 bg-purple-500 hover:bg-purple-200 text-white px-4 py-2 cursor-pointer rounded">
      Create Public and Private Key
    </button>
    <Link href="/"  class="hover:text-black mt-4 bg-black hover:bg-gray-200 text-white px-4 py-2 cursor-pointer rounded">
      Back
    </Link>
    </>}


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
