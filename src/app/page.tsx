import { Navbar, NavbarSection } from '@/components/navbar'
import { NavLinks, MobileNavLinks } from '@/components/nav-links'
import { ContactForm } from '@/components/contact-form'
import { LatestEpisode } from '@/components/latest-episode'
import { GuestAppearances } from '@/components/guest-appearances'

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

export default async function Home() {
  const yearsInEcommerce = new Date().getFullYear() - 2002

  return (
    <div className="bg-white">
      {/* Home Section */}
      <section id="home" className="relative w-full min-h-screen">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-8 pb-24 pt-32 lg:col-span-7 lg:px-0 lg:pb-48 lg:pt-40 xl:col-span-6">
            <div className="mx-auto max-w-lg lg:mx-0">
              <strong className="mb-4 block text-xs font-semibold tracking-widest uppercase text-slate-500">
                Hi. I&apos;m Matt Edmundson.
              </strong>
              <h1>
                eCommercer, podcaster, pastor and accidental woodworker.
              </h1>
              <a
                href="#ecommercer"
                className="mt-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black transition-transform hover:scale-110"
                aria-label="Scroll to eCommercer section"
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <img
              alt="Matt Edmundson, ecommerce entrepreneur"
              src="/matt-hero.webp"
              className="aspect-[3/4] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            />
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <header className="sticky top-0 z-50 bg-black">
        <div className="max-w-7xl mx-auto px-8">
          <Navbar>
            <a href="#home" className="flex-none">
              <img src="/matt-logo-white.svg" alt="Matt Edmundson Logo" className="h-8" />
            </a>
            <NavbarSection className="max-lg:hidden ml-4">
              <NavLinks />
            </NavbarSection>
            {/* Mobile navigation */}
            <div className="lg:hidden flex-1 ml-4 min-w-0 overflow-hidden">
              <MobileNavLinks />
            </div>
          </Navbar>
        </div>
      </header>

      <main>

        {/* eCommercer Section */}
        <section id="ecommercer" className="relative w-full bg-gray-50">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6">eCommercer</h2>
              <div className="prose prose-lg prose-slate max-w-none">
                <p>
                  For over {yearsInEcommerce} years, I&apos;ve been knee-deep in the world of ecommerce. Started my first online store in the late 90s, sold it in 2002, and haven&apos;t looked back since. Along the way, I&apos;ve built, failed at, or sold over 20 online stores. Some spectacular successes. Some spectacular failures. All spectacular lessons.
                </p>
                <p>
                  These days, I run <strong>Aurion</strong> - where we help Digital Davids build businesses that are genuinely worth buying, whether they choose to sell or scale. We&apos;ve generated over £75m in online sales ourselves, so we don&apos;t just talk about it. We do it.
                </p>
              </div>
              <h3 className="mt-12 text-lg font-semibold text-gray-900">Current ecommerce projects</h3>
              <div className="mt-8 grid grid-cols-1 gap-8 text-base/7 sm:grid-cols-3">
                <div className="border-l border-gray-400 pl-6">
                  <img src="/aurion-logo.svg" alt="Aurion" className="h-8 mb-2" />
                  <h3 className="pt-4 font-semibold text-gray-900">Aurion</h3>
                  <p className="pt-2 text-gray-600">We help eCommercers build online businesses worth wanting.</p>
                  <a
                    href="https://auriondigital.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold text-white hover:bg-gray-500 transition-colors"
                  >
                    Aurion
                  </a>
                </div>
                <div className="border-l border-gray-400 pl-6">
                  <img src="/vegetology-logo.svg" alt="Vegetology" className="h-8 mb-2" />
                  <h3 className="pt-4 font-semibold text-gray-900">Vegetology</h3>
                  <p className="pt-2 text-gray-600">High-quality, science-led vegan and vegetarian nutritional supplements.</p>
                  <a
                    href="https://www.vegetology.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold text-white hover:bg-gray-500 transition-colors"
                  >
                    Vegetology
                  </a>
                </div>
                <div className="border-l border-gray-400 pl-6">
                  <img src="/seven-yays-logo.svg" alt="Seven Yays" className="h-8 mb-2" />
                  <h3 className="pt-4 font-semibold text-gray-900">Seven Yays</h3>
                  <p className="pt-2 text-gray-600">Personalised advent style gift boxes for birthdays and other occasions.</p>
                  <a
                    href="https://sevenyays.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold text-white hover:bg-gray-500 transition-colors"
                  >
                    Seven Yays
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Podcaster Section */}
        <section id="podcaster" className="relative w-full">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6">Podcaster</h2>
              <div className="prose prose-lg prose-slate max-w-none">
                <p>
                  I host the eCommerce Podcast because, honestly, I love a good chat about building brilliant online businesses. Every week, I get to interview some of the brightest minds in ecommerce, and I still can&apos;t believe they say yes.
                </p>
              </div>
              <LatestEpisode />
            </div>
            <GuestAppearances />
          </div>
        </section>

        {/* Pastor Section */}
        <section id="pastor" className="relative w-full bg-gray-50">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6">Pastor</h2>
              <div className="prose prose-lg prose-slate max-w-none">
                <p>
                  It&apos;s one of life&apos;s great mysteries how I ended up helping to lead Crowd Church, where we do faith differently. We&apos;re a digital-first community that meets online, perfect for those who find God elsewhere but still want genuine connection. Faith&apos;s not for everyone, I get that. But if you&apos;re curious about exploring life&apos;s bigger questions in a down-to-earth way, we&apos;d love to have you.
                </p>
                <p>
                  I&apos;m particularly passionate about where faith and business intersect - how we can be Digital Davids who use business to make the world better, not just busier. It&apos;s about running at giants with purpose, not just profit.
                </p>
              </div>
              <a
                href="https://crowd.church"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold text-white hover:bg-gray-500 transition-colors"
              >
                Crowd Church Website
              </a>
            </div>
          </div>
        </section>

        {/* Accidental Woodworker Section */}
        <section id="woodworker" className="relative w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6">Accidental Woodworker</h2>
              <div className="prose prose-lg prose-slate max-w-none">
                <p>
                  It all started with being broke, not inspired. When Sharon and I first got married, we had more debt than sense and needed a kitchen. Couldn&apos;t afford IKEA, but 2x4s were cheap back then. So I built our first kitchen from scratch - ironically ending up with a solid wood kitchen that cost less than flat-pack.
                </p>
                <p>
                  That was in the late 90s. These days, you&apos;ll find me in my ever expanding workshop, still making sawdust. There&apos;s something about taking raw timber and turning it into something useful that keeps me grounded. Plus, after a day of digital everything, working with your hands just makes sense.
                </p>
              </div>
            </div>
          </div>
          <div className="-my-4 flex gap-5 py-4 pb-16 sm:gap-8 overflow-x-auto px-8 lg:justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl rotate-2">
              <img
                src="/Woodworker-1.webp"
                alt="Woodworking"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl -rotate-2">
              <img
                src="/Woodworker-2.webp"
                alt="Woodworking"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl rotate-2">
              <img
                src="/Woodworker-3.webp"
                alt="Woodworking"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl rotate-2">
              <img
                src="/Woodworker-4.webp"
                alt="Woodworking"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl -rotate-2">
              <img
                src="/Woodworker-5.webp"
                alt="Woodworking"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-8 pb-16">
            <div className="max-w-3xl mx-auto">
              <p className="mt-4 text-gray-600">Some of the wood creations.</p>
            </div>
          </div>
        </section>

        {/* Speaker Section */}
        <section id="speaker" className="relative w-full bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6">Speaker</h2>
              <div className="prose prose-lg prose-slate max-w-none">
                <p>
                  I&apos;ve been blessed to speak on stages from the States to New Zealand, in fancy hotels and local venues, about everything from ecommerce growth to faith in the marketplace. Whether it&apos;s running seminars, client events, or keynotes, I love every opportunity to share what I&apos;ve learned (and what I&apos;m still figuring out).
                </p>
                <p>
                  My favourite talks? The ones where we get real about being Digital Davids - how to build businesses worth buying whilst keeping your life intact. I speak about ecommerce strategy, podcasting for growth, and about how life and business actually work together in the real world.
                </p>
                <p>
                  If you need someone who&apos;ll skip the corporate waffle and deliver authentic insights with a few laughs along the way, let&apos;s chat.
                </p>
              </div>
            </div>
          </div>
          <div className="-my-4 flex gap-5 py-4 pb-16 sm:gap-8 overflow-x-auto px-8 lg:justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl rotate-2">
              <img
                src="/Speaker-1.webp"
                alt="Speaking"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl -rotate-2">
              <img
                src="/Speaker-2.webp"
                alt="Speaking"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl rotate-2">
              <img
                src="/Speaker-3.webp"
                alt="Speaking"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-8 pb-16">
            <div className="max-w-3xl mx-auto">
              <p className="mt-4 text-gray-600">Apparently I use my hands a lot when I speak.</p>
            </div>
          </div>
        </section>

        {/* Meet the Family Section */}
        <section id="family" className="relative w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6">Meet the Family</h2>
              <div className="mt-12">
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="/family.webp"
                    alt="Matt, Sharon, Josh, Zak, Zoe"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-4 text-gray-600">Matt, Sharon, Josh & Abi, Zak, Zoe</p>
              </div>
            </div>
          </div>
          <div className="-my-4 flex gap-5 py-4 pb-16 sm:gap-8 overflow-x-auto px-8 lg:justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl rotate-2">
              <img
                src="/family-1.webp"
                alt="Family"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl -rotate-2">
              <img
                src="/family-2.webp"
                alt="Family"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl rotate-2">
              <img
                src="/family-3.webp"
                alt="Family"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl rotate-2">
              <img
                src="/family-4.webp"
                alt="Family"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl -rotate-2">
              <img
                src="/family-5.webp"
                alt="Family"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-8 pb-16">
            <div className="max-w-3xl mx-auto">
              <p className="mt-4 text-gray-600">Our family has extended over the years</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative w-full bg-gray-50">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6">Want to Connect?</h2>
              <p className="text-xl text-slate-600 mb-12">
                I&apos;m always up for a conversation about ecommerce, building businesses worth buying, or why Liverpool FC is clearly the greatest football club in the world.
              </p>
              <div className="flex gap-4 mb-8">
                <a
                  href="https://www.linkedin.com/in/mattedmundson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  aria-label="LinkedIn"
                >
                  <img src="/linkedin-logo.svg" alt="LinkedIn" className="h-8 w-8" />
                </a>
                <a
                  href="https://www.instagram.com/mattedmundson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  aria-label="Instagram"
                >
                  <img src="/instagram-logo.svg" alt="Instagram" className="h-8 w-8" />
                </a>
              </div>
              <ContactForm />
              <div className="mt-16 text-gray-600">
                <p className="font-semibold text-gray-900">Aurion</p>
                <p>3b Phoenix Park</p>
                <p>Goodlass Road</p>
                <p>Liverpool</p>
                <p>L24 9HL</p>
                <p className="mt-4">
                  Tel: <a href="tel:+441514332520" className="hover:text-black transition-colors">+44 (0)151 433 2520</a>
                </p>
              </div>
              <p className="text-slate-400 italic mt-16">
                P.S. If you&apos;re reading this far, you&apos;re either really interested or really bored. Either way, thanks for sticking around.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
