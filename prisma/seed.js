import prisma from '../prismaClient.js';
import bcrypt from 'bcrypt';

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@levelup.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  const hashed = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { isAdmin: true },
    create: {
      email: adminEmail,
      password: hashed,
      isAdmin: true,
    },
  });



  const products = [
    {
      title: 'Logitech G Pro X Superlight (Wireless Gaming Mouse)',
      price: 129.99,
      description: 'Ultra-light wireless esports mouse with HERO sensor and minimal latency.',
      imageUrl: 'https://i.rtings.com/assets/products/lFKKRdTZ/logitech-g-pro-x-superlight/design-large.jpg?format=auto',
    },
    {
      title: 'Razer DeathAdder V3 (Gaming Mouse)',
      price: 79.99,
      description: 'Ergonomic lightweight mouse designed for competitive FPS play.',
      imageUrl: 'http://assets2.razerzone.com/images/og-image/razer-deathadder-v3-pro-og-image.png',
    },
    {
      title: 'SteelSeries Rival 5 (Gaming Mouse)',
      price: 59.99,
      description: 'Versatile multi-button mouse for FPS/MOBA with fast switches.',
      imageUrl: 'https://assets-prd.ignimgs.com/2021/06/03/blogroll-1622762639878.jpg?width=1280&format=jpg&auto=webp&quality=80',
    },
    {
      title: 'Logitech G502 HERO (Gaming Mouse)',
      price: 49.99,
      description: 'Iconic gaming mouse with adjustable weights and programmable buttons.',
      imageUrl: 'https://www.computerland.rs/login/media/images/products/031929_slika2.jpg',
    },
    {
      title: 'SteelSeries Apex Pro TKL (Mechanical Keyboard)',
      price: 189.99,
      description: 'TKL keyboard with adjustable actuation and premium build.',
      imageUrl: 'https://images.ctfassets.net/hmm5mo4qf4mf/5T6OTTzl1B5zaX1nILPFw4/186d8f786745424cdd8770cda23623af/apex_pro_tkl_wl_img_buy_01.png?fm=webp&q=90&fit=scale&w=1920',
    },
    {
      title: 'Corsair K70 RGB MK.2 (Mechanical Keyboard)',
      price: 129.99,
      description: 'Aluminum frame, RGB lighting, and fast mechanical switches.',
      imageUrl: 'https://oyster.ignimgs.com/wordpress/stg.ign.com/2018/06/FullSizeRender-1.jpg',
    },
    {
      title: 'Razer Huntsman Mini (Optical Mechanical Keyboard)',
      price: 99.99,
      description: 'Compact 60% keyboard with fast optical switches and RGB.',
      imageUrl: 'https://m.media-amazon.com/images/I/618etkLUt9L._AC_UF894,1000_QL80_.jpg',
    },
    {
      title: 'Logitech G915 TKL (Wireless Mechanical Keyboard)',
      price: 199.99,
      description: 'Low-profile wireless mechanical keyboard with RGB and long battery life.',
      imageUrl: 'https://m.media-amazon.com/images/I/61N0oz5Ob-L.jpg',
    },
    {
      title: 'HyperX Cloud II (Gaming Headset)',
      price: 79.99,
      description: 'Comfort-focused headset with great sound and strong mic.',
      imageUrl: 'https://hp.widen.net/content/jqvpbnzpyj/png/jqvpbnzpyj.png?w=800&h=600&dpi=72&color=ffffff00',
    },
    {
      title: 'SteelSeries Arctis 7 (Wireless Gaming Headset)',
      price: 149.99,
      description: 'Wireless headset with balanced audio and comfortable fit.',
      imageUrl: 'https://www.kupujemprodajem.com/photos/oglasi/1/89/161286891/161286891_658b4d4baa1250-17813554Screen-Shot-202.webp',
    },
    {
      title: 'Razer BlackShark V2 (Gaming Headset)',
      price: 99.99,
      description: 'Clear mic and detailed sound tuned for competitive gaming.',
      imageUrl: 'https://assets2.razerzone.com/images/razer-blackshark-v2-x/blackshark-v2-x-og-image-1200x630.jpg',
    },
    {
      title: 'Logitech G733 Lightspeed (Wireless Headset)',
      price: 129.99,
      description: 'Wireless RGB headset with lightweight design and strong comfort.',
      imageUrl: 'https://www.computerland.rs/login/media/images/products/0-73848400-1660046172.jpg',
    },
    {
      title: 'Xbox Wireless Controller (Series X|S)',
      price: 59.99,
      description: 'Comfortable controller with improved grip and low-latency wireless.',
      imageUrl: 'https://img.ep-cdn.com/i/500/500/ui/uibhjmngwksydatcvfex/microsoft-gamepad-xbox-series-x-s-wireless-controller-velocity-green-cene.jpg',
    },
    {
      title: 'Sony DualSense (PS5 Controller)',
      price: 69.99,
      description: 'Haptic feedback and adaptive triggers for immersive gameplay.',
      imageUrl: 'https://img.ep-cdn.com/i/500/500/nj/njemrkpzahbfwoqtsvly/sony-gamepad-ps5-dualsense-edge-controller-cene.jpg',
    },
    {
      title: '8BitDo Pro 2 (Bluetooth Controller)',
      price: 49.99,
      description: 'Customizable controller for PC/Switch/mobile with great ergonomics.',
      imageUrl: 'https://m.media-amazon.com/images/I/61wnxkktl5L.jpg',
    },
    {
      title: 'Thrustmaster T.16000M FCS (Joystick)',
      price: 79.99,
      description: 'Precise joystick for flight sims with multiple programmable controls.',
      imageUrl: 'https://www.gamecentar.rs/media/catalog/product/cache/fd75a4eeec25522b89c29ca4420b6a96/2/3/23471-thrustmaster-t-16000-fcs.webp',
    },
    {
      title: 'Logitech G29 Driving Force (Racing Wheel)',
      price: 249.99,
      description: 'Force feedback racing wheel and pedals for sim racing.',
      imageUrl: 'https://media.gamecentar.rs/slike/blog/logitech-driving-force-g29-pc-ps3-ps4-cena-prodaja.jpg',
    },
    {
      title: 'Elgato Stream Deck MK.2 (Streaming Controller)',
      price: 149.99,
      description: 'Programmable keys for streaming, shortcuts, and productivity.',
      imageUrl: 'https://m.media-amazon.com/images/I/61gtdFnK+UL._AC_UF894,1000_QL80_.jpg',
    },
    {
      title: 'SteelSeries QcK (Mousepad)',
      price: 14.99,
      description: 'Classic cloth mousepad with smooth glide and reliable control.',
      imageUrl: 'https://i5.walmartimages.com/seo/Steelseries-Qck-Gaming-Mouse-Pad-Black_0107f78b-d263-4323-b146-9c7550a6100a.95bb2147e53189b4dcd688f5c903ad55.jpeg',
    },
    {
      title: 'Blue Yeti (USB Microphone)',
      price: 99.99,
      description: 'Popular USB mic for streaming, voice chat, and content creation.',
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61egnO8q6ZL._AC_UL495_SR435,495_.jpg',
    },
  ];

  await prisma.product.deleteMany({ where: { userId: admin.id } });

  await prisma.product.createMany({
    data: products.map((p) => ({ ...p, userId: admin.id })),
  });

  console.log('Seed finished.');
  console.log(`Admin: ${adminEmail} / ${adminPassword}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
