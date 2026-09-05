/**
 * Portfolio identity and assets.
 *
 * Fill in the TODO values below, then drop the matching files into /public.
 * Projects stay in app/page.tsx until those are ready.
 */
export const profile = {
  name: 'Joshita Bhattacharyya',
  firstName: 'Joshita',
  lastName: 'Bhattacharyya',
  initials: 'JB',
  titles: ['System Engineer', 'Frontend Developer', 'Web Developer', 'Data & AI Enthusiast'] as const,
  location: 'Kolkata, India',
  email: 'joshitabhattacharyya@gmail.com',
  phone: '+91 95505 72523',
  phoneHref: 'tel:+919550572523',

  // TODO: replace with your GitHub profile URL
  github: 'https://github.com/YOUR_GITHUB_USERNAME',
  // TODO: replace with your LinkedIn profile URL
  linkedin: 'https://www.linkedin.com/in/YOUR_LINKEDIN_SLUG',
  // TODO: replace with your LeetCode profile URL
  leetcode: 'https://leetcode.com/u/YOUR_LEETCODE_USERNAME',
  // TODO: replace with your HackerRank profile URL
  hackerrank: 'https://www.hackerrank.com/YOUR_HACKERRANK_USERNAME',

  // TODO: add a professional photo at public/profile.jpg
  profileImage: '/profile.jpg',
  // TODO: add the latest resume PDF at public/resume.pdf
  resume: '/resume.pdf',
}

export const titleLine = profile.titles.join(' | ')
