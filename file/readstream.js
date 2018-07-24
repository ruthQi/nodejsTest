//1.引入模块
const fs = require('fs');

//2.创建读写刘通道
let rs = fs.createReadStream('../assets/mint1year.mp4');
let ws = fs.createWriteStream('stream.mp4');

//3.监听通道
rs.once('open', ()=>{
   console.log('读通道已打开');
});

rs.once('close', ()=>{
   console.log('读通道已关闭');
});

ws.once('open', ()=>{
   console.log('写通道已打开');
});

ws.once('close', ()=>{
   console.log('写通道已关闭');
});

//4.监听数据
rs.on('data', (data)=>{
   /**
    * <Buffer 00 00 00 14 66 74 79 70 69 73 6f 6d 00 00 00 01 69 73 6f 6d 00 00 51 37 6d 6f 6f 76 00 00 00 6c 6d 76 68 64 00 00 00 00 d7 20 34 f9 d7 20 34 f9 00 00 ... >
<Buffer 28 ea f7 d6 71 df 53 79 fc 7f 37 02 c4 12 29 c0 25 c4 5e 71 8d 27 b4 f2 44 df 98 4f d6 83 bd 96 8e b9 fb d1 b0 f9 81 ff df 94 1e 1e fd 56 a4 6a 06 8c ... >
<Buffer 3a c2 ba ef a0 7f 82 3c 35 6d 1f f9 06 37 ab 6d 0a 7d 20 3c e5 23 65 af 0c 53 bc f9 b1 a4 f2 68 b0 b0 ac 83 e5 5d 60 58 1e 29 57 c5 53 15 5b 0a e9 c1 ... >
<Buffer 3b ac dc d6 3d 9a be 3f 34 af e4 23 03 71 72 b1 22 35 08 87 e6 82 ac 39 5f 56 30 37 a1 ad 27 18 d1 3c 08 76 c6 72 0e 88 08 e0 be e9 43 09 df 63 00 e8 ... >
<Buffer a2 f2 23 40 92 5c 14 61 45 e3 3a 1d 32 ae 60 c1 4a 04 68 ca 8e bd 5c 99 cd 39 a9 47 06 43 bb e5 82 fd 23 30 fa 6c 9d 03 d8 eb 29 1c 32 87 54 c2 f8 44 ... >
<Buffer f3 10 a2 bd 78 c1 ca e2 ec 00 d0 6d b5 a3 73 14 ba 3d 84 9e 82 8b d6 f1 fb 71 77 38 42 ff e5 29 5f 6c 6e dd 40 99 b6 47 37 94 83 d6 e9 73 82 6d 74 3f ... >
<Buffer 36 96 a2 6c d9 87 ab 7a ac 4d 1f 25 6f 47 82 f0 b3 22 f4 62 00 0f 5f 61 12 ed 6b 2e db 0f c6 97 e9 b4 c5 eb e4 95 92 24 c7 2b 43 7b f5 92 71 99 3d 2b ... >
<Buffer 38 6a 3d f8 f6 49 93 58 b7 f4 54 97 2c 7b 97 3a e6 12 4d 09 7d 60 38 a3 53 d2 10 1d 76 9e 58 28 d8 62 a5 d9 13 9e fb f6 86 16 a8 10 3a 78 d4 76 0b 5a ... >
<Buffer 28 88 05 db 49 5b 95 85 d9 96 ae 95 cd 6d fe 5a db 91 d8 d9 6a e5 9f 4b f5 b6 80 ba d5 57 4c 5d f9 f9 75 74 24 4f eb d1 9e e2 57 62 f7 29 35 b7 a2 d8 ... >
<Buffer 8c 67 ee 1a 58 0f 0d f6 2e 46 fc be a1 92 77 f3 87 03 a1 4e 36 b9 23 f6 ba 36 3a 04 5c e1 45 f9 38 5f 24 77 e1 15 9d 7d 65 fc a1 37 d0 c8 66 9f 65 b8 ... >
<Buffer 90 75 c3 a8 c3 5d 29 dc 64 fc 6d 03 cb 4a e5 45 16 5f 9b e7 33 92 45 e3 f8 35 02 92 c2 f5 8e f9 a9 da 03 ee 1b c4 f4 27 24 94 e4 92 eb a8 89 3b 3b bf ... >
<Buffer 98 0e 5a 6c 2b 6e 2d a1 75 7f 06 ef 14 d8 e8 2a ed 34 23 39 66 08 b3 49 2f f2 8d 20 dd 0a 7c 5b 3f b2 87 de 18 5e e0 ca 47 54 65 3f 4d 65 54 58 8e f0 ... >
<Buffer fa 4b f8 de 5a 5b 78 f3 08 e0 35 be 0b a1 18 3e ef 07 5a 6d c7 57 96 19 db 26 a3 88 be 2d fe 1e 24 68 42 d6 62 ed 65 ae 7e b8 c5 48 f2 56 83 68 41 ed ... >
<Buffer 54 aa f7 0a be 8c f2 cb e0 42 9b 23 47 18 fb 3d f8 ec 0d 4b d6 60 91 01 dc a0 a8 07 c6 60 bf 82 e0 14 5a b3 ee c6 d8 b2 b5 f2 57 18 bd 4c 4b 62 11 dc ... >
<Buffer f8 c2 ed ab fd 59 2d db 3f 0a b0 e4 3a e9 30 00 70 8d c6 d3 65 e9 fb 82 1e fe 40 e6 3a b2 2f c5 2f 5a 3d f2 01 e9 bb 83 df 04 4f e8 77 ed a1 ce cf 15 ... >
<Buffer 3d bc 4d af 37 bd e5 6d 96 db f5 f6 57 06 70 ce 57 af e6 15 25 dc 90 5e 06 b5 6a 0c 1c d7 6b ed 3b 62 db d1 0c 06 92 79 7d 8e 97 a7 35 21 4b 36 78 46 ... >
<Buffer c4 80 35 c8 bb 05 c7 b8 ad 85 f7 e0 83 ab e7 1f 17 00 e0 e1 3e 65 7f 6f 7f 00 28 cc d0 e3 de 80 c0 40 58 af fb 19 4d 90 c3 39 bc 48 04 5a 47 c7 e2 b2 ... >
<Buffer b2 65 6a 0b 25 27 0f d9 76 85 9c 3a e7 e9 89 21 9c f3 29 d5 85 5f a7 17 3a 9b 3f ac 6b 5a 8c 22 bc cf ad 9d b8 ab 02 9a 27 34 7b a1 df 59 03 c2 8c ac ... >
<Buffer d5 73 b9 5e 59 6b fa a9 b9 98 93 fa 5a 67 b6 da 80 99 4d a6 91 0f 3d 69 a4 da f6 d3 55 c0 33 00 78 32 a1 6d 30 1c cf 1c 41 e2 14 62 ac b1 a8 24 e3 f2 ... >
<Buffer 94 8c c1 d1 9c 6b e6 2c d2 10 59 6d 2a 95 d1 78 87 67 a6 79 b5 ce 43 ba 6e 7a 97 23 86 ff 02 c0 7a 1b e4 b5 e1 5a 66 9d c9 e7 46 4d e9 0e 87 c0 bf 9a ... >
<Buffer 8d 55 a7 08 34 ff b2 6c 0c 44 54 f6 7b 90 0d e6 a5 ec da b2 bb 2a 43 95 93 d7 39 de 11 31 4d 93 ca 86 45 27 ed ce 3f 1b 91 f5 dc df a2 0b 3a 97 d9 ee ... >
<Buffer 57 24 1b 82 02 ad ad cc de 4f 36 23 b7 de 88 68 0d 51 43 61 fb 47 eb 5c 82 eb d5 e6 95 77 f2 0b 0c ce d7 ef 76 33 b8 46 ce ec 78 c6 1e 5e 5a 5c ab 6e ... >
<Buffer 29 34 f9 b7 3a bd 4d 82 08 1e 72 fb fc 04 08 02 32 8e 47 61 83 47 22 27 75 fa 3b 09 73 0f 76 d8 d7 3f f4 4b bd d3 59 7e 46 ab 7f 82 de 66 63 d1 05 c8 ... >
<Buffer bb 3b 7c c0 0c f9 62 03 47 63 48 5f e4 7e 6f 5e 56 a5 75 46 34 09 d6 55 d9 bf f1 7e 36 13 c5 b8 bb e5 96 57 0d 58 5d e7 66 70 ce ae 2f 86 fb 92 7a a7 ... >
<Buffer 91 ad 36 7b 6a 6e f9 e1 83 3a 72 c6 b3 f3 f3 29 dc 58 97 44 93 d6 20 c8 db e5 a9 69 26 19 3b 44 e2 c0 92 70 13 8a 99 58 cf ac 1d 7b 65 64 9f 99 4c d4 ... >
<Buffer b6 3b a1 3f 84 a5 15 5c 6f e8 c9 2b 1f ec 12 31 3f 64 50 fd b3 c7 b3 9f 7c 3a d9 cd 93 27 98 5c 45 08 93 29 da 41 d5 a2 60 37 25 d5 71 3e 03 2c 02 4d ... >
<Buffer 36 0b fe 73 a4 47 66 03 55 14 18 83 5b 28 4a d5 8d 45 86 3e 31 7f 91 8d 09 94 07 66 78 90 9a f7 cf 95 e5 1c 8d 4d 6e 43 99 a0 05 5d f3 f9 fc 9d b5 a4 ... >
<Buffer 8d 5a 42 5c 1d 67 70 9b 98 e0 9c 31 01 c8 48 52 a4 42 61 62 ac 24 be 30 57 52 2c 85 37 18 56 f4 1d 1a 39 ae b1 6d e7 3f a9 5b 85 3e 65 61 95 b3 18 bf ... >
<Buffer 13 99 74 15 6e 6f 16 2c 29 47 e0 b2 24 83 e7 b5 5f 37 8d 73 c3 cc 3f 5a 49 d8 3a e5 d3 6e 96 0d cb 63 87 12 85 a4 5f 06 34 bd 5a 9d 0c 7e d1 88 48 15 ... >
<Buffer 8f a0 03 a1 af 75 1b 5a d5 79 7a c4 a7 3c 83 65 af a3 ad 28 f8 fd 09 ba 3d f8 c2 3a 0a e8 32 7a 1c a2 9e 4c af 75 44 ad 38 81 3d d6 43 f5 ba 8e 0b fe ... >
<Buffer 7f a1 ba 8b 90 ca 09 a0 87 ad 79 38 59 3d 7c 2b ec fb 92 72 1b 5d 51 8d bd 55 4b f4 cd 14 cc c6 af 70 04 87 c0 77 40 b0 f7 b7 42 55 31 38 fd db fd 43 ... >
<Buffer bb a0 1b 71 e2 7c 18 35 c2 48 5d 57 11 ad aa 7d 94 b1 2a 30 0c 61 c5 1d 8a 9e c4 9a 2c 60 29 56 2b 68 30 4b 74 f0 5d aa 98 53 d7 08 7a 7c 64 9d 03 1b ... >
<Buffer 04 79 8f c7 b8 d9 b9 47 cc 3f c3 37 31 79 93 bc 95 d7 e8 2d 61 43 bd 10 43 31 83 46 82 bf 65 0c 53 36 39 da 4f 5f 6c 66 82 83 34 5c 75 6c a0 42 1e 30 ... >
<Buffer 25 60 ab e1 19 55 c0 ed b0 8b 84 61 7d 71 fa 4d 87 2a 8c 24 b4 3d 25 bc 8f ef d3 16 f9 30 4c c6 c9 33 26 7c 41 40 28 53 6e 77 94 5a 35 ac 6d 52 71 1d ... >
<Buffer e5 67 b5 2b 9e e2 85 8b 3c 06 ea da 3f 5e 0c f8 01 64 18 54 89 cb a6 7d d6 8b ab 29 d2 28 66 3c a4 f9 74 6c b7 31 ff 75 4d 0d 38 60 27 88 27 df 65 5b ... >
<Buffer 4c d2 39 b3 0a 85 29 5b 43 5d ac 17 4d 13 f7 45 e5 a2 c2 1c cd 88 25 d9 28 8a ca 6e bc 4d ec 67 70 2e e5 c6 cd c4 d7 b5 8c 9a 4d 78 93 75 12 0c 12 b8 ... >
<Buffer 12 cf 0c 28 8a 3e 1e 05 02 09 87 41 57 6b 84 61 ca 4d 5e 10 63 c7 87 e4 7c 49 0f e0 4f 89 84 62 e3 5f 0d 8f 24 06 da bf 8b 73 3f 3d 79 b5 d5 59 22 7e ... >
<Buffer 22 bc cb ff d2 16 9e 30 bb f4 07 4c 3f d9 f2 7a c4 0c a4 33 bf 9a 2e e5 de 5f 09 41 c0 5e e9 b4 0b eb d4 2c 57 f6 c5 ec 34 12 d2 e8 bb 2c 50 39 73 24 ... >
<Buffer 4c 35 e3 a1 27 93 68 9a e9 fd 09 c0 b7 2f 90 97 5a ff e1 60 d6 8a 88 65 f5 02 d0 02 0a 96 b9 71 48 6f e5 db bb 72 be 72 dc 9b a3 c1 f9 ca 9c ff 29 09 ... >
<Buffer 80 ca 00 fe 80 f3 7b 86 22 8a 60 12 8e f9 49 6b fe 31 2c b5 2c bf f5 00 3a f3 fc 3c c2 5e 5c a6 9d f3 da eb f4 be 9a 45 77 95 3c f7 ca 04 b0 1f 95 c5 ... >
<Buffer 2b 65 41 9a 65 34 b6 a4 4d ff 38 e1 7d 00 d5 b0 d0 03 23 73 4d ba 2c 78 e0 c8 42 3f 2d 55 c4 35 97 75 d6 be 74 04 ca cf 11 44 07 e7 95 c1 40 5e cf 1f ... >
<Buffer fb 89 8e 94 6d ed 07 a2 78 81 9a 51 47 8f b0 b9 f4 38 f3 e0 da 30 1a bd 58 35 fa e3 24 b1 30 e1 33 de a3 fa ed e2 0b 5c fc 7d cb 73 16 c3 58 2b 32 2a ... >
<Buffer 0e a9 52 96 1b dc 7d b5 cc 96 2b 42 c4 b8 8c e6 62 ff 0b c0 d0 18 e3 9b 01 88 62 fd c5 66 74 3a c5 8a 30 f9 2c 6a d4 af c2 fa 74 16 70 c3 22 d0 1b fc ... >
<Buffer 29 e4 45 98 4c 19 17 52 06 ea b1 68 ed f0 d7 1e 14 3f 85 4a 22 81 76 b4 34 4c 41 8a cb 54 d6 cc 59 ad 5c 78 ae 0e 3a a5 9a 30 a5 b1 8e 4a 5c 52 a2 38 ... >
<Buffer de 3b 5f 29 31 eb d0 10 2b 22 79 1d ec 7c dd 31 50 52 5a e8 28 f2 b2 f9 af ea af 6a b3 30 63 11 50 92 0a 69 ca 1d ce d3 58 af 07 c4 6d 07 8a 04 11 2d ... >
<Buffer 43 53 01 ff 49 cb f4 ee b1 13 0d 00 4a d1 1d 0c b2 4f bc 35 ad e9 8a c9 be c3 53 4a be 6d 80 1e d1 93 d3 60 7f 92 f2 b9 8c 4f f2 d2 4c be 5e 65 22 53 ... >
<Buffer 47 aa 47 89 b3 6a 6d 0a f3 52 fb 77 6d 05 fd 61 2a 42 92 10 e7 a9 4f 9b 0e 96 3c 24 83 48 c8 6d 86 0e d6 0e c1 c8 3d 7f 8c 42 97 bb 7a 2f d9 7f d4 58 ... >
<Buffer 82 75 fb 33 70 36 5e 40 4c 3e af 57 90 1e 0d e2 1c bf 6d f7 91 57 3f bf cc cb a9 03 80 83 e0 86 1e 9e 1b 87 19 c2 12 5c e0 27 a9 a9 88 91 14 d6 7e a2 ... >
<Buffer 40 20 98 b7 f4 6e 86 00 d4 73 26 d9 ea fb 88 cc c6 1a 4c fb 2a 2d d2 e2 44 9a e9 9b 32 86 f7 9e 54 98 d5 66 db b0 5a 26 2b 9e 05 02 fb 3a 92 9c 55 65 ... >
<Buffer 42 c7 23 08 e5 75 ee be 8b c7 66 74 00 01 10 b6 e9 57 aa 17 7d 39 0e 32 45 84 a6 2b 01 99 69 8d 2b 45 2c 7c 2c 91 5b 16 78 17 08 cf a0 b5 f8 d2 7e 85 ... >
<Buffer 30 9e f9 90 51 d3 f5 e9 9b e0 7e 73 20 f3 6d b3 12 a1 29 1e 5e f8 83 c9 78 3f 77 c4 71 6f e5 7c 13 05 b1 25 ed 43 1c ba 2c 18 7a 20 1c df 25 69 00 00 ... >
<Buffer 77 85 3d 11 c3 e4 3a 56 ed 2d f2 7d 3e 99 96 60 b4 db 23 44 85 9c 32 fc 7d e7 ef 94 e8 07 c5 c4 70 50 47 72 5d a1 68 c2 36 07 9d f4 74 f9 be 4e b4 89 ... >
<Buffer b3 66 5f c0 38 04 e7 ba df a5 f1 a4 f0 22 7e 71 ca 13 18 25 72 f5 aa ad 6a b2 46 97 6f 08 78 ce ee ca af dd 54 1a 04 2d 0b a9 ad 49 f3 6f 1e 00 37 0a ... >
<Buffer c0 c5 7c 75 1f a4 fc df bb 3e 84 40 2c 9c e7 0e 16 83 35 00 9d 42 ab ce ef 33 f2 dd a1 31 31 ed 90 09 3d e4 04 79 95 b9 ed dd f9 0f a0 b9 aa 62 33 a4 ... >
<Buffer 6a 40 8f 5b 70 f2 76 6e 1e 2d 39 79 11 ae b7 dc 2a 20 45 d5 6e 1d 57 77 4a 5f 08 b4 8d fb 7e 26 58 fb 0d a4 22 b5 df 7a 22 90 7d c1 1e 88 c8 28 72 43 ... >
<Buffer 19 14 80 9d 82 fd 97 b0 72 d0 0f bb 12 6e b8 eb fc 53 ff df cb 8c a1 24 a9 c0 48 17 90 04 bf 3a 88 30 cb 0a 2f 79 a8 3b 7a 56 1a bc db 09 ed e3 43 83 ... >
<Buffer 28 97 33 db d8 b8 59 f9 c2 09 d1 df 1d 84 08 14 23 ac 4a 03 a7 66 87 39 bc 75 9c cc 4c 89 2b 30 08 ea 72 d6 b2 74 64 9d 1b bc af 45 72 b1 7d e8 00 ec ... >
<Buffer 84 31 b7 2f d4 dd f0 1c 42 05 b3 ab a0 9b 5f 07 50 ec b7 1d 2a dd 8a 83 92 ec 9b be 61 4c 0a 30 4b 84 8a b2 ac 0e 06 b0 b1 6e 04 cd 0f 8b 8c 09 17 56 ... >
<Buffer 26 fc 6c 63 41 15 6e cb 41 b6 d5 85 62 2e a1 59 f1 36 08 00 2a 43 73 a7 97 24 bb 2a ec 26 f7 58 43 de 79 49 18 d4 2d 47 53 e7 70 a9 ec 86 25 fb d7 98 ... >
<Buffer d0 2e e0 d0 de af 17 3c de 15 01 fc 5c ef 8a 30 3e 77 57 34 08 71 e5 31 b9 1a 0a 11 41 78 5a a6 8f ba 75 6d 30 79 1b 3b 0d da 3f a0 ca 66 2d b7 71 b2 ... >
<Buffer 03 70 39 8c 69 87 e1 a3 08 a9 8f 1b 17 31 43 af 7b 37 9a fa 09 ed ad d2 37 16 6b 92 cd 88 c8 21 5a 00 99 40 e7 2d 9c 58 e6 01 83 7f 09 21 91 76 f1 4a ... >
<Buffer c6 09 70 60 4a 4c 62 fc 28 eb 0a 9a 79 e6 42 63 d5 52 49 42 74 aa fd c1 50 67 55 43 ef f4 04 2c 64 d7 2e ef 12 08 53 03 c9 32 24 13 97 4a 27 ff af f4 ... >
<Buffer 4b 7a 04 26 20 a0 95 2a 90 c9 06 cd 14 53 17 e3 16 35 3c 8f 21 80 ea 77 0e 2d 1c f5 13 64 be 0f 60 55 00 68 c9 37 c7 b7 cd 6f 55 5e 5f 06 73 11 c7 dd ... >
<Buffer 90 7f 5a d3 5b ef 58 93 c3 08 af a2 7a 1a 10 6d 20 6e 7c ff cb 6f 8c 6d cd 85 ae 9d b9 a3 f2 06 76 7d 73 52 5f 38 d9 2e 78 63 72 6e 7e c6 f4 39 3b 83 ... >
<Buffer 6d 60 5e bc 79 22 29 e1 fa 17 48 e3 ff bf 2f 8e 5c c4 45 d6 1f ad be 20 73 d0 cf 65 2b 1e 63 98 c7 49 2c 13 49 f3 ce 83 bd 90 55 3a e8 b8 e0 41 b2 9e ... >
<Buffer 76 43 5d 5e a2 58 2e 4d f4 2e 66 9d 3d b0 79 bd d4 70 df bf 65 08 a9 ca c8 df f7 5f ba 91 66 60 43 bb 3e ca 99 cc 7f b5 25 3e 42 7a 10 d3 f6 44 80 9f ... >
<Buffer 49 a8 d7 c8 d6 8d fd e6 a2 04 e7 41 0d 11 3c 75 e4 d0 25 49 46 88 9e 0b 62 8d cb a7 03 08 11 e3 c3 db bc c5 2d af 15 86 5f 93 90 f7 32 60 b7 ac ad cb ... >
<Buffer f9 50 aa 54 1b 66 35 a3 84 b0 f2 3f 32 cd 53 f6 dc ce b3 da c6 57 86 ac 7b 91 c7 e8 67 ce b6 21 b4 c8 b8 cd 38 bc f1 d4 58 b8 e8 09 85 39 4a 68 ed fd ... >
<Buffer cf ed 27 8b 71 0d 8f cf 90 2a b8 2f ec 9e 15 87 fa db 34 f6 64 ed 5c 43 fd 5f 45 d1 e8 33 9a 8a 17 d3 ab 66 16 29 4e c1 87 44 74 af 37 fd b5 58 7d d1 ... >
<Buffer b4 e8 ac b5 c7 3d 55 5c ca 78 23 dd 93 78 3b d4 7b b1 e5 78 b1 fe e2 4e 26 0a f5 f8 f6 af b6 b1 fe 1f f8 f3 f0 15 e5 62 14 6b 22 4f e9 f7 be 17 d5 87 ... >
<Buffer 36 26 48 4a 58 93 a7 9b fd 67 cc 66 59 8b bc fa eb 4c a1 d5 42 7a b6 bf 57 4f 23 37 8c 8d 1b cc a6 bf a4 22 59 4e 9e 31 dc 89 ff 7b 76 42 99 3a 15 4b ... >
<Buffer 95 f0 c5 8d a4 1b c3 45 eb 1f 04 d6 92 0f ab fb b9 83 f4 71 87 2b f2 06 22 07 c5 4d 6e 59 b0 e3 74 75 98 4b 08 76 ad 0a fe c6 cd b6 f0 ac cb 78 49 01 ... >
<Buffer 33 26 2a 67 4c 73 8f 30 2c 04 ec 2e 5e 41 dc 9e 0f 7e 12 20 ef 0b 20 ca fd 20 47 2f 8f 60 e3 79 5b 63 3e bd 20 07 37 c2 27 7e ba c5 7b 61 1c c0 a3 6a ... >
<Buffer 90 70 5e 9f 12 b7 a7 2b 0f 44 42 6f 30 e3 d0 f9 d3 7d 06 5f 88 ce 89 00 02 7a 28 f3 b1 3a 88 2d 5f ff 0c 7b 7e 21 9b 21 18 d0 c2 76 ed 97 7d 45 bc 37 ... >
<Buffer 62 e3 81 88 0c 54 05 d5 d2 44 d7 d8 6a 66 00 69 ce b4 f5 1e db 4e f3 f6 c5 b3 00 a5 76 4e ea 8b 20 35 02 c6 e4 78 65 56 bc b9 e1 4b b4 94 f3 be c8 9f ... >
<Buffer ac d6 d5 da 68 dc 36 4e 82 89 4a 9d cd 7f 13 d8 65 9e 02 cc 2a 1f 13 d6 27 8f 2a c3 96 62 92 c4 be 2a 98 f0 c5 67 18 35 cd 54 48 24 e1 fe cd cd bf d7 ... >
<Buffer b5 61 2d b6 a4 06 cd 18 dd 95 fd c2 88 d4 dd dd de 4c f2 ff fd 5d ad ac 8e 7c 57 3f 3f 67 d7 8a af c8 e4 9a a6 dc 28 14 63 fc 83 be 69 24 da 5b dc 3d ... >
<Buffer dc c3 b3 d6 45 fa b0 c6 7c e4 f3 c2 5d 5a ac b7 1d cd f0 10 fb 39 30 82 7f bf 35 75 70 d3 73 de ee c5 3f 38 97 c2 21 dc bc 5e c3 76 91 7f 56 0f 13 c4 ... >
<Buffer f2 64 78 84 74 35 58 33 44 25 0e 75 5f b4 ae 5d 92 14 2d 75 f8 5d 60 16 e9 e3 74 5e dd fe 97 10 11 46 81 fd 8c 5d d4 7b 6f 23 ac 5e 38 ad 28 83 c0 6a ... >
<Buffer 8b 39 bc 6b d3 6b 77 87 2f cb 9d 08 27 f8 da b1 3f e3 bf d4 91 49 49 5c 7c 32 0f dd 9e 3b 51 d5 d3 5e bc 93 77 5e 5f 4d 4d b1 cd b9 7d 55 69 c5 46 ec ... >
<Buffer 0f f7 a5 68 94 e1 7e 62 38 1c 37 7a f3 38 3e 44 7e 26 11 27 5f 13 7e 51 79 3a a9 55 1e 36 6c 5e 8a a1 da b2 f1 51 56 d9 51 7d bd c9 e7 72 7b 1a bd b2 ... >
<Buffer e1 e9 eb ca 08 5f 33 cc f3 f3 1b c5 ec 3d 7a db 4f d7 6b 82 da 29 ee b8 8a 66 65 b9 0d ab a1 5d c2 ac 81 ef b7 50 86 82 68 12 dc c6 d3 58 de 5d f0 c3 ... >
<Buffer 80 c5 8e 78 73 6c 41 62 f3 3f d7 4c fc b5 7d 1f 1f c2 9a a8 70 b8 4e fb 61 fd 5a b7 11 da 0a 66 4d b7 46 ec a1 97 2a 4d 64 b4 6a 78 a9 51 e3 50 9e f2 ... >
<Buffer 67 64 65 04 9e 30 93 1a c2 ba 3c e9 2d 75 4f 07 46 a6 a2 4d 93 b0 f5 57 1c 1b 6e 7a d3 73 61 2a a0 c3 33 b9 69 36 3f 1e 10 f8 ea 27 db d4 c1 54 f6 5a ... >
<Buffer ee 48 28 bc c9 a0 e8 4d 88 eb 06 0d 7a 93 d4 72 27 98 e0 7f 2e 8b 0b f2 18 2d 27 7a 05 48 09 9f 4b 88 fa ae 5e 21 a6 d8 d0 0f c1 27 64 ed 4b 3b 28 5f ... >
<Buffer 20 8c 7b 99 ac 02 df f9 66 35 98 8e 0b 89 22 f5 a4 5d 98 c8 c0 e5 fb 7b a5 3d 96 ab f1 ea da e8 f9 91 e0 24 db 85 b2 f5 3c 5e 0e 79 c3 91 64 7c 5b 7b ... >
<Buffer 38 88 dd 51 46 dc cc 18 e8 96 0a 6f f0 6b 7d f5 9c f2 c1 82 3c 22 bf 97 1c 5c 77 b9 7e f8 66 3f 7c 9c dd 4c 5c 81 54 a6 90 8a c4 4a d2 61 fb d3 ce e9 ... >
<Buffer 45 5a 2c 33 42 a3 de 95 c0 61 d9 c6 cc e1 cb 36 fa ac 52 4f 82 de 3f 24 ab b4 74 ff ab 05 8a 9d e6 51 90 b0 18 75 5c dd a0 51 bd f7 5f 0f ea 16 5a f1 ... >
<Buffer 3d 80 df f9 59 4d 25 e4 80 6d 0d 1e 45 8a e9 e7 63 ab ef 83 61 79 1a 20 d4 e5 bb e3 de b4 da 19 ad 3b c3 42 1c 39 78 b5 6d 1c 0a c0 2f 97 96 27 0e b5 ... >
<Buffer 63 b3 98 69 e1 a9 97 00 83 4e f8 1c 64 f8 92 3c 2b 4f fa db d8 db f8 45 cb 43 4c 97 0a 78 e1 96 ee 57 7e a1 93 ea bf 26 5f de b2 70 02 d5 09 69 2b 94 ... >
<Buffer b6 51 d8 bd 35 bb 72 22 10 a6 3b 23 aa 75 e0 f5 a8 be 74 db 20 9b d1 f3 7d 39 0d bf 3e e1 58 52 67 6d e2 c4 44 50 f4 90 fc 3f 7e 82 92 8e 03 48 86 0e ... >
    */
   //console.log(data);//buffer片段
   ws.write(data);
   //ws.end();此处使用end()报错
})