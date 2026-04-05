import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-screen flex bg-gray-950">
      
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12
                      bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800">
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400/10 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-indigo-300/10 rounded-full blur-2xl" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <img src="/logo.svg" alt="Trackify" className="h-10 w-10" />
          <span className="text-white text-2xl font-bold">Trackify</span>
        </div>

        {/* Center content */}
        <div className="relative space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white leading-tight">
              Take control of your finances
            </h1>
            <p className="text-indigo-200 text-lg leading-relaxed">
              Track expenses, manage budgets, and understand your spending patterns — all in one place.
            </p>
          </div>

          {/* Feature list */}
          <div className="space-y-3">
            {[
              { emoji: '📊', text: 'Visual spending insights' },
              { emoji: '💰', text: 'Budget tracking & alerts' },
              { emoji: '📈', text: 'Income vs expense analysis' },
              { emoji: '🔒', text: 'Secure & private' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-sm">
                  {item.emoji}
                </div>
                <span className="text-indigo-100 text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="relative bg-white/10 rounded-xl p-5 backdrop-blur-sm">
          <p className="text-indigo-100 text-sm italic leading-relaxed">
            "Finally an expense tracker that's actually simple to use. 
            My budgeting has never been easier!"
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-7 h-7 bg-indigo-400 rounded-full flex items-center 
                            justify-center text-white text-xs font-bold">R</div>
            <div>
              <p className="text-white text-xs font-semibold">Rahul S.</p>
              <p className="text-indigo-300 text-xs">Trackify user</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Sign In form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center 
                      p-6 md:p-12 bg-gray-950">
        
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <img src="/logo.svg" alt="Trackify" className="h-8 w-8" />
          <span className="text-white text-xl font-bold">Trackify</span>
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white">Welcome back</h2>
            <p className="text-gray-400 text-sm mt-1">
              Sign in to your account to continue
            </p>
          </div>
          <SignIn afterSignInUrl="/dashboard" />
        </div>
      </div>

    </div>
  );
}