import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../brand/social/', import.meta.url));
const c = { paper: '#F4F2EC', blue: '#365CF5', ink: '#131820', slate: '#555F6B', rule: '#D1D2CC' };
const files = [];
const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
const text = (x,y,s,size=24,color=c.ink,weight=400,extra='') => `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" ${extra}>${esc(s)}</text>`;
const mark = (x,y,scale=1,color=c.blue) => `<g transform="translate(${x} ${y}) scale(${scale})"><circle cx="-14" cy="0" r="10" fill="none" stroke="${color}" stroke-width="3"/><circle cx="14" cy="0" r="11.5" fill="${color}"/></g>`;
const lockup = (x,y,scale=1,color=c.ink,logo=c.blue) => `${mark(x+26*scale,y,scale,logo)}${text(x+67*scale,y+10*scale,'Selfbyt',32*scale,color,700,'letter-spacing="-1"')}`;
const line = (x,y,x2,color=c.rule) => `<path d="M${x} ${y}H${x2}" stroke="${color}"/>`;
const motif = (x,y,s=1,color=c.blue) => `<g transform="translate(${x} ${y}) scale(${s})">${[120,96,72].map(r=>`<circle cx="0" cy="0" r="${r}" fill="none" stroke="${color}" stroke-width="1.3"/>`).join('')}<circle cx="192" cy="0" r="120" fill="${color}"/>${[-72,-36,0,36,72].map(o=>`<path d="M${192+o} -${Math.sqrt(14400-o*o)}V${Math.sqrt(14400-o*o)}" stroke="${c.paper}" opacity=".18"/>`).join('')}<path d="M0 0H192" stroke="${c.ink}" stroke-width="1.5"/><circle r="4" fill="${color}"/><circle cx="192" r="4" fill="${c.paper}"/></g>`;
const svg = (w,h,bg,body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><title>Selfbyt social media asset</title>${bg?`<rect width="${w}" height="${h}" fill="${bg}"/>`:''}${body}</svg>`;
async function save(name,w,h,bg,body) {
  const source = svg(w,h,bg,body);
  await writeFile(`${out}/${name}.svg`,source);
  await sharp(Buffer.from(source)).png().toFile(`${out}/${name}.png`);
  files.push({name,w,h});
}
await mkdir(out,{recursive:true});

// Keep both circles inside circular crops, with equal outer diameters.
for (const [name,bg,fg] of [['paper',c.paper,c.blue],['cobalt',c.blue,c.paper],['ink',c.ink,c.paper]]) {
  await save(`profile-${name}`,1024,1024,bg,mark(512,512,12,fg));
  await sharp(`${out}/profile-${name}.png`).resize(400,400).png().toFile(`${out}/profile-${name}-400.png`);
}
await save('logo-transparent-cobalt',1024,1024,null,mark(512,512,12,c.blue));
await save('logo-transparent-white',1024,1024,null,mark(512,512,12,c.paper));

await save('cover-x',1500,500,c.paper,
  lockup(440,88,.9)+line(440,126,1416)+
  text(440,211,'Intelligence.',58,c.ink,700,'letter-spacing="-2"')+
  text(440,276,'Built from the foundations.',58,c.blue,700,'letter-spacing="-2"')+
  text(440,340,'AI infrastructure and experimental research.',23,c.slate)+
  text(440,421,'selfbyt.com',19,c.slate)+motif(1294,389,.32));

// LinkedIn Page cover size from LinkedIn Help. Central text, uncluttered edges.
await save('cover-linkedin-company',1512,256,c.ink,
  motif(203,128,.64)+text(600,115,'AI infrastructure.',43,c.paper,700,'letter-spacing="-1"')+
  text(600,170,'Exploring the foundations of intelligence.',25,c.paper)+
  text(600,211,'selfbyt.com',17,'#A6AEB9'));

await save('post-brand',1080,1080,c.paper,
  lockup(72,86)+line(72,132,1008)+text(72,211,'AI INFRASTRUCTURE / RESEARCH',16,c.slate,400,'letter-spacing="2"')+
  text(72,341,'Intelligence.',86,c.ink,700,'letter-spacing="-3"')+
  text(72,436,'Built from',86,c.ink,700,'letter-spacing="-3"')+
  text(72,531,'the foundations.',86,c.blue,700,'letter-spacing="-3"')+
  motif(379,757,1.03)+line(72,963,1008)+text(72,1016,'selfbyt.com',20,c.slate)+text(793,1016,'Build. Explore. Learn.',19,c.slate));

await save('post-research-template',1080,1080,c.ink,
  lockup(72,86,1,c.paper,c.paper)+line(72,132,1008,'#39414C')+
  text(72,216,'RESEARCH NOTES / 001',17,'#A6AEB9',400,'letter-spacing="2"')+
  text(72,347,'A new way',90,c.paper,700,'letter-spacing="-3"')+
  text(72,450,'to think about',90,c.paper,700,'letter-spacing="-3"')+
  text(72,553,'intelligence.',90,'#8BA3FF',700,'letter-spacing="-3"')+
  text(72,655,'Replace this with your research question',29,'#A6AEB9')+
  text(72,700,'or a short finding from your latest experiment.',29,'#A6AEB9')+
  mark(875,843,4,c.blue)+line(72,963,1008,'#39414C')+text(72,1016,'selfbyt.com',20,'#A6AEB9')+text(845,1016,'FIELD NOTES',16,'#A6AEB9',400,'letter-spacing="1"'));

await save('post-update-template',1080,1080,c.blue,
  lockup(72,86,1,c.paper,c.paper)+line(72,132,1008,'#6A86FF')+
  text(72,215,'FROM THE LAB',18,c.paper,400,'letter-spacing="2"')+
  text(72,377,'What we’re',92,c.paper,700,'letter-spacing="-3"')+
  text(72,484,'building next.',92,c.paper,700,'letter-spacing="-3"')+
  text(72,597,'Add your project update here.',30,c.paper)+
  text(72,646,'Keep it clear, specific, and grounded in the work.',28,c.paper)+
  mark(860,840,4,c.paper)+line(72,963,1008,'#6A86FF')+text(72,1016,'selfbyt.com',20,c.paper)+text(819,1016,'IN PROGRESS',16,c.paper,400,'letter-spacing="1"'));

await save('post-landscape',1200,630,c.paper,
  lockup(64,71)+line(64,113,1136)+text(64,216,'Building the foundations',60,c.ink,700,'letter-spacing="-2"')+
  text(64,287,'of intelligence.',60,c.blue,700,'letter-spacing="-2"')+
  text(64,360,'AI infrastructure and experimental research.',24,c.slate)+motif(847,438,.67)+
  line(64,553,1136)+text(64,593,'selfbyt.com',19,c.slate));

await save('story-template',1080,1920,c.paper,
  lockup(88,269,1.2)+line(88,330,992)+text(88,430,'FROM THE LAB',20,c.slate,400,'letter-spacing="2"')+
  text(88,640,'Ideas into',102,c.ink,700,'letter-spacing="-3"')+
  text(88,756,'experiments.',102,c.blue,700,'letter-spacing="-3"')+
  text(88,880,'Share a question, a result,',34,c.slate)+text(88,932,'or what you’re building next.',34,c.slate)+
  motif(354,1236,1.1)+line(88,1555,992)+text(88,1620,'selfbyt.com',26,c.slate));

const readme = `# Selfbyt social media kit\n\nReady-to-upload PNG files and editable SVG sources. Built from the website’s open-circle / filled-circle mark.\n\n## Start here\n\nUse profile-cobalt-400.png as the default avatar and cover-x.png or cover-linkedin-company.png for the corresponding platform. Paper and ink avatars are alternate treatments. Avatars have no rounded corners; the platform supplies its crop. Both circles fit inside a circular crop.\n\n## Files\n\n| File | Size | Use |\n| --- | --- | --- |\n${files.map(f=>`| ${f.name}.png / .svg | ${f.w} × ${f.h} | ${f.name.includes('template')?'Editable template; replace sample copy before posting':f.name.includes('transparent')?'Transparent logo; use against a contrasting background':f.name.startsWith('profile')?'Profile avatar':f.name.startsWith('cover')?'Platform cover':'Ready to share brand graphic'} |`).join('\n')}\n\nEach profile also has a 400 × 400 PNG. Templates contain sample text, not product announcements. Edit the text elements in the SVG using a vector editor, or update scripts/generate-social-assets.mjs and run npm run assets:social. SVG text uses Arial/Helvetica for portability; inspect line lengths after editing.\n\n## Brand\n\nCobalt #365CF5 · Paper #F4F2EC · Ink #131820 · Slate #555F6B. Open circle on the left, filled circle on the right. Preserve equal outer diameters and spacing. Use clear language about AI infrastructure, research, and future models. Do not imply an unannounced model or product has shipped. Avoid em dashes in titles and subtitles.\n\n## Cropping\n\nX cover leaves the lower-left area free for the profile photo. LinkedIn company cover keeps text toward the center; platform layouts may crop on different screens. Story template keeps the main content away from the top and bottom interface. Check the upload preview before saving.\n\nDimensions checked October 2026: [X profile and cover](https://help.x.com/en/managing-your-account/how-to-customize-your-profile), [LinkedIn Page image specifications](https://www.linkedin.com/help/linkedin/answer/a570368). LinkedIn currently recommends 1512 × 256 for company covers and 400 × 400 for logos. Other sizes are general-purpose creative canvases.\n`;
await writeFile(`${out}/README.md`,readme);

// Contact sheet shows actual exports, including circular avatar crops.
const panels=[];
const header=svg(1600,130,c.paper,text(52,65,'Selfbyt / Social kit',36,c.ink,700)+text(52,102,'AI infrastructure and experimental research',18,c.slate));
panels.push({input:Buffer.from(header),left:0,top:0});
for (const [i,name] of ['paper','cobalt','ink'].entries()) {
  const circleMask=Buffer.from('<svg width="180" height="180"><circle cx="90" cy="90" r="90" fill="white"/></svg>');
  const avatar=await sharp(`${out}/profile-${name}.png`).resize(180,180).composite([{input:circleMask,blend:'dest-in'}]).png().toBuffer();
  panels.push({input:avatar,left:52+i*255,top:160});
  panels.push({input:Buffer.from(svg(230,45,null,text(0,28,name.toUpperCase(),15,c.slate))),left:52+i*255,top:350});
}
const placements=[['cover-x',815,155,730,244],['cover-linkedin-company',52,430,1493,253],['post-brand',52,739,470,470],['post-research-template',565,739,470,470],['post-update-template',1075,739,470,470],['post-landscape',52,1280,970,509],['story-template',1075,1280,286,509]];
for(const [name,left,top,w,h] of placements) {
  panels.push({input:await sharp(`${out}/${name}.png`).resize(w,h).png().toBuffer(),left,top});
  panels.push({input:Buffer.from(svg(w,40,null,text(0,25,name.replaceAll('-',' ').toUpperCase(),14,c.slate))),left,top:top+h+4});
}
await sharp({create:{width:1600,height:1860,channels:3,background:'#E7E5DE'}}).composite(panels).png().toFile(`${out}/preview.png`);
console.log(`Created ${files.length} assets with SVG sources, avatar upload sizes, README, and preview in ${out}`);
