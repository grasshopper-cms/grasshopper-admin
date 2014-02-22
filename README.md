##Steps to get up and running:

1. git clone https://github.com/Solid-Interactive/grasshopper-admin.git
2. cd grasshopper-admin
3. git checkout < digdug, or current branch >
4. git submodule init
5. git submodule update
6. npm install
7. bower install
8. bundle install
9. cd api/lib/config/
10. curl -O https://gist.githubusercontent.com/Duder-onomy/9148236/raw/434461aae610825488f4c5b6ebcd1ac9d92a4a3a/configuration.json
11. cd ../../..
12. grunt vagrant:install
13. grunt server

___

If grunt-connect doesnt open one for you, make a new tab in your browser and navigate to **localhost:9001**

To log in use these credentials:  
    username: **admin**  
    password: **TestPassword**    
