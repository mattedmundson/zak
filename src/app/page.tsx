import Image from 'next/image'
import { Navbar, NavbarSection } from '@/components/navbar'
import { NavLinks, MobileNavLinks } from '@/components/nav-links'
import { PillBadge } from '@/components/badge'
import { InstagramCarousel } from '@/components/instagram-carousel'
import { StageCards } from '@/components/stage-cards'
import { RecipeExamples } from '@/components/recipe-examples'
import { LaunchButton } from '@/components/launch-modal'
import { NewsletterForm } from '@/components/newsletter-form'
import { CountdownBadge } from '@/components/countdown-badge'

// Revalidate every hour (3600 seconds)
export const revalidate = 3600

export default async function Home() {
  return (
    <div className="bg-white">
      {/* Home Section */}
      <section id="home" className="relative w-full min-h-screen">
        <div className="flex flex-col-reverse mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="relative z-10 -mt-32 mx-4 pb-12 lg:mt-0 lg:mx-0 lg:col-span-7 lg:pb-48 lg:pt-40 xl:col-span-6">
            <div className="relative">
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-black lg:hidden" />
              <div className="relative bg-white border border-black p-8 lg:border-0 lg:bg-transparent lg:p-0">
                <div className="max-w-lg lg:mx-0">
                  <PillBadge className="mb-4 -rotate-1">Nutrition Consultant</PillBadge>
                  <h1>
                    Hey, I&apos;m Zak
                  </h1>
                  <p className="mt-6 text-lg text-slate-600">
                    I spent years letting my gut run the show. Now I help others take back control through the lower FODMAP approach, with practical advice, real food solutions, and guidance from someone who&apos;s been there.
                  </p>
                  <p className="mt-4 text-sm font-medium text-slate-500">
                    Nutritionist. IBS Survivor.
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
                    Get real food solutions that fit your life, not restrictive diets that leave you hungry. Portion sizes, swaps, and recipes that actually work.
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
                className="relative z-10 aspect-[1/2] md:aspect-video overflow-hidden bg-cover bg-center"
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
                    <CountdownBadge className="mb-4 -rotate-1" />
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
                      65 gut-friendly recipes. No guesswork.
                    </p>
                    <p
                      className="text-base md:text-lg text-white/80 mb-6 leading-relaxed"
                      style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
                    >
                      Portion-controlled recipes designed for IBS. Every dish has been FODMAP-checked so you know exactly what you&apos;re eating.
                    </p>
                    <LaunchButton className="inline-flex items-center gap-2 text-white font-semibold hover:gap-3 transition-all duration-200 group cursor-pointer">
                      Get Recipe Book
                      <svg
                        className="w-5 h-5 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </LaunchButton>
                    <p className="text-sm text-white/60 mt-2">Launching 16th February</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recipe Examples Carousel */}
            <RecipeExamples />

            {/* How It Works */}
            <div className="mt-16 md:mt-24">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">How it works</h3>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12 items-center">
                {/* Image (col 2-3) */}
                <div className="relative w-[90%] mx-auto md:w-auto md:col-start-2 md:col-span-2">
                  <div className="absolute -bottom-3 -right-3 w-full h-full bg-black" />
                  <div className="relative border border-black">
                    <Image
                      src="/recipe-ex/MM-chicken_1.webp"
                      alt="Example recipe page"
                      width={800}
                      height={1132}
                      sizes="(max-width: 768px) 60vw, 25vw"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Text + Graphic (col 4-5) */}
                <div className="md:col-span-2">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    On the cover of every recipe, you&apos;ll see one of three circles showing how gentle that meal is on digestion.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
                    All recipes in this book are lower FODMAP, this guide simply helps you choose what to prioritise when your gut is sensitive or you want a reliable, no-stress option.
                  </p>

                  {/* Difficulty Graphic */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-400 flex-shrink-0" />
                      <span className="text-lg font-semibold text-gray-900">Easy</span>
                      <svg className="w-5 h-5 text-gray-900 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-400 flex-shrink-0" />
                      <span className="text-lg font-semibold text-gray-900">Moderate</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-400 flex-shrink-0" />
                      <span className="text-lg font-semibold text-gray-900">More complex</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2 - Text left, Image right */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12 items-center mt-16 md:mt-20">
                {/* Text + ABC Graphic (col 2-3) */}
                <div className="md:col-start-2 md:col-span-2 order-2 md:order-1">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Every recipe includes a mix of nutrients, but the letter shows which type it&apos;s strongest in. Aim for one of each, A, B, and C, each day, but it&apos;s just a guide. You can repeat letters, skip one, or mix them up. Some recipes have two letters, meaning they&apos;re strong in both.
                  </p>

                  {/* ABC Graphic */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-gray-900 w-10 text-center font-[family-name:var(--font-playfair)]">A</span>
                      <span className="text-lg font-semibold text-gray-900">Veg-led nutrients</span>
                      <svg className="w-5 h-5 text-gray-900 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-gray-900 w-10 text-center font-[family-name:var(--font-playfair)]">B</span>
                      <span className="text-lg font-semibold text-gray-900">Protein-led nutrients</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl font-bold text-gray-900 w-10 text-center font-[family-name:var(--font-playfair)]">C</span>
                      <span className="text-lg font-semibold text-gray-900">Fat-led nutrients</span>
                    </div>
                  </div>
                </div>

                {/* Image (col 4-5) */}
                <div className="relative w-[90%] mx-auto md:w-auto md:col-span-2 order-1 md:order-2">
                  <div className="absolute -bottom-3 -right-3 w-full h-full bg-black" />
                  <div className="relative border border-black">
                    <Image
                      src="/recipe-ex/roasted-veg_1.webp"
                      alt="Example recipe page"
                      width={500}
                      height={707}
                      sizes="(max-width: 768px) 60vw, 25vw"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3 - Image left, Text right */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12 items-center mt-16 md:mt-20">
                {/* Image (col 2-3) */}
                <div className="relative w-[90%] mx-auto md:w-auto md:col-start-2 md:col-span-2">
                  <div className="absolute -bottom-3 -right-3 w-full h-full bg-black" />
                  <div className="relative border border-black">
                    <Image
                      src="/recipe-ex/reintro.webp"
                      alt="Reintroduction phase page"
                      width={500}
                      height={707}
                      sizes="(max-width: 768px) 60vw, 25vw"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Text (col 4-5) */}
                <div className="md:col-span-2">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">The Reintroduction Phase</h4>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Use what you learn during reintroduction to gradually expand your diet with confidence. This phase is all about discovering which foods you can enjoy, in what amounts, and which might need to be limited.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
                    To make this easier, you can follow my structured reintroduction guide, which includes specific food quantities and meal ideas that pair well with each meal.
                  </p>
                </div>
              </div>

              {/* Row 4 - Text left, Image right */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12 items-center mt-16 md:mt-20">
                {/* Text (col 2-3) */}
                <div className="md:col-start-2 md:col-span-2 order-2 md:order-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Personalisation Phase</h4>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Each personalisation page shows which FODMAPs are linked to the recipe and highlights foods in the meal, or simple swaps, that contain those FODMAPs. This helps you understand which ingredients matter for your gut.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
                    You&apos;ll also find short notes explaining how to change these foods safely and easily, without making the meal confusing or stressful.
                  </p>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-4">
                    All recipes are tasty and nutritious just as they are. Once you know which FODMAPs you tolerate, you can enjoy the freedom to add or swap ingredients confidently to suit your own body.
                  </p>
                </div>

                {/* Image (col 4-5) */}
                <div className="relative w-[90%] mx-auto md:w-auto md:col-span-2 order-1 md:order-2">
                  <div className="absolute -bottom-3 -right-3 w-full h-full bg-black" />
                  <div className="relative border border-black">
                    <Image
                      src="/recipe-ex/ramen_3.webp"
                      alt="Personalisation phase page"
                      width={800}
                      height={1132}
                      sizes="(max-width: 768px) 60vw, 25vw"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-16 md:mt-20 flex flex-col items-center">
                <LaunchButton className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-bold text-white transition-colors hover:bg-gray-700 cursor-pointer">
                  Get Recipe Book
                </LaunchButton>
                <p className="text-sm text-gray-500 mt-2">Launching 16th February</p>
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

            <StageCards />
          </div>
        </section>

        {/* My Story Section */}
        <section id="my-story" className="relative w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 pt-32 pb-24">
            <div className="max-w-3xl mx-auto">
              <h2 className="mb-6">My Story</h2>
              <p className="text-xl text-slate-600 mb-12">
                From struggling with IBS to helping others take back control of their gut health, here&apos;s how I got here.
              </p>

              <div className="space-y-12">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">The Struggle</h3>
                  <div className="prose prose-lg prose-slate max-w-none">
                    <p>
                      For three years, IBS ran my life. Every meal felt like a gamble. I&apos;d avoid restaurants, cancel plans, and spend hours researching what I could and couldn&apos;t eat, only to still get it wrong. The bloating, the cramps, the unpredictability. It wasn&apos;t just uncomfortable, it was exhausting.
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
                      Eventually, I got tired of guessing. I decided to actually understand what was going on, so I studied nutrition. I learned about FODMAPs, about how the gut works, and about why so much of the advice out there misses the mark.
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
                      Today, I eat without stress. I go to restaurants, try new things, and actually enjoy food again. My symptoms aren&apos;t completely gone, but they&apos;re manageable, predictable, and no longer in control.
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
                      That&apos;s why I created this space, to share what I&apos;ve learned, offer practical support, and help you take back control of your gut, one meal at a time.
                    </p>
                  </div>
                </div>
              </div>
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
              <h2 className="mb-6">Stay in the loop</h2>
              <p className="text-xl text-slate-600 mb-8">
                Sign up for updates on recipes, gut health tips, and new resources.
              </p>
              <NewsletterForm />
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
