import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {},
        sitemap: 'https://stonkscoin.org/sitemap.xml',
    }
}
