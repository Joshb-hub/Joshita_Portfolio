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
  titles: ['Systems Engineer Trainee', 'Web Developer', 'Data & AI Enthusiast', 'Prompt Engineer', 'Cloud Engineer'] as const,
  location: 'Kolkata, India',
  email: 'joshitabhattacharyya@gmail.com',
  phone: '+91 95505 72523',
  phoneHref: 'tel:+919550572523',

  // TODO: replace with your GitHub profile URL
  github: 'https://github.com/Joshb-hub',
  // TODO: replace with your LinkedIn profile URL
  linkedin: 'https://www.linkedin.com/in/joshita-bhattacharyya-3200a3267/',
  // TODO: replace with your LeetCode profile URL
  leetcode: 'https://leetcode.com/u/777-7-777j/',
  // TODO: replace with your HackerRank profile URL
  hackerrank: 'https://www.hackerrank.com/profile/joshitabhattach1',
  unstop: 'https://unstop.com/u/joshibha5135',

  // TODO: add a professional photo at public/profile.jpg
  profileImage: '/profile.png',
  // TODO: add the latest resume PDF at public/resume.pdf
  resume: '/resume.pdf',
}

export const titleLine = profile.titles.join(' | ')
