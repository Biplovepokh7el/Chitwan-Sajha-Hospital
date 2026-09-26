import db from '../config/db.js';

// Blogs
export const getBlogs = (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM blogs WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    if (search) {
      query += ' AND (title LIKE ? OR content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY id DESC';
    const blogs = db.prepare(query).all(...params);
    res.json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = db.prepare('SELECT * FROM blogs WHERE slug = ? OR id = ?').get(slug, slug);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog article not found.' });
    }
    res.json({ success: true, blog });
  } catch (error) {
    next(error);
  }
};

export const createBlog = (req, res, next) => {
  try {
    const { title, category, author_name, author_title, read_time, tags, content, image } = req.body;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const date = new Date().toISOString().split('T')[0];

    const result = db.prepare(`
      INSERT INTO blogs (title, slug, category, author_name, author_title, read_time, tags, content, image, date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, slug, category, author_name, author_title || 'Medical Specialist', read_time || '5 min read', tags || '', content, image, date);

    res.status(201).json({ success: true, message: 'Blog published.', blogId: result.lastInsertRowid });
  } catch (error) {
    next(error);
  }
};

// News & Events
export const getNewsEvents = (req, res, next) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM news_events WHERE 1=1';
    const params = [];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    query += ' ORDER BY id DESC';
    const items = db.prepare(query).all(...params);
    res.json({ success: true, count: items.length, newsEvents: items });
  } catch (error) {
    next(error);
  }
};

// Gallery
export const getGallery = (req, res, next) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM gallery WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY id DESC';
    const items = db.prepare(query).all(...params);
    res.json({ success: true, count: items.length, gallery: items });
  } catch (error) {
    next(error);
  }
};

// Testimonials
export const getTestimonials = (req, res, next) => {
  try {
    const items = db.prepare('SELECT * FROM testimonials ORDER BY id DESC').all();
    res.json({ success: true, count: items.length, testimonials: items });
  } catch (error) {
    next(error);
  }
};

// Inquiries / Contact / International Patient Inquiry
export const createInquiry = (req, res, next) => {
  try {
    const { name, email, phone, subject, message, type } = req.body;

    const result = db.prepare(`
      INSERT INTO inquiries (name, email, phone, subject, message, type)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, email, phone, subject || 'General Inquiry', message, type || 'contact');

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. Our team will contact you within 2 hours.'
    });
  } catch (error) {
    next(error);
  }
};
