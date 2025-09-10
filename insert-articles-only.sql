-- Simple script to just insert articles with images
-- This will get your photos working immediately

-- Insert default admin user if it doesn't exist (for login to work)
INSERT INTO admin_users (email, password_hash) 
VALUES ('admin@nurtal.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.pnpw.2')
ON CONFLICT (email) DO NOTHING;

-- Clear existing sample articles and insert fresh ones with images
DELETE FROM articles WHERE slug IN (
  'welcome-to-our-biotech-news-platform',
  'ai-powered-drug-discovery-breakthrough', 
  'crispr-gene-editing-advances-cancer-treatment'
);

-- Insert sample articles with beautiful biotech images
INSERT INTO articles (title, excerpt, content, author, category, tags, featured, slug, status, image_url) VALUES
(
  'Welcome to Our Biotech News Platform',
  'This is our first article showcasing the new content management system with cutting-edge biotechnology insights.',
  '<h2>Welcome to the Future of Biotech News</h2><p>This article demonstrates our new content management system built with Next.js and Supabase, designed specifically for the biotechnology industry.</p><p>Our platform features:</p><ul><li>Rich text editing for scientific content</li><li>High-quality image uploads for research visuals</li><li>Category management for different biotech sectors</li><li>Tag system for precise content organization</li><li>Draft and publish workflow for editorial control</li><li>Secure authentication for content creators</li></ul><p>Stay tuned for groundbreaking discoveries, research breakthroughs, and industry insights that will shape the future of biotechnology.</p>',
  'Nurtal Editorial',
  'Biotechnology',
  ARRAY['welcome', 'cms', 'biotech', 'platform'],
  true,
  'welcome-to-our-biotech-news-platform',
  'published',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
),
(
  'AI-Powered Drug Discovery Breakthrough',
  'Researchers announce major breakthrough in using artificial intelligence for accelerated drug discovery processes, potentially reducing development time from decades to years.',
  '<h2>Revolutionary AI Drug Discovery Platform</h2><p>A team of international researchers has developed a groundbreaking artificial intelligence system that can predict molecular behavior with unprecedented accuracy, marking a new era in pharmaceutical development.</p><h3>Key Breakthrough Features</h3><p>This revolutionary AI system transforms drug discovery by:</p><ul><li><strong>Molecular Analysis:</strong> Processing millions of molecular combinations in minutes rather than months</li><li><strong>Predictive Modeling:</strong> Identifying potential side effects before expensive clinical trials begin</li><li><strong>Automated Optimization:</strong> Continuously refining drug compounds for maximum efficacy</li><li><strong>Target Identification:</strong> Discovering novel therapeutic targets for complex diseases</li></ul><p>The implications are staggering - this technology could accelerate the development of treatments for cancer, Alzheimer''s, and rare genetic disorders, potentially saving millions of lives and billions in research costs.</p><h3>Clinical Impact</h3><p>Early trials show promise for treating previously incurable conditions, with the first AI-designed drugs expected to enter human trials within the next two years.</p>',
  'Dr. Sarah Chen',
  'AI',
  ARRAY['artificial-intelligence', 'drug-discovery', 'research', 'breakthrough', 'pharmaceuticals'],
  true,
  'ai-powered-drug-discovery-breakthrough',
  'published',
  'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
),
(
  'CRISPR Gene Editing Advances Cancer Treatment',
  'Latest clinical trials show remarkable success rates using CRISPR-Cas9 technology to target cancer cells with unprecedented precision.',
  '<h2>CRISPR Technology Revolutionizes Cancer Therapy</h2><p>In a groundbreaking development, researchers have achieved remarkable success using CRISPR-Cas9 gene editing technology to treat various forms of cancer, offering new hope for patients worldwide.</p><h3>Clinical Trial Results</h3><p>The latest phase II trials demonstrate:</p><ul><li><strong>85% Success Rate:</strong> Significant tumor reduction in early-stage patients</li><li><strong>Minimal Side Effects:</strong> Dramatically reduced adverse reactions compared to traditional chemotherapy</li><li><strong>Precision Targeting:</strong> Selective destruction of cancer cells while preserving healthy tissue</li><li><strong>Personalized Treatment:</strong> Customized therapy based on individual genetic profiles</li></ul><h3>Future Implications</h3><p>This represents a paradigm shift toward personalized cancer treatment, where each patient receives therapy tailored to their unique genetic makeup and tumor characteristics.</p>',
  'Dr. Michael Rodriguez',
  'Research',
  ARRAY['CRISPR', 'gene-editing', 'cancer', 'clinical-trials', 'precision-medicine'],
  false,
  'crispr-gene-editing-advances-cancer-treatment',
  'published',
  'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
);