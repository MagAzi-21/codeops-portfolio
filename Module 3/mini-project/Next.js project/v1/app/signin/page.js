import { signInAction } from "@/app/actions";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const nextParam = params?.next || "/orders";

  return (
    <div className="max-w-md mx-auto p-6 sm:p-8 bg-white border rounded-2xl shadow-sm mt-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Sign In to Addis Eats</h2>
      <p className="text-xs text-slate-500 mb-6">
        Select a test identity to verify session cookies and 3-tier authorization guards[cite: 20].
      </p>

      <form action={signInAction} className="space-y-4">
        <input type="hidden" name="next" value={nextParam} />

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Choose Identity
          </label>
          <select name="userId" className="w-full border rounded-lg p-2.5 text-sm bg-white">
            <option value="usr_mike">Mike (Customer - Owns ord_101 & ord_102)</option>
            <option value="usr_almaz">Almaz (Customer - Owns ord_103)</option>
            <option value="usr_chef">Chef Dawit (Staff Role - Has Kitchen Access)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-amber-600 text-white font-bold text-sm rounded-lg hover:bg-amber-700 transition"
        >
          Sign In & Continue →
        </button>
      </form>
    </div>
  );
}