'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { ContactCTA } from '@/components/sections';
import { Calendar, ArrowRight, Tag, Clock } from 'lucide-react';
interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'hyatt-regency-completion',
    title: 'CMS Completes Hyatt Regency Kathmandu Interior Fit-Out',
    excerpt: 'Successfully delivered the complete interior fit-out for 300+ rooms including lobby, restaurants, and conference facilities at the prestigious Hyatt Regency Kathmandu.',
    category: 'Projects',
    date: 'January 2026',
    readTime: '3 min read',
    image: '/images/projects/hospitality.jpg',
    featured: true,
  },
  {
    id: 'hunter-douglas-partnership',
    title: 'New Partnership with Hunter Douglas for Premium Facade Solutions',
    excerpt: 'CMS expands its facade solutions portfolio through an exclusive partnership with Hunter Douglas, bringing world-class architectural products to Nepal.',
    category: 'Partnership',
    date: 'January 2026',
    readTime: '2 min read',
    image: '/images/products/facade.jpg',
  },
  {
    id: '200-projects-milestone',
    title: 'Celebrating 200+ Successfully Delivered Projects Across Nepal',
    excerpt: 'A major milestone achievement as CMS reaches over 200 completed projects spanning hospitality, healthcare, corporate, and residential sectors.',
    category: 'Achievement',
    date: 'December 2025',
    readTime: '4 min read',
    image: '/images/hero/project-1.jpg',
  },
  {
    id: 'mep-expansion',
    title: 'CMS Expands MEP Services Division with New Technical Team',
    excerpt: 'Strengthening our mechanical, electrical, and plumbing services capabilities with the addition of experienced engineers and technicians.',
    category: 'Company News',
    date: 'November 2025',
    readTime: '2 min read',
    image: '/images/hero/project-5.jpg',
  },
  {
    id: 'green-building-initiative',
    title: 'CMS Launches Green Building Initiative for Sustainable Construction',
    excerpt: 'Introducing eco-friendly construction practices and sustainable materials to reduce environmental impact across all projects.',
    category: 'Sustainability',
    date: 'October 2025',
    readTime: '3 min read',
    image: '/images/hero/project-3.jpg',
  },
  {
    id: 'nepal-medical-center',
    title: 'Nepal Medical Center Project Wins Healthcare Design Excellence Award',
    excerpt: 'Our interior fit-out work at Nepal Medical Center recognized for exceptional design and execution in healthcare facilities.',
    category: 'Awards',
    date: 'September 2025',
    readTime: '2 min read',
    image: '/images/hero/project-4.jpg',
  },
  {
    id: 'iko-roofing-launch',
    title: 'Introducing IKO Premium Roofing Systems to Nepal Market',
    excerpt: 'CMS brings internationally acclaimed IKO roofing solutions to Nepal, offering superior durability and weather protection.',
    category: 'Products',
    date: 'August 2025',
    readTime: '3 min read',
    image: '/images/hero/project-2.jpg',
  },
  {
    id: 'training-program',
    title: 'CMS Launches Skill Development Program for Construction Workers',
    excerpt: 'Investing in workforce development through comprehensive training programs focused on safety, quality, and modern construction techniques.',
    category: 'CSR',
    date: 'July 2025',
    readTime: '4 min read',
    image: '/images/hero/project-1.jpg',
  },
];

const CATEGORIES = ['All', 'Projects', 'Partnership', 'Achievement', 'Company News', 'Products', 'Awards', 'CSR', 'Sustainability'];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  return (
    <motion.article
      variants={fadeInUp}
      custom={index * 0.05}
      className="group bg-white rounded-xl overflow-hidden border border-neutral-200 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {article.readTime}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {article.title}
        </h3>

        <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <span className="inline-flex items-center gap-1 text-accent font-medium text-sm group-hover:gap-2 transition-all">
          Read More
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </motion.article>
  );
}

function FeaturedNewsCard({ article }: { article: NewsArticle }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="group bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-lg"
    >
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-neutral-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-block px-4 py-1.5 bg-accent text-white text-sm font-semibold rounded-full">
              Featured
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-neutral-100 rounded-full">
              <Tag className="w-3 h-3" />
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4 group-hover:text-accent transition-colors">
            {article.title}
          </h2>

          <p className="text-neutral-600 leading-relaxed mb-6">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent-700 transition-colors cursor-pointer">
              Read Full Story
              <ArrowRight className="w-4 h-4" />
            </span>
            <span className="text-sm text-neutral-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function NewsroomPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const featuredArticle = NEWS_ARTICLES.find(a => a.featured);
  const filteredArticles = NEWS_ARTICLES.filter(article => {
    if (selectedCategory === 'All') return !article.featured;
    return article.category === selectedCategory && !article.featured;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900 py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
            >
              Newsroom
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Latest News & Updates
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="mt-6 text-xl text-neutral-300"
            >
              Stay updated with the latest news, project completions, partnerships, and achievements from CMS Trading & Contracting.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-12 lg:py-16 bg-neutral-50">
          <Container>
            <FeaturedNewsCard article={featuredArticle} />
          </Container>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-neutral-200 sticky top-0 z-20">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* News Grid */}
      <section className="py-16 lg:py-20 bg-neutral-50">
        <Container>
          <AnimatedSection>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))}
            </div>
          </AnimatedSection>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-neutral-500">No articles found in this category.</p>
            </div>
          )}

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-full hover:border-accent hover:text-accent transition-colors">
              Load More Articles
            </button>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Stay Informed
            </h2>
            <p className="text-neutral-600 mb-8">
              Subscribe to our newsletter for the latest updates on projects, partnerships, and industry insights.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <ContactCTA />
    </>
  );
}
