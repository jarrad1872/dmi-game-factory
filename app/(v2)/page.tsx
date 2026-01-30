import V2Header from './components/V2Header';

export default function V2HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <V2Header />
      
      {/* Hero Section */}
      <section className="bg-dmi-gray py-16 md:py-24">
        <div className="container-dmi">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-dmi-black mb-6">
              Game Factory
            </h1>
            <p className="font-body text-lg md:text-xl text-dmi-gray mb-8 leading-relaxed">
              Create professional arcade-style games for DMI Tools. 
              Supporting the concrete cutting industry since 2014.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/v2/create" className="btn-dmi-primary inline-block">
                Create New Game
              </a>
              <a href="/v2/templates" className="btn-dmi-secondary inline-block">
                Browse Templates
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-dmi-white border-b border-gray-200">
        <div className="container-dmi">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-dmi-red">18+</div>
              <div className="font-ui text-sm text-dmi-gray uppercase tracking-wide mt-1">
                Game Templates
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-dmi-red">USA</div>
              <div className="font-ui text-sm text-dmi-gray uppercase tracking-wide mt-1">
                Made in America
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-dmi-red">2014</div>
              <div className="font-ui text-sm text-dmi-gray uppercase tracking-wide mt-1">
                Since Founded
              </div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-dmi-red">50+</div>
              <div className="font-ui text-sm text-dmi-gray uppercase tracking-wide mt-1">
                Years Experience
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Library Section */}
      <section className="py-16 flex-1">
        <div className="container-dmi">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl text-dmi-black">
              Your Games
            </h2>
            <a
              href="/v2/create"
              className="btn-dmi-primary text-sm"
            >
              + New Game
            </a>
          </div>

          {/* Placeholder for game grid - to be implemented */}
          <div className="bg-dmi-gray rounded-lg p-12 text-center">
            <div className="font-ui text-dmi-gray text-lg mb-4">
              No games created yet
            </div>
            <p className="font-body text-dmi-black mb-6 max-w-md mx-auto">
              Start by creating your first game using one of our professional templates.
            </p>
            <a
              href="/v2/templates"
              className="btn-dmi-primary inline-block"
            >
              Browse Templates
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dmi-black text-white py-8">
        <div className="container-dmi">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-ui text-sm text-gray-400">
              © 2024 DMI Tools Corp. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span className="badge-made-in-usa">Made in USA</span>
              <span className="font-ui text-sm text-gray-400">
                Family Owned & Operated
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
