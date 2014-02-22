Steps to get up and running:

1. git clone
2. cd grasshopper-admin
3. git checkout < digdug, or current branch >
4. git submodule init
5. git submodule update
6. npm install
7. bower install
8. bundle install
9. grunt vagrant:install
10. cd api/lib/config/
11. curl -O https://gist.githubusercontent.com/Duder-onomy/9148236/raw/434461aae610825488f4c5b6ebcd1ac9d92a4a3a/configuration.json
12. cd ../../..
13. grunt server
