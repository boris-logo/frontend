import React, { useState } from 'react';

const HomelinkExploreMore = () => {
  const [activeInterest, setActiveInterest] = useState(null);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleQuickLinkClick = (path) => {
    setActiveInterest(path);
    // In a real app, you would navigate or fetch personalized content
    setTimeout(() => setActiveInterest(null), 2000);
  };

  const handleEmailSignup = (e) => {
    e.preventDefault();
    setEmailSubmitted(true);
    setTimeout(() => setEmailSubmitted(false), 3000);
  };

  const exploreCards = [
    {
      icon: "🏠",
      title: "Smart Living Guides",
      description: "Tips, tools, and tech to make your home work for you.",
      link: "/guides",
      color: "from-emerald-50 to-teal-50",
    },
    {
      icon: "🔗",
      title: "Local Home Services",
      description: "Find trusted pros near you — from plumbers to interior designers.",
      link: "/services",
      color: "from-blue-50 to-cyan-50",
    },
    {
      icon: "💡",
      title: "Homelink Community",
      description: "Join forums, share stories, and get advice from real homeowners.",
      link: "/community",
      color: "from-amber-50 to-orange-50",
    },
    {
      icon: "📘",
      title: "Resource Library",
      description: "E-books, checklists, and templates for home projects.",
      link: "/resources",
      color: "from-purple-50 to-pink-50",
    },
    {
      icon: "🛠️",
      title: "DIY Projects",
      description: "Step-by-step ideas to upgrade your space on a budget.",
      link: "/diy",
      color: "from-stone-50 to-neutral-50",
    },
    {
      icon: "🎥",
      title: "Video Tours",
      description: "See smart homes in action with exclusive walkthroughs.",
      link: "/videos",
      color: "from-rose-50 to-red-50",
    },
  ];

  const quickLinks = [
    { label: "💸 I want to lower my energy bills.", path: "/energy-tips" },
    { label: "🔒 I'm looking for home security tips.", path: "/security" },
    { label: "⚡ I need a reliable electrician.", path: "/electricians" },
    { label: "🎨 I love interior design inspiration.", path: "/design" },
  ];

  // Helper function to safely split label text
  const getLabelParts = (label) => {
    const emoji = label.charAt(0);
    const text = label.slice(1);
    return { emoji, text };
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-gray-50 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm">
              🔗 Welcome to Homelink
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-800 via-teal-700 to-emerald-600 bg-clip-text text-transparent mb-4 tracking-tight">
              Explore More with Homelink
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Your journey to smarter, connected living starts here.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="inline-flex items-center gap-1 text-sm text-slate-500 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                ✨ smart home
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-slate-500 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                🔗 local pros
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-slate-500 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                💬 community
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        {/* Explore Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 border-l-4 border-emerald-500 pl-4">
              Explore by Interest
            </h2>
            <span className="text-sm text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              6 categories
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreCards.map((card, idx) => (
              <a
                key={idx}
                href={card.link}
                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-30 group-hover:opacity-50 transition-opacity`} />
                <div className="relative p-6">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-emerald-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <span className="inline-flex items-center text-emerald-600 font-medium text-sm gap-1 group-hover:gap-2 transition-all">
                    Explore →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Featured Pick of the Month */}
        <div className="mb-16 bg-gradient-to-r from-teal-900 to-emerald-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-8 md:p-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                ✨ Featured Pick of the Month
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                5 Ways to Automate Your Rental Without Drilling a Hole
              </h3>
              <p className="text-emerald-100 mb-6 text-base leading-relaxed">
                A must-read for renters who want smart comfort without losing their deposit — 
                wireless, renter-friendly, and totally removable.
              </p>
              <a
                href="/featured/rental-automation"
                className="inline-flex items-center gap-2 bg-white text-teal-800 font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-50 transition shadow-md"
              >
                Read Article
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            <div className="md:w-2/5 bg-teal-800/30 flex items-center justify-center p-6 md:p-8">
              <div className="text-6xl md:text-7xl">🏠🔌</div>
            </div>
          </div>
        </div>

        {/* Personalized Quick Links Section */}
        <div className="mb-16 bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">✨ Not sure where to start?</h2>
                <p className="text-slate-500">Tell us what matters most to you right now:</p>
              </div>
              {activeInterest && (
                <div className="bg-emerald-50 text-emerald-700 text-sm px-4 py-2 rounded-full animate-pulse">
                  ✅ Opening {activeInterest} for you...
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {quickLinks.map((link, idx) => {
                const { emoji, text } = getLabelParts(link.label);
                return (
                  <button
                    key={idx}
                    onClick={() => handleQuickLinkClick(link.path)}
                    className="text-left bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl px-4 py-3 transition-all text-slate-700 font-medium text-sm flex items-center gap-2 group"
                  >
                    <span className="text-lg">{emoji}</span>
                    <span className="flex-1">{text}</span>
                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-sm text-slate-400">
              💡 Get a custom path — we'll remember your preferences
            </div>
          </div>
        </div>

        {/* Resource Library teaser + email signup */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Resource Library card */}
          <div className="bg-gradient-to-br from-indigo-50 to-slate-50 rounded-2xl p-6 border border-indigo-100">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-3xl mb-2">📚</div>
                <h3 className="text-xl font-bold text-slate-800">Resource Library</h3>
                <p className="text-slate-500 text-sm mt-1 mb-4">
                  E-books, checklists, renovation templates, and smart home planners.
                </p>
                <a href="/library" className="inline-flex items-center gap-1 text-indigo-600 font-semibold text-sm">
                  Browse all resources
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
              <div className="text-5xl opacity-40">📘</div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs bg-white/60 px-2 py-1 rounded-full">🏡 moving checklist</span>
              <span className="text-xs bg-white/60 px-2 py-1 rounded-full">💡 energy audit</span>
              <span className="text-xs bg-white/60 px-2 py-1 rounded-full">🔧 DIY planner</span>
            </div>
          </div>

          {/* Email alerts CTA */}
          <div className="bg-slate-800 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex flex-col h-full">
              <div className="mb-3">
                <span className="text-3xl">📩</span>
                <h3 className="text-xl font-bold mt-2">Get Explore Alerts by Email</h3>
                <p className="text-slate-300 text-sm mt-1">
                  Weekly inspiration, fresh guides, and local service updates.
                </p>
              </div>
              <form onSubmit={handleEmailSignup} className="mt-4 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-2 rounded-xl text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-5 py-2 rounded-xl transition shadow-md"
                >
                  Subscribe
                </button>
              </form>
              {emailSubmitted && (
                <p className="text-emerald-300 text-sm mt-3 animate-bounce">
                  ✨ Thanks! You're on the list — welcome to Homelink.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* final CTA row before footer */}
        <div className="text-center py-8 border-t border-slate-200 mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            Ready to explore deeper?
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto mb-6">
            Homelink is updated weekly with fresh content, tools, and local connections.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/explore"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-md"
            >
              🔍 Start Exploring Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/alerts"
              className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:border-emerald-400 text-slate-700 font-semibold px-6 py-3 rounded-xl transition"
            >
              📬 Explore alerts
            </a>
          </div>
        </div>

        {/* subtle footer note */}
        <div className="text-center text-xs text-slate-400 mt-12 pt-6 border-t border-slate-100">
          Homelink • smarter connected living • © 2025
        </div>
      </div>
    </div>
  );
};

export default HomelinkExploreMore;