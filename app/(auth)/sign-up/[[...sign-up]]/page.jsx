import { SignUp } from '@clerk/nextjs';

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
              Start your financial journey today
            </h1>
            <p className="text-indigo-200 text-lg leading-relaxed">
              Join thousands of users who have taken control of their money with Trackify.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '10K+', label: 'Active users' },
              { value: '₹2Cr+', label: 'Expenses tracked' },
              { value: '50K+', label: 'Budgets created' },
              { value: '4.9★', label: 'User rating' },
            ].map((stat) => (
              <div key={stat.label}
                   className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-white text-xl font-bold">{stat.value}</p>
                <p className="text-indigo-200 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative bg-white/10 rounded-xl p-5 backdrop-blur-sm">
          <p className="text-indigo-100 text-sm italic leading-relaxed">
            "I saved ₹15,000 in my first month just by understanding 
            where my money was going."
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-7 h-7 bg-purple-400 rounded-full flex items-center 
                            justify-center text-white text-xs font-bold">P</div>
            <div>
              <p className="text-white text-xs font-semibold">Priya M.</p>
              <p className="text-indigo-300 text-xs">Trackify user</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Sign Up form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center 
                      p-6 md:p-12 bg-gray-950">

        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-8 lg:hidden">
          <img src="/logo.svg" alt="Trackify" className="h-8 w-8" />
          <span className="text-white text-xl font-bold">Trackify</span>
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-white">Create your account</h2>
            <p className="text-gray-400 text-sm mt-1">
              Free forever. No credit card required.
            </p>
          </div>
          <SignUp afterSignUpUrl="/dashboard" />
        </div>
      </div>

    </div>
  );
}