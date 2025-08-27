import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen md:flex bg-white">
      <div className="w-full md:w-1/2 relative h-72 md:h-screen">
        <img
          src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-6 bottom-8 md:left-12 md:bottom-16 text-white max-w-xs">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Welcome to Trackify !!!
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/80">
            Track your expenses smarter with our expense tracker.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="relative w-full max-w-md">
          {/* FIX: Add the afterSignInUrl prop */}
          <SignIn afterSignInUrl="/dashboard" />
        </div>
      </div>
    </div>
  );
}