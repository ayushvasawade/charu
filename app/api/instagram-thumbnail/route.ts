import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Method 1: Try Instagram's oEmbed API directly
    try {
      const oembedUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}`;
      const response = await fetch(oembedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.thumbnail_url) {
          return NextResponse.json({
            thumbnail_url: data.thumbnail_url,
            title: data.title,
            author_name: data.author_name,
          });
        }
      }
    } catch (oembedError) {
      console.log('Instagram oEmbed failed, trying alternative services');
    }

    // Method 2: Use Microlink.io free API (no API key needed for basic usage)
    try {
      const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&image=true`;
      const microlinkResponse = await fetch(microlinkUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      });

      if (microlinkResponse.ok) {
        const microlinkData = await microlinkResponse.json();
        if (microlinkData.data?.image?.url) {
          return NextResponse.json({
            thumbnail_url: microlinkData.data.image.url,
            title: microlinkData.data.title || microlinkData.data.description,
          });
        }
      }
    } catch (microlinkError) {
      console.log('Microlink failed, trying next method');
    }

    // Method 3: Try LinkPreview.net (free tier available)
    try {
      const linkPreviewUrl = `https://api.linkpreview.net/?q=${encodeURIComponent(url)}`;
      const linkPreviewResponse = await fetch(linkPreviewUrl, {
        headers: {
          'X-Linkpreview-Api-Key': '', // Free tier doesn't require key for basic usage
        },
      });

      if (linkPreviewResponse.ok) {
        const linkPreviewData = await linkPreviewResponse.json();
        if (linkPreviewData.image) {
          return NextResponse.json({
            thumbnail_url: linkPreviewData.image,
            title: linkPreviewData.title,
          });
        }
      }
    } catch (linkPreviewError) {
      console.log('LinkPreview failed');
    }

    // Method 4: Extract reel ID and construct thumbnail URL
    const reelIdMatch = url.match(/\/reel\/([^\/]+)/);
    if (reelIdMatch) {
      const reelId = reelIdMatch[1];
      // Try Instagram's CDN pattern (sometimes works)
      const cdnThumbnail = `https://scontent.cdninstagram.com/v/t51.29350-15/${reelId}_n.jpg`;
      
      return NextResponse.json({
        thumbnail_url: cdnThumbnail,
        reelId: reelId,
      });
    }

    return NextResponse.json(
      { error: 'Could not fetch thumbnail from any service' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error fetching Instagram thumbnail:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Instagram thumbnail' },
      { status: 500 }
    );
  }
}
