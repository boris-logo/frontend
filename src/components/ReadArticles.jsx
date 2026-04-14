import React, { useState } from 'react';

const ReadArticles = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const handleSaveArticle = () => {
    setIsSaved(!isSaved);
    // In a real app, you would save to localStorage or backend
  };

  const handleShare = () => {
    setShowShareTooltip(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setShowShareTooltip(false), 2000);
  };

  const relatedArticles = [
    {
      id: 1,
      title: "10 Smart Plugs That Won't Break Your Budget",
      excerpt: "Affordable ways to make any appliance smart without complicated setup.",
      readTime: "5 min read",
      image: "🔌",
      link: "/articles/smart-plugs",
    },
    {
      id: 2,
      title: "Renter's Guide to Smart Lighting",
      excerpt: "Transform your rental's ambiance with peel-and-stick smart lights.",
      readTime: "4 min read",
      image: "💡",
      link: "/articles/smart-lighting",
    },
    {
      id: 3,
      title: "Security for Apartments: No-Drill Solutions",
      excerpt: "Keep your rental safe with these landlord-approved security devices.",
      readTime: "6 min read",
      image: "🔒",
      link: "/articles/apartment-security",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Article Header */}
      <div className="relative bg-gradient-to-br from-teal-900 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full filter blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-sm text-emerald-200 mb-4">
              <a href="/" className="hover:text-white transition">Home</a>
              <span>→</span>
              <a href="/articles" className="hover:text-white transition">Articles</a>
              <span>→</span>
              <span className="text-white">Rental Automation</span>
            </div>
            
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-4">
              ✨ Featured Article
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              5 Ways to Automate Your Rental Without Drilling a Hole
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-200 mb-6">
              <span className="flex items-center gap-1">
                <span>✍️</span> By Homelink Team
              </span>
              <span className="flex items-center gap-1">
                <span>📅</span> March 15, 2025
              </span>
              <span className="flex items-center gap-1">
                <span>⏱️</span> 6 min read
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/20">
              <button
                onClick={handleSaveArticle}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  isSaved 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                {isSaved ? '✓ Saved' : '🔖 Save Article'}
              </button>
              
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition"
                >
                  📤 Share
                </button>
                {showShareTooltip && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                    Link copied!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-xl mb-8">
              <p className="text-emerald-800 font-semibold mb-2">🏠 For Renters, By Renters</p>
              <p className="text-gray-700">
                Living in a rental shouldn't mean living in the past. You deserve a smart home too — 
                without losing your security deposit. Here are 5 completely reversible, drill-free ways 
                to automate your space.
              </p>
            </div>

            {/* Way 1 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-2xl">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Smart Plugs: The Gateway to Automation
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Smart plugs are the ultimate renter-friendly device. Simply plug them into any outlet, 
                then plug your regular appliances into them. Control lamps, fans, coffee makers, or 
                air purifiers from your phone or voice assistant.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 font-semibold mb-2">💡 Pro Tip:</p>
                <p className="text-gray-600">
                  Set schedules for your bedroom lamp to gradually brighten in the morning — it's like 
                  a sunrise alarm clock without any installation!
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">💰 Under $15</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">🔌 No tools needed</span>
              </div>
            </div>

            {/* Way 2 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-2xl">
                  2
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Battery-Powered Sensors for Every Room
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Motion sensors, door/window sensors, and temperature sensors now come with adhesive 
                backing and batteries that last over a year. Stick them anywhere to trigger automations 
                — like turning on lights when you walk into a room.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 font-semibold mb-2">🏠 Real Example:</p>
                <p className="text-gray-600">
                  "I put a motion sensor in my hallway that turns on a night light at 10pm. No more 
                  stubbing my toes on the way to the bathroom!"
                </p>
              </div>
            </div>

            {/* Way 3 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-2xl">
                  3
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Voice Assistants Without Wall Mounts
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Don't want to drill holes for a wall-mounted tablet? Just place a smart speaker 
                (Amazon Echo, Google Nest, or Apple HomePod) on any flat surface. They control all 
                your smart devices and don't leave a mark when you move out.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">🎤</div>
                  <p className="text-xs text-gray-600">Alexa compatible</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">🔵</div>
                  <p className="text-xs text-gray-600">Google Assistant</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">🍎</div>
                  <p className="text-xs text-gray-600">Apple HomeKit</p>
                </div>
              </div>
            </div>

            {/* Way 4 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-2xl">
                  4
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Smart Bulbs: Instant Mood Lighting
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Replace regular light bulbs with smart bulbs — they screw right in, no wiring needed. 
                Change colors, set schedules, and dim from your phone. When you move out, just put 
                the original bulbs back.
              </p>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">✨ Fun Automation Idea:</p>
                <p className="text-gray-600">
                  Set your living room lights to turn warm orange at sunset and cool blue during work 
                  hours. It transforms your space without changing a single wire!
                </p>
              </div>
            </div>

            {/* Way 5 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-2xl">
                  5
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Smart IR Blasters for Older Devices
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Have an old TV, AC unit, or fan that uses a remote control? A smart IR blaster learns 
                your remote's signals and lets you control those devices from anywhere. Just place it 
                on a shelf facing your devices — no screws required.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg">
                <p className="text-sm text-amber-800 font-semibold mb-2">⚠️ Landlord-Friendly Note:</p>
                <p className="text-gray-600">
                  Always check your lease about modifications. All these solutions are temporary and 
                  removable, but it's good to keep your landlord informed!
                </p>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-6 rounded-xl mt-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 Your First Step to a Smarter Rental</h3>
              <p className="text-gray-700 mb-4">
                Start small. Pick just one of these solutions this week — maybe a smart plug for your 
                bedroom lamp. Once you experience the convenience, you'll never want to live without it.
              </p>
              <p className="text-gray-700 font-semibold">
                Remember: Smart living isn't about permanent changes. It's about making your space work 
                for you, right now, exactly where you are.
              </p>
            </div>

            {/* Author Bio */}
            <div className="flex items-center gap-4 p-6 border-t border-b border-gray-200 my-8">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-2xl text-white">
                HL
              </div>
              <div>
                <p className="font-semibold text-gray-800">Written by Homelink Team</p>
                <p className="text-sm text-gray-500">
                  We help renters and homeowners create connected, comfortable spaces without 
                  permanent modifications or expensive contracts.
                </p>
              </div>
            </div>

            {/* Comments Section Preview */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💬 Join the Conversation</h3>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <p className="text-gray-600 mb-3">What's your favorite renter-friendly smart device?</p>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition">
                  Sign in to comment
                </button>
                <p className="text-xs text-gray-400 mt-3">12 comments so far</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <a
                key={article.id}
                href={article.link}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-32 bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center text-5xl">
                  {article.image}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-600 font-medium">{article.readTime}</span>
                    <span className="text-sm text-emerald-600 group-hover:translate-x-1 transition">
                      Read →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2">📩 Get More Articles Like This</h3>
            <p className="text-emerald-100 mb-6">
              Weekly smart home tips, renter hacks, and local service recommendations.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-teal-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-emerald-200 mt-4">No spam, unsubscribe anytime.</p>
          </div>
        </div>

        {/* Back to Explore */}
        <div className="text-center mt-12">
          <a
            href="/explore"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition"
          >
            ← Back to Explore More at Homelink
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReadArticles;