import { seed } from './seeds';

seed()
.then(() => {
  console.log('Database has been populated');
  process.exit();
});

