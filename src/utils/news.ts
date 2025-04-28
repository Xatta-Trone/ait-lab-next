import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { NewsItem } from '@/types/news'

export async function getNewsById(slug: string): Promise<NewsItem | null> {
  try {
    const newsData = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'src/data/news.json'), 'utf8')
    )
    
    const validNewsData = newsData.filter((item: NewsItem) => item.slug && item.slug.trim() !== '')
    const news = validNewsData.find((item: NewsItem) => item.slug === slug)
    
    if (!news) return null
    
    const markdownPath = path.join(process.cwd(), 'src/content/news', `${slug}.md`)
    
    if (fs.existsSync(markdownPath)) {
      const fileContents = fs.readFileSync(markdownPath, 'utf8')
      const { content } = matter(fileContents)
      const processedContent = await remark().use(html).process(content)
      news.content = processedContent.toString()
    }
    
    return news
  } catch (error) {
    console.error('Error getting news:', error)
    return null
  }
}