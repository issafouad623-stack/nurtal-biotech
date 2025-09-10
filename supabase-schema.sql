-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Nurtal Editorial',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url TEXT,
  video_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('AI', 'Biotechnology', 'Research', 'Innovation', 'Startup')),
  tags TEXT[] DEFAULT '{}',
  read_time INTEGER DEFAULT 1,
  featured BOOLEAN DEFAULT FALSE,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table for authentication
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_sessions table for session management
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_articles_updated_at 
  BEFORE UPDATE ON articles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at 
  BEFORE UPDATE ON admin_users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (password: admin123)
-- You should change this password immediately after setup
INSERT INTO admin_users (email, password_hash) 
VALUES ('admin@nurtal.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.pnpw.2')
ON CONFLICT (email) DO NOTHING;

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
)
ON CONFLICT (slug) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for articles (public read, admin write)
CREATE POLICY "Articles are viewable by everyone" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Articles are insertable by authenticated users" ON articles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Articles are updatable by authenticated users" ON articles
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Articles are deletable by authenticated users" ON articles
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for admin tables (admin only)
CREATE POLICY "Admin users are viewable by service role" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Admin sessions are viewable by service role" ON admin_sessions
  FOR ALL USING (auth.role() = 'service_role');