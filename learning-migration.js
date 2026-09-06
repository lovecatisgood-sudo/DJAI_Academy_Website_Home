const learningRedirects = Object.freeze([
  ['/siamese_cat/dev/course', 'https://school.djai.academy/en/learn/live-vibe-coding'],
  ['/siamese_cat/dev/course/th', 'https://school.djai.academy/th/learn/live-vibe-coding'],
  ['/siamese_cat/dev/courses', 'https://school.djai.academy/en/learn'],
  ['/siamese_cat/dev/courses/build-first-app', 'https://school.djai.academy/en/learn/build-first-app'],
  ['/siamese_cat/dev/courses/make-a-game', 'https://school.djai.academy/en/learn/make-a-game'],
  ['/siamese_cat/dev/courses/coding-with-ai', 'https://school.djai.academy/en/learn/coding-with-ai'],
])

const redirectBySource = new Map(learningRedirects)

function normalizedLearningSource(pathname) {
  const withoutTrailingSlash = pathname.replace(/\/+$/, '') || '/'
  if (withoutTrailingSlash === '/siamese_cat/dev/en/course') return '/siamese_cat/dev/course'
  if (withoutTrailingSlash === '/siamese_cat/dev/en/courses') return '/siamese_cat/dev/courses'
  if (withoutTrailingSlash.startsWith('/siamese_cat/dev/en/courses/')) {
    return withoutTrailingSlash.replace('/siamese_cat/dev/en/courses/', '/siamese_cat/dev/courses/')
  }
  return withoutTrailingSlash
}

function learningRedirectFor(pathname) {
  return redirectBySource.get(normalizedLearningSource(pathname)) || null
}

module.exports = { learningRedirectFor, learningRedirects }
