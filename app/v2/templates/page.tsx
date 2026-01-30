export default function V2TemplatesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-dmi-white">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container-dmi py-4">
          <div className="flex items-center justify-between">
            <a href="/v2" className="flex items-center gap-3">
              <img
                src="https://dmitools.com/cdn/shop/files/dmi_800x470.png?v=1613785694"
                alt="DMI Tools"
                className="h-8 w-auto"
              />
              <span className="font-display text-xl text-dmi-black hidden sm:block">
                Game Factory
              </span>
            </a>
            <a
              href="/v2/create"
              className="btn-dmi-primary text-sm"
            >
              Create Game
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container-dmi">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl text-dmi-black mb-2">
              Game Templates
            </h1>
            <p className="font-body text-dmi-gray max-w-2xl">
              Browse our collection of professional arcade-style games. 
              Each template is designed with the DMI Tools brand in mind.
            </p>
          </div>

          {/* Category Filters - Placeholder */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['All', 'Action', 'Puzzle', 'Arcade', 'Strategy'].map((category, i) => (
              <button
                key={category}
                className={`font-ui text-sm px-4 py-2 rounded-full border transition-colors ${
                  i === 0
                    ? 'bg-dmi-red text-white border-dmi-red'
                    : 'bg-white text-dmi-black border-gray-300 hover:border-dmi-red'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Templates Grid - Placeholder */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <article
                key={i}
                className="card-dmi group"
              >
                <div className="aspect-[4/3] bg-dmi-gray relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-ui text-gray-400">Game Preview</span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-dmi-red/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="btn-dmi-primary bg-white text-dmi-red border-white hover:bg-transparent hover:text-white">
                      Preview
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-ui font-semibold text-dmi-black">
                      Game Template {i}
                    </h3>
                    <span className="font-ui text-xs px-2 py-1 bg-dmi-gray rounded text-dmi-black">
                      Arcade
                    </span>
                  </div>
                  <p className="font-body text-sm text-dmi-gray line-clamp-2">
                    A professional arcade game template with DMI branding and customizable features.
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="font-ui text-xs text-dmi-gray">
                      Difficulty: Medium
                    </span>
                    <a
                      href="/v2/create"
                      className="font-ui text-sm font-medium text-dmi-red hover:underline"
                    >
                      Use Template →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-dmi-secondary">
              Load More Templates
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dmi-gray py-6">
        <div className="container-dmi">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-ui text-sm text-dmi-gray">
              © 2024 DMI Tools Corp. All rights reserved.
            </div>
            <span className="badge-made-in-usa">Made in USA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
