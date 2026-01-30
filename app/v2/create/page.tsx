export default function V2CreatePage() {
  return (
    <div className="min-h-screen flex flex-col bg-dmi-gray">
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
            <span className="badge-made-in-usa">Made in USA</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <div className="container-dmi">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="font-display text-3xl md:text-4xl text-dmi-black mb-2">
                Create New Game
              </h1>
              <p className="font-body text-dmi-gray">
                Choose a template and customize it for your needs.
              </p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-dmi-red text-white flex items-center justify-center font-ui font-bold text-sm">
                  1
                </div>
                <span className="font-ui text-sm font-medium text-dmi-black">
                  Select Template
                </span>
              </div>
              <div className="flex-1 h-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-ui font-bold text-sm">
                  2
                </div>
                <span className="font-ui text-sm font-medium text-gray-500">
                  Customize
                </span>
              </div>
              <div className="flex-1 h-px bg-gray-300" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-500 flex items-center justify-center font-ui font-bold text-sm">
                  3
                </div>
                <span className="font-ui text-sm font-medium text-gray-500">
                  Publish
                </span>
              </div>
            </div>

            {/* Template Selection Grid - Placeholder */}
            <div className="bg-white rounded-lg p-6 md:p-8 shadow-sm">
              <h2 className="font-display text-xl text-dmi-black mb-6">
                Select a Game Template
              </h2>

              {/* Grid of template cards - to be implemented */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="card-dmi p-4 cursor-pointer group"
                  >
                    <div className="aspect-video bg-dmi-gray rounded mb-3 flex items-center justify-center">
                      <span className="font-ui text-gray-400 text-sm">
                        Preview
                      </span>
                    </div>
                    <h3 className="font-ui font-semibold text-dmi-black group-hover:text-dmi-red transition-colors">
                      Template {i}
                    </h3>
                    <p className="font-body text-sm text-dmi-gray mt-1">
                      Brief description of the game template.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-8">
              <a
                href="/v2"
                className="btn-dmi-secondary"
              >
                Cancel
              </a>
              <button
                className="btn-dmi-primary"
                disabled
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
