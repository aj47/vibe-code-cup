const fs = require('fs');
const path = require('path');
const satori = require('satori').default;
const { Resvg } = require('@resvg/resvg-js');

async function generateOGImage() {
  // Fix font fetching by using a reliable CDN that hosts raw TTF files for Satori
  const fontData = await fetch('https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-700-normal.ttf').then(res => res.arrayBuffer());
  const trophyPng = fs.readFileSync(path.join(__dirname, '..', 'public', 'trophy-pixelated.png'));
  const trophyDataUri = `data:image/png;base64,${trophyPng.toString('base64')}`;

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
        backgroundImage: 'radial-gradient(circle at 82% 18%, rgba(114, 255, 152, 0.14) 0%, rgba(114, 255, 152, 0.06) 18%, rgba(114, 255, 152, 0) 34%), linear-gradient(rgba(114, 255, 152, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(114, 255, 152, 0.045) 1px, transparent 1px)',
        backgroundSize: 'auto, 100% 34px, 34px 100%',
        color: '#f4fff6',
        fontFamily: 'Roboto',
        padding: '80px 140px',
        boxSizing: 'border-box'
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
              marginBottom: '28px'
            },
            children: 'Elite builders • Timed challenge'
          }
        },
        {
          type: 'div',
          props: {
            style: {
              width: '220px',
              height: '220px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '32px',
              borderRadius: '32px',
              border: '1px solid rgba(139, 255, 176, 0.14)',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)), rgba(5, 10, 7, 0.72)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.04)',
              backgroundImage: 'linear-gradient(rgba(114, 255, 152, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(114, 255, 152, 0.05) 1px, transparent 1px)',
              backgroundSize: '100% 18px, 18px 100%',
            },
            children: {
              type: 'img',
              props: {
                src: trophyDataUri,
                width: 156,
                height: 156,
                style: {
                  display: 'block',
                  imageRendering: 'pixelated',
                }
              }
            }
          }
        },
        {
          type: 'h1',
          props: {
            style: {
              margin: '0',
              fontSize: '120px',
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
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
              marginTop: '18px',
              maxWidth: '820px',
              color: '#d9e9dd',
              fontSize: '34px',
              lineHeight: 1.25,
              textAlign: 'center',
            },
            children: 'All tools allowed. Hard challenge disclosed at kickoff. Build online from anywhere.'
          }
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              gap: '20px',
              marginTop: '36px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    padding: '16px 28px',
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
                    padding: '16px 28px',
                    borderRadius: '999px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    color: '#f4fff6',
                    fontSize: '28px',
                    fontWeight: 700,
                  },
                  children: 'Anyone can join online'
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
    height: 1200,
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

  fs.writeFileSync(path.join(__dirname, '..', 'public', 'luma-image.png'), pngBuffer);
  console.log('Luma image generated successfully at public/luma-image.png');
}

generateOGImage().catch(console.error);
