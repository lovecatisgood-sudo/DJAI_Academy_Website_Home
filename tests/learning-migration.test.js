const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const { learningRedirectFor, learningRedirects } = require('../learning-migration')

const root = path.resolve(__dirname, '..')

test('every legacy vibe-learning route has one direct locale-matched School owner', () => {
  const expected = new Map([
    ['/siamese_cat/dev/course', 'https://school.djai.academy/en/learn/live-vibe-coding'],
    ['/siamese_cat/dev/course/th', 'https://school.djai.academy/th/learn/live-vibe-coding'],
    ['/siamese_cat/dev/courses', 'https://school.djai.academy/en/learn'],
    ['/siamese_cat/dev/courses/build-first-app', 'https://school.djai.academy/en/learn/build-first-app'],
    ['/siamese_cat/dev/courses/make-a-game', 'https://school.djai.academy/en/learn/make-a-game'],
    ['/siamese_cat/dev/courses/coding-with-ai', 'https://school.djai.academy/en/learn/coding-with-ai'],
  ])

  assert.deepEqual(new Map(learningRedirects), expected)
  for (const [source, destination] of expected) {
    assert.equal(learningRedirectFor(source), destination)
    assert.equal(learningRedirectFor(`${source}/`), destination)
    assert.equal(new URL(destination).pathname.includes('/th/'), source.endsWith('/th'))
  }
  assert.equal(learningRedirectFor('/course/en/'), null, 'dated Masterclass remains separate')
  assert.equal(learningRedirectFor('/siamese_cat/dev/en/course/'), expected.get('/siamese_cat/dev/course'))
  assert.equal(learningRedirectFor('/siamese_cat/dev/en/courses/make-a-game/'), expected.get('/siamese_cat/dev/courses/make-a-game'))
})

test('redirect-only vibe-learning routes are absent from the www sitemap source', () => {
  const source = readFileSync(path.join(root, 'djai-academy-homepage/app/sitemap.js'), 'utf8')
  const corePaths = source.slice(source.indexOf('const corePaths = ['), source.indexOf('const imageTools = ['))
  for (const [legacy] of learningRedirects) {
    assert.doesNotMatch(corePaths, new RegExp(`['\"]${legacy}/['\"]`))
  }
})
