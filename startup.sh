/opt/wait-for-it.sh db:5432 -- npm run migration:run
npm run build
npm run start:prod
