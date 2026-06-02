const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '../content');
const DATA_DIR = path.join(__dirname, '../src/data');

/**
 * Utility to generate a slug from a title
 */
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const normalizeCoverImage = (value) => {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('/')) return trimmed;
  return `/blogs/${trimmed.replace(/^\.?\//, '')}`;
};

/**
 * Sync Blogs
 */
const syncBlogs = () => {
  const blogsDir = path.join(CONTENT_DIR, 'blogs');
  if (!fs.existsSync(blogsDir)) return;

  const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));
  const blogs = [];
  const blogPosts = {};

  files.forEach((file) => {
    try {
      const filePath = path.join(blogsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      if (!data.title) {
        console.warn(`Skipping ${file}: Missing 'title' in frontmatter.`);
        return;
      }

      const slug = data.slug || generateSlug(data.title);
      // Deterministic ID generation based on slug to prevent collisions
      const id = data.id || Math.abs(slug.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0));
      const readTime = data.readTime || `${Math.ceil(content.split(/\s+/).length / 200)} min read`;
      const coverImage = normalizeCoverImage(data.coverImage || data.cover || data.image);

      // Field Whitelisting for security & clean data
      const blogSummary = {
        id,
        title: data.title,
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || content.split('\n').slice(0, 3).join(' ').substring(0, 150) + '...',
        slug,
        tags: data.tags || [],
        readTime,
        coverImage,
        image: coverImage,
      };

      const fullBlogPost = {
        id,
        title: data.title,
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Archie',
        tags: data.tags || [],
        readTime,
        excerpt: blogSummary.excerpt,
        coverImage,
        image: coverImage,
        content: content.trim(),
      };

      blogs.push(blogSummary);
      blogPosts[slug] = fullBlogPost;
    } catch (error) {
      console.error(`Error processing blog file ${file}:`, error.message);
    }
  });

  // Sort blogs by date (descending)
  blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Write files
  fs.writeFileSync(path.join(DATA_DIR, 'blogs.js'), `export const blogs = ${JSON.stringify(blogs, null, 2)};\n`);
  fs.writeFileSync(path.join(DATA_DIR, 'blogPosts.js'), `export const blogPosts = ${JSON.stringify(blogPosts, null, 2)};\n`);

  console.log(`Successfully synced ${blogs.length} blogs.`);

  // Generate dynamic sitemap
  generateSitemap(blogs);
};

/**
 * Generate XML Sitemap
 */
const generateSitemap = (blogs) => {
  let baseUrl = 'https://sahilkumar.dev';
  try {
    const resumePath = path.join(__dirname, '../src/settings/resume.json');
    if (fs.existsSync(resumePath)) {
      const resume = JSON.parse(fs.readFileSync(resumePath, 'utf-8'));
      if (resume.basics && resume.basics.url) {
        baseUrl = resume.basics.url.replace(/\/$/, '');
      }
    }
  } catch (error) {
    console.warn('Warning: Failed to load resume.json for sitemap base URL:', error.message);
  }

  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  // Homepage
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>1.0</priority>\n`;
  xml += `  </url>\n`;

  // Learn hub (React route) + static Docker course (served straight from public/)
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/learn</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.9</priority>\n`;
  xml += `  </url>\n`;
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/learn/docker/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>monthly</changefreq>\n`;
  xml += `    <priority>0.8</priority>\n`;
  xml += `  </url>\n`;
  for (let i = 0; i <= 7; i++) {
    const mod = String(i).padStart(2, '0');
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/learn/docker/module-${mod}.html</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.6</priority>\n`;
    xml += `  </url>\n`;
  }

  // Blog pages
  blogs.forEach((blog) => {
    const blogUrl = `${baseUrl}/blog/${blog.slug}`;
    const lastMod = blog.date ? new Date(blog.date).toISOString().split('T')[0] : today;
    xml += `  <url>\n`;
    xml += `    <loc>${blogUrl}</loc>\n`;
    xml += `    <lastmod>${lastMod}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  console.log(`Successfully generated dynamic sitemap at public/sitemap.xml with ${blogs.length + 1} URLs.`);
};

/**
 * Sync Projects
 */
const syncProjects = () => {
  const projectsDir = path.join(CONTENT_DIR, 'projects');
  if (!fs.existsSync(projectsDir)) return;

  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));
  const topProjects = [];
  const stepProjects = [];

  files.forEach((file, index) => {
    try {
      const filePath = path.join(projectsDir, file);
      const rawProject = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      // Whitelist fields
      const project = {
        id: rawProject.id || index + 1,
        title: rawProject.title,
        description: rawProject.description,
        technologies: rawProject.technologies || [],
        link: rawProject.link || '#',
        github: rawProject.github || '#',
      };
      
      if (rawProject.type === 'top') {
        topProjects.push(project);
      } else {
        stepProjects.push(project);
      }
    } catch (error) {
      console.error(`Error processing project file ${file}:`, error.message);
    }
  });

  const content = `export const topProjects = ${JSON.stringify(topProjects, null, 2)};\n\nexport const stepProjects = ${JSON.stringify(stepProjects, null, 2)};\n`;
  fs.writeFileSync(path.join(DATA_DIR, 'projects.js'), content);

  console.log(`Successfully synced ${topProjects.length + stepProjects.length} projects.`);
};

/**
 * Sync Certifications
 */
const syncCertifications = () => {
  const certsDir = path.join(CONTENT_DIR, 'certifications');
  if (!fs.existsSync(certsDir)) return;

  const files = fs.readdirSync(certsDir).filter(f => f.endsWith('.json'));
  const certifications = [];

  files.forEach(file => {
    try {
      const filePath = path.join(certsDir, file);
      const rawCert = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      // Whitelist fields
      certifications.push({
        title: rawCert.title,
        issuer: rawCert.issuer,
        date: rawCert.date
      });
    } catch (error) {
      console.error(`Error processing certification file ${file}:`, error.message);
    }
  });

  fs.writeFileSync(path.join(DATA_DIR, 'certifications.js'), `export const certifications = ${JSON.stringify(certifications, null, 2)};\n`);

  console.log(`Successfully synced ${certifications.length} certifications.`);
};
/**
 * Sync Terminal
 */
const syncTerminal = () => {
  const terminalFile = path.join(CONTENT_DIR, 'terminal.json');
  if (!fs.existsSync(terminalFile)) return;

  try {
    const rawTerminal = JSON.parse(fs.readFileSync(terminalFile, 'utf-8'));
    const terminal = {
      user: rawTerminal.user || 'sahil',
      host: rawTerminal.host || 'archlinux',
      commands: Array.isArray(rawTerminal.commands) ? rawTerminal.commands : []
    };
    fs.writeFileSync(path.join(DATA_DIR, 'terminal.js'), `export const terminalData = ${JSON.stringify(terminal, null, 2)};\n`);
    console.log(`Successfully synced terminal data.`);
  } catch (error) {
    console.error(`Error processing terminal file:`, error.message);
  }
};

// Execute
console.log('Starting content synchronization...');
try {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  syncBlogs();
  syncProjects();
  syncCertifications();
  syncTerminal();
  console.log('Content synchronization complete.');
} catch (error) {
  console.error('Fatal sync error:', error.message);
  process.exit(1);
}
