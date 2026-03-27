const fs = require('fs');
const path = require('path');
const satori = require('satori').default;
const { Resvg } = require('@resvg/resvg-js');

async function generateOGImage() {
  // Fix font fetching by using a reliable CDN that hosts raw TTF files for Satori
  const fontData = await fetch('https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-700-normal.ttf').then(res => res.arrayBuffer());

  const markup = {
    type: 'div',
    props: {
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0c1911 0%, #060a08 100%)',
        color: '#f4fff6',
        fontFamily: 'Roboto',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              border: '1px solid rgba(139, 255, 176, 0.12)',
              borderRadius: '999px',
              padding: '12px 24px',
              background: 'rgba(114, 255, 152, 0.06)',
              color: '#d9e9dd',
              fontSize: '24px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '32px'
            },
            children: 'Elite builders • Timed challenge'
          }
        },
        {
          type: 'h1',
          props: {
            style: {
              margin: '0',
              fontSize: '120px',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              textAlign: 'center',
            },
            children: 'Vibe Code Cup'
          }
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              gap: '24px',
              marginTop: '40px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    padding: '16px 32px',
                    borderRadius: '999px',
                    border: '1px solid rgba(139, 255, 176, 0.3)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    color: '#72ff98',
                    fontSize: '28px',
                    fontWeight: 700,
                  },
                  children: 'April 11, 2026'
                }
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    padding: '16px 32px',
                    borderRadius: '999px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    color: '#f4fff6',
                    fontSize: '28px',
                    fontWeight: 700,
                  },
                  children: 'SF + Online'
                }
              }
            ]
          }
        }
      ]
    }
  };

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Roboto',
        data: fontData,
        weight: 700,
        style: 'normal',
      },
    ],
  });

  const resvg = new Resvg(svg, {
    background: '#0a120d',
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });
  
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  fs.writeFileSync(path.join(__dirname, '..', 'public', 'og-image.png'), pngBuffer);
  console.log('OG image generated successfully at public/og-image.png');
}

generateOGImage().catch(console.error);
