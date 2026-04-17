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

      // Field Whitelisting for security & clean data
      const blogSummary = {
        id,
        title: data.title,
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || content.split('\n').slice(0, 3).join(' ').substring(0, 150) + '...',
        slug,
        tags: data.tags || [],
      };

      const fullBlogPost = {
        id,
        title: data.title,
        date: data.date || new Date().toISOString().split('T')[0],
        author: data.author || 'Archie',
        tags: data.tags || [],
        readTime: data.readTime || `${Math.ceil(content.split(/\s+/).length / 200)} min read`,
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

// Execute
console.log('Starting content synchronization...');
try {
  syncBlogs();
  syncProjects();
  syncCertifications();
  console.log('Content synchronization complete.');
} catch (error) {
  console.error('Fatal sync error:', error.message);
  process.exit(1);
}
