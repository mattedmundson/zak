import Image from 'next/image'
import { Navbar, NavbarSection } from '@/components/navbar'
import { NavLinks, MobileNavLinks } from '@/components/nav-links'
import { ContactForm } from '@/components/contact-form'
import { PillBadge } from '@/components/badge'
import { InstagramCarousel } from '@/components/instagram-carousel'

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

export default async function Home() {
  return (
    <div className="bg-white">
      {/* Home Section */}
      <section id="home" className="relative w-full min-h-screen">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-8 pb-24 pt-32 lg:col-span-7 lg:px-0 lg:pb-48 lg:pt-40 xl:col-span-6">
            <div className="mx-auto max-w-lg lg:mx-0">
              <PillBadge className="mb-4 -rotate-1">Nutrition Consultant</PillBadge>
              <h1>
                Hey, I&apos;m Zak
              </h1>
              <p className="mt-6 text-lg text-slate-600">
                I spent years letting my gut run the show. Now I help others take back control through the lower FODMAP approach — with practical advice, real food solutions, and guidance from someone who&apos;s been there.
              </p>
              <p className="mt-4 text-sm font-medium text-slate-500">
                BSc Nutrition · Monash FODMAP Certified
              </p>
              <div className="mt-10 flex items-center gap-4">
                <a
                  href="#recipe-book"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-bold text-white transition-colors hover:bg-gray-700"
                >
                  Get New Recipe Book
                </a>
                <a
                  href="#fodmap"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-white transition-transform hover:scale-110"
                  aria-label="Scroll down"
                >
                  <svg
                    className="h-5 w-5 text-black"
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
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <Image
              alt="Zak, Nutrition Consultant"
              src="/zak-xl.webp"
              width={2000}
              height={2665}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="aspect-[3/4] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            />
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <header className="sticky top-0 z-50 bg-black">
        <div className="max-w-7xl mx-auto px-8">
          <Navbar>
            <a href="#home" className="flex-none font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
              Zak.
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

        {/* FODMAP Section */}
        <section id="fodmap" className="relative w-full bg-gray-50">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl">
              <h2 className="mb-6">Supporting your lower FODMAP journey</h2>
              <div className="prose prose-lg prose-slate max-w-none">
                <p>
                  Living with IBS doesn&apos;t mean living in fear of food. I provide practical support to help you understand your triggers, expand your diet, and enjoy eating again.
                </p>
              </div>
            </div>

            {/* Three Cards */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {/* Card 1 */}
              <div className="relative">
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-black" />
                <div className="relative bg-white p-8 lg:p-10 h-full border border-black">
                  <span className="block text-6xl lg:text-7xl font-bold leading-none mb-6 text-gray-300">
                    01
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    Understanding FODMAPs
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Learn what FODMAPs are, why they affect you, and how to navigate the elimination and reintroduction process without the overwhelm.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative">
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-black" />
                <div className="relative bg-white p-8 lg:p-10 h-full border border-black">
                  <span className="block text-6xl lg:text-7xl font-bold leading-none mb-6 text-gray-300">
                    02
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    Practical Meal Planning
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Get real food solutions that fit your life — not restrictive diets that leave you hungry. Portion sizes, swaps, and recipes that actually work.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative">
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-black" />
                <div className="relative bg-white p-8 lg:p-10 h-full border border-black">
                  <span className="block text-6xl lg:text-7xl font-bold leading-none mb-6 text-gray-300">
                    03
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    Ongoing Support
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    From initial elimination to confident reintroduction, I&apos;m here to guide you through each stage so you can build a sustainable relationship with food.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recipe Book Section */}
        <section id="recipe-book" className="relative w-full py-16 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-8">
            <div className="relative">
              {/* Offset shadow */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-5 md:-right-5 w-full h-full bg-black" />

              {/* Main image with content */}
              <div
                className="relative z-10 aspect-[2/3] md:aspect-video overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1920&q=80)',
                }}
              >
                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.65) 100%)',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 lg:p-16">
                  <div className="max-w-xl">
                    <PillBadge inverted className="mb-4 -rotate-1">Out Now</PillBadge>
                    <h2
                      className="font-bold tracking-tight leading-[0.85] mb-6 uppercase"
                      style={{
                        color: 'white',
                        fontSize: 'clamp(3rem, 10vw, 8rem)',
                        textShadow: '0 2px 30px rgba(0,0,0,0.4)'
                      }}
                    >
                      Recipe Ebook
                    </h2>
                    <p
                      className="text-xl md:text-2xl font-semibold text-white/90 mb-3"
                      style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
                    >
                      60+ gut-friendly recipes. No guesswork.
                    </p>
                    <p
                      className="text-base md:text-lg text-white/80 mb-6 leading-relaxed"
                      style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
                    >
                      Portion-controlled recipes designed for IBS. Every dish has been FODMAP-checked so you know exactly what you&apos;re eating.
                    </p>
                    <a
                      href="/recipe-ebook"
                      className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all duration-200 group"
                    >
                      Get early access
                      <svg
                        className="w-5 h-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Consultations Section */}
        <section id="consultations" className="relative w-full bg-gray-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6">1:1 Consultations.</h2>
              <p className="text-xl text-slate-600 mb-8">
                Personalised, one-on-one support to help you navigate your lower FODMAP journey with confidence.
              </p>
              <div className="prose prose-lg prose-slate max-w-none">
                <p>
                  Whether you&apos;re just starting out or need help troubleshooting, I&apos;ll be here to guide you through elimination, reintroduction, and building a diet that works for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* My Approach Section */}
        <section id="approach" className="relative w-full bg-white">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl">
              <PillBadge className="mb-4 -rotate-1">My Approach</PillBadge>
              <h2 className="mb-6">The Three Stages</h2>
              <div className="prose prose-lg prose-slate max-w-none">
                <p>
                  Managing IBS through diet isn&apos;t about restriction forever. It&apos;s about understanding your body through a structured process.
                </p>
              </div>
            </div>

            {/* Three Cards */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {/* Card 1 */}
              <div className="relative">
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-black" />
                <div className="relative bg-white p-8 lg:p-10 h-full border border-black">
                  <span className="block text-6xl lg:text-7xl font-bold leading-none mb-6 text-gray-300">
                    01
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    Elimination
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    We start by reducing FODMAP intake to give your gut a break and establish a baseline. This isn&apos;t about cutting everything out — it&apos;s about being strategic.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative">
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-black" />
                <div className="relative bg-white p-8 lg:p-10 h-full border border-black">
                  <span className="block text-6xl lg:text-7xl font-bold leading-none mb-6 text-gray-300">
                    02
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    Reintroduction
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Once symptoms settle, we systematically test FODMAP groups to identify your personal triggers. This is where the real learning happens.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative">
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-black" />
                <div className="relative bg-white p-8 lg:p-10 h-full border border-black">
                  <span className="block text-6xl lg:text-7xl font-bold leading-none mb-6 text-gray-300">
                    03
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    Personalisation
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Finally, we build a sustainable, personalised diet based on what you&apos;ve learned — expanding your food choices while keeping symptoms in check.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* My Story Section */}
        <section id="my-story" className="relative w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6">My Story</h2>
              <p className="text-xl text-slate-600 mb-12">
                From struggling with IBS to helping others take back control of their gut health — here&apos;s how I got here.
              </p>

              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">The Struggle</h3>
                  <div className="prose prose-lg prose-slate max-w-none">
                    <p>
                      For three years, IBS ran my life. Every meal felt like a gamble. I&apos;d avoid restaurants, cancel plans, and spend hours researching what I could and couldn&apos;t eat — only to still get it wrong. The bloating, the cramps, the unpredictability. It wasn&apos;t just uncomfortable — it was exhausting.
                    </p>
                    <p>
                      I tried everything. Cutting out dairy. Going gluten-free. Following generic advice from the internet. But nothing stuck, and nothing really worked. I felt like I was shrinking my diet down to nothing, and still suffering.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">The Turning Point</h3>
                  <div className="prose prose-lg prose-slate max-w-none">
                    <p>
                      Eventually, I got tired of guessing. I decided to actually understand what was going on — so I studied nutrition. I learned about FODMAPs, about how the gut works, and about why so much of the advice out there misses the mark.
                    </p>
                    <p>
                      And slowly, things started to change. Not because I found a magic cure, but because I finally understood my own body. I learned what triggered my symptoms, what I&apos;d been avoiding unnecessarily, and how to reintroduce foods without fear.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Where I Am Now</h3>
                  <div className="prose prose-lg prose-slate max-w-none">
                    <p>
                      Today, I eat without stress. I go to restaurants, try new things, and actually enjoy food again. My symptoms aren&apos;t completely gone — but they&apos;re manageable, predictable, and no longer in control.
                    </p>
                    <p>
                      More importantly, I&apos;ve built a life where food isn&apos;t the enemy. And that&apos;s what I want to help you do too.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Why I Do This</h3>
                  <div className="prose prose-lg prose-slate max-w-none">
                    <p>
                      I know how isolating it feels to have a gut that doesn&apos;t cooperate. I know how frustrating it is to feel like you&apos;re doing everything right and still struggling. And I know how much better life gets when you finally understand what&apos;s going on.
                    </p>
                    <p>
                      That&apos;s why I created this space — to share what I&apos;ve learned, offer practical support, and help you take back control of your gut, one meal at a time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="-my-4 flex gap-5 py-4 pb-16 sm:gap-8 overflow-x-auto px-8 lg:justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl rotate-2">
              <Image
                src="/Woodworker-1.webp"
                alt="Woodworking"
                width={800}
                height={889}
                sizes="(max-width: 640px) 176px, 288px"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl -rotate-2">
              <Image
                src="/Woodworker-2.webp"
                alt="Woodworking"
                width={800}
                height={889}
                sizes="(max-width: 640px) 176px, 288px"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl rotate-2">
              <Image
                src="/Woodworker-3.webp"
                alt="Woodworking"
                width={800}
                height={889}
                sizes="(max-width: 640px) 176px, 288px"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl rotate-2">
              <Image
                src="/Woodworker-4.webp"
                alt="Woodworking"
                width={800}
                height={889}
                sizes="(max-width: 640px) 176px, 288px"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-gray-100 sm:w-72 sm:rounded-2xl -rotate-2">
              <Image
                src="/Woodworker-5.webp"
                alt="Woodworking"
                width={800}
                height={889}
                sizes="(max-width: 640px) 176px, 288px"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-8 pb-16">
            <div className="max-w-3xl mx-auto">
              <p className="mt-4 text-gray-600">Life outside of IBS.</p>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="relative w-full bg-white">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-12">What clients say</h2>
              <blockquote className="text-2xl text-gray-700 leading-relaxed">
                &ldquo;Working with Zak gave me the confidence to try foods I&apos;d been avoiding for years. His practical approach and genuine understanding made all the difference.&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-14 w-14 overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face"
                    alt="Sarah M."
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah M.</p>
                  <p className="text-sm text-gray-500">Coaching Client</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <InstagramCarousel
          id="instagram"
          urls={[
            'https://www.instagram.com/reel/DSvGeSKjEcT/',
            'https://www.instagram.com/reel/DSNibX6DBhb/',
            'https://www.instagram.com/reel/DTBMfckjJpb/',
            'https://www.instagram.com/reel/DTswmPSjKoU/',
          ]}
          ctaText="Follow @zakthenutritionist"
          ctaHref="https://www.instagram.com/zakthenutritionist/"
        />

        {/* Contact Section */}
        <section id="contact" className="relative w-full bg-gray-50">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6">Ready to take back control?</h2>
              <p className="text-xl text-slate-600 mb-12">
                Whether you&apos;re looking for 1:1 support, practical recipes, or just want to learn more about managing IBS through diet, I&apos;m here to help.
              </p>
              <ContactForm />
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
