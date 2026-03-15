import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load env
dotenv.config({ path: './server/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('替换为')) {
  console.error('❌ Please set SUPABASE_URL and SUPABASE_ANON_KEY in server/.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Define original mock data here or import statically
const pets = [
  {
    id: 'luna',
    name: 'Luna',
    category: 'cats',
    age: '2岁',
    gender: '雌性',
    distance: '2.4公里',
    tag: '青年',
    tagColor: 'bg-green-100 text-green-700',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCTqTscO0KGncHGDwv38opTG6d7iuEfIw_sBTJ8ctk9jGC8x9Uzn6BNZztH_-S-Sm5Y_frZrskoUCWITlkiigPly8AOtdlm65YHOXpUh42OwBx0bxufea2MD1BrN_6CgxTO47zbNL6-vUAA2C-pEiJJ3DYblHh7wHuTGc3F0r8M1Ewj3YcJT_iSVpiGPCscKDiatPaTN96Qg6XRyU7osShJsEoapN-UP_VIMc7D4Dy7ugcs9-E8tNCkjNoTwKZ98og-ZSgJpm1omc',
    breed: '美国短毛猫',
    desc: 'Luna 是一只非常粘人的小猫咪，喜欢在阳光下打盹，也喜欢玩逗猫棒。她正在寻找一个温暖的家。',
    applied: true,
    applicationStatus: '已批准'
  },
  {
    id: 'milo',
    name: 'Milo',
    category: 'cats',
    age: '1岁',
    gender: '雄性',
    distance: '1.5公里',
    tag: '幼年',
    tagColor: 'bg-orange-100 text-orange-700',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2lm9a01EJrz42ao15Nvbwgsuk4Hvrsv6FMmmRj7nY2zA5qU4PWkPS0I2Ps9uvkuGLbS8K70xRxkgl_2l0u3OaDXtaPeFM3qvwpB9XLq5EjLgVIwGyMMJxpkKR0hqojkLOOupEEPGJQOecSEt6is8csf5Ykn4_nq229AaRCj6AyDkhn-9PLDT04mm4egGDVzmeYCkfCPQNhhHUhYv01nFUIhw3CgqZ_KAoog9fwlOSzis9iKxLu1LYMfepHsFrgmPGxDcTjtlNFUw',
    breed: '橘猫',
    desc: 'Milo 是一只活泼好动的橘猫，对世界充满好奇。他非常亲人，喜欢被抚摸。',
    applied: false,
    applicationStatus: null
  },
  {
    id: 'bella',
    name: 'Bella',
    category: 'cats',
    age: '3岁',
    gender: '雌性',
    distance: '5.0公里',
    tag: '成年',
    tagColor: 'bg-blue-100 text-blue-700',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
    breed: '布偶猫',
    desc: 'Bella 是一只优雅的布偶猫，性格温顺，喜欢安静地陪伴在主人身边。',
    applied: false,
    applicationStatus: null
  },
  {
    id: 'buster',
    name: 'Buster',
    category: 'dogs',
    age: '4个月',
    gender: '雄性',
    distance: '3.1公里',
    tag: '幼犬',
    tagColor: 'bg-orange-100 text-orange-700',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3P4nBvtWfw-dRh3VuYjLrB3V4Bg4Wx3EnzL-GH43KZQqV1FkbrvjpV8Ut7DLWvj99l2jg0afi3sQ_fdGolmUG6dPRfCB2HXPQJj3u8f7u2laAHeUHvle_mOAyESWT9-l9CDsHNh7P50CbqOTehtCM8clKdgjCZQS_BIzEwgOirjh5npjbE5u1vnlxSIOsPCfmWV2NbsZ1pnqhyGTBDh4EMCCqp13Tj8wrkEPJczaAuFVfWTnpNw9qO2ER8BQmiUNB9MrSHE-H5gM',
    breed: '比格犬',
    desc: 'Buster 是一只充满活力的比格犬幼犬，喜欢探索新事物，需要大量的运动和陪伴。',
    applied: true,
    applicationStatus: '审核中'
  },
  {
    id: 'charlie',
    name: 'Charlie',
    category: 'dogs',
    age: '8岁',
    gender: '雄性',
    distance: '1.2公里',
    tag: '老年',
    tagColor: 'bg-purple-100 text-purple-700',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS_5xsCmO5cbqjGpq99MwLGYZUhz43xPxk7fzxQn5uSwpd7JLMnt_Hvt0hzt9eeRn9YxBOv9xV4p32uBuR8_bsmGL77Ae2aG3qjmw9OKcPhd7vBJNnWTt1WZW38MQwBdRpHu7Vd64vaHtxbY0SNZp7YUitpn3yRo29urDOns6zn-1Kqfz2XeqLn2HL3HxP2ZZmoy8FebKbam_vJGh5uLjQNHYTUtS92iYeuh8rv_z2cUh-z1s2Ec7kf-dRkXJOw_eySqqWZeFnbac',
    breed: '腊肠犬',
    desc: 'Charlie 是一只忠诚的腊肠犬，虽然年纪稍大，但依然喜欢散步和主人的拥抱。',
    applied: false,
    applicationStatus: null
  },
  {
    id: 'buddy',
    name: 'Buddy',
    category: 'dogs',
    age: '2岁',
    gender: '雄性',
    distance: '2.4公里',
    tag: '青年',
    tagColor: 'bg-green-100 text-green-700',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2YJO-qXNM9WWh3zt29v4aiDQ3McHexhXmIxGN0zn7ATS8GnLGiLl9r9zH4_K6aVzudlUfxhWgaarn-zpOEmHarnFSryQJNjFMHh9NmZWZ7dhI2mjHBBkMFb6Js7OlfQX0PUmoPVtxmS-3fT0WGF_Q8Fn8DCyr-4VHP7SgBi8FSf9fFhHQhk_CUpRdVBHKA2X0mvPpG15NTxg3ihB_hzgUMFIO3eYLZgFp6M_JXO4JH86vLALbLorYLtBdNTMRR7zuDRBEQEedRno',
    breed: '金毛寻回犬',
    desc: 'Buddy 是一个温和的小生命，他在当地的一家公园里被发现四处流浪。尽管他有过一段艰辛的开始，但他却是你能想到的最深情的伴侣。他喜欢漫长的下午散步，追逐网球，并在你阅读时把头靠在你的腿上休息。Buddy 正在寻找一个可以分享他所有爱的永远的家。',
    applied: false,
    applicationStatus: null
  }
];

async function seed() {
  console.log('🌱 Seeding database with mock data...');
  
  for (const pet of pets) {
    const { data, error } = await supabase
      .from('pets')
      .upsert(pet, { onConflict: 'id' });
      
    if (error) {
      console.error(`❌ Error inserting pet ${pet.id}:`, error.message);
    } else {
      console.log(`✅ Successfully inserted pet ${pet.id}`);
    }
  }
  
  console.log('✅ Seeding complete!');
  process.exit(0);
}

seed();
